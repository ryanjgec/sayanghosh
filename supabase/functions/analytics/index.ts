import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("VITE_SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify user is admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if user has admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);

    const isAdmin = roles?.some((r) => r.role === "admin");
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden - Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { startDate, endDate, metric } = await req.json();

    // Get Google Analytics credentials from secrets
    const gaCredentials = Deno.env.get("GOOGLE_ANALYTICS_CREDENTIALS");
    const propertyId = Deno.env.get("GOOGLE_ANALYTICS_PROPERTY_ID");

    if (!gaCredentials || !propertyId) {
      return new Response(
        JSON.stringify({ error: "Google Analytics credentials not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const credentials = JSON.parse(gaCredentials);

    // Get OAuth token from Google
    const jwtHeader = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const now = Math.floor(Date.now() / 1000);
    const jwtClaimSet = btoa(
      JSON.stringify({
        iss: credentials.client_email,
        scope: "https://www.googleapis.com/auth/analytics.readonly",
        aud: "https://oauth2.googleapis.com/token",
        exp: now + 3600,
        iat: now,
      })
    );

    // Note: For production, use proper JWT signing with the private key
    // This is a simplified version - you'll need to implement proper RSA signing
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: `${jwtHeader}.${jwtClaimSet}`,
      }),
    });

    const { access_token } = await tokenResponse.json();

    // Fetch data from Google Analytics Data API
    let dimensions = [];
    let metrics = [];

    switch (metric) {
      case "overview":
        dimensions = [{ name: "date" }];
        metrics = [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
        ];
        break;
      case "pages":
        dimensions = [{ name: "pageTitle" }, { name: "pagePath" }];
        metrics = [{ name: "screenPageViews" }];
        break;
      case "events":
        dimensions = [{ name: "eventName" }];
        metrics = [{ name: "eventCount" }];
        break;
      default:
        dimensions = [{ name: "date" }];
        metrics = [{ name: "activeUsers" }];
    }

    const gaResponse = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate, endDate }],
          dimensions,
          metrics,
        }),
      }
    );

    const analyticsData = await gaResponse.json();

    return new Response(JSON.stringify(analyticsData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
