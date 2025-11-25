import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactFormData = await req.json();

    // Input validation
    if (!name || name.trim().length === 0 || name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Name is required and must be less than 100 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!message || message.trim().length === 0 || message.length > 2000) {
      return new Response(
        JSON.stringify({ error: "Message is required and must be less than 2000 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role key for database access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store submission in database
    const { data: submission, error: dbError } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone?.trim() || null,
          message: message.trim(),
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store submission");
    }

    console.log("Submission stored:", submission.id);

    // Send confirmation email to user
    const userEmailPromise = resend.emails.send({
      from: "Sayan Ghosh <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting me!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Thank you for reaching out, ${name}!</h1>
          <p style="color: #666; line-height: 1.6;">
            I have received your message and will get back to you as soon as possible.
          </p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your message:</h3>
            <p style="color: #666; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666;">
            Best regards,<br>
            <strong>Sayan Ghosh</strong><br>
            Microsoft 365 Administrator
          </p>
        </div>
      `,
    });

    // Send notification email to admin
    const adminEmailPromise = resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["your-email@example.com"], // Replace with your actual email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">New Contact Form Submission</h1>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div style="background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #666; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    // Wait for both emails to send
    const [userEmailResult, adminEmailResult] = await Promise.allSettled([
      userEmailPromise,
      adminEmailPromise,
    ]);

    // Log email results
    if (userEmailResult.status === "fulfilled") {
      console.log("User confirmation email sent:", userEmailResult.value);
    } else {
      console.error("Failed to send user confirmation:", userEmailResult.reason);
    }

    if (adminEmailResult.status === "fulfilled") {
      console.log("Admin notification email sent:", adminEmailResult.value);
    } else {
      console.error("Failed to send admin notification:", adminEmailResult.reason);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Your message has been sent successfully!",
        submissionId: submission.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-contact function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred while processing your request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);