import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, Users, Eye, MousePointerClick } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface AnalyticsData {
  overview: Array<{ date: string; activeUsers: number; sessions: number; pageViews: number }>;
  topPages: Array<{ pageTitle: string; pagePath: string; views: number }>;
  topEvents: Array<{ eventName: string; count: number }>;
}

const Analytics = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ startDate: "30daysAgo", endDate: "today" });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchAnalytics();
    }
  }, [user, isAdmin, dateRange]);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No session");
      }

      // Fetch overview data
      const overviewResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analytics`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...dateRange,
            metric: "overview",
          }),
        }
      );

      // Fetch top pages
      const pagesResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analytics`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...dateRange,
            metric: "pages",
          }),
        }
      );

      // Fetch top events
      const eventsResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analytics`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...dateRange,
            metric: "events",
          }),
        }
      );

      const overviewData = await overviewResponse.json();
      const pagesData = await pagesResponse.json();
      const eventsData = await eventsResponse.json();

      if (overviewData.error) {
        throw new Error(overviewData.error);
      }

      // Transform the data
      const overview = overviewData.rows?.map((row: any) => ({
        date: row.dimensionValues[0].value,
        activeUsers: parseInt(row.metricValues[0].value),
        sessions: parseInt(row.metricValues[1].value),
        pageViews: parseInt(row.metricValues[2].value),
      })) || [];

      const topPages = pagesData.rows?.slice(0, 10).map((row: any) => ({
        pageTitle: row.dimensionValues[0].value,
        pagePath: row.dimensionValues[1].value,
        views: parseInt(row.metricValues[0].value),
      })) || [];

      const topEvents = eventsData.rows?.slice(0, 10).map((row: any) => ({
        eventName: row.dimensionValues[0].value,
        count: parseInt(row.metricValues[0].value),
      })) || [];

      setAnalyticsData({ overview, topPages, topEvents });
    } catch (err: any) {
      console.error("Analytics error:", err);
      setError(err.message || "Failed to fetch analytics data");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const totalUsers = analyticsData?.overview.reduce((sum, day) => sum + day.activeUsers, 0) || 0;
  const totalSessions = analyticsData?.overview.reduce((sum, day) => sum + day.sessions, 0) || 0;
  const totalPageViews = analyticsData?.overview.reduce((sum, day) => sum + day.pageViews, 0) || 0;
  const totalEvents = analyticsData?.topEvents.reduce((sum, event) => sum + event.count, 0) || 0;

  return (
    <>
      <SEO
        title="Analytics Dashboard"
        description="View website analytics and metrics"
        keywords="analytics, statistics, metrics"
      />
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">Analytics Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Website performance and visitor insights
            </p>
          </div>

          {error && (
            <Card className="mb-6 border-destructive">
              <CardContent className="pt-6">
                <p className="text-destructive">{error}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Make sure to configure Google Analytics credentials in your backend secrets.
                </p>
              </CardContent>
            </Card>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">Loading analytics...</p>
            </div>
          ) : (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Sessions</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalSessions.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalPageViews.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                    <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalEvents.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </CardContent>
                </Card>
              </div>

              {/* Traffic Over Time */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                  <CardDescription>Daily active users, sessions, and page views</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      activeUsers: {
                        label: "Active Users",
                        color: "hsl(var(--primary))",
                      },
                      sessions: {
                        label: "Sessions",
                        color: "hsl(var(--secondary))",
                      },
                      pageViews: {
                        label: "Page Views",
                        color: "hsl(var(--accent))",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData?.overview}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="activeUsers"
                          stroke="hsl(var(--primary))"
                          name="Active Users"
                        />
                        <Line
                          type="monotone"
                          dataKey="sessions"
                          stroke="hsl(var(--secondary))"
                          name="Sessions"
                        />
                        <Line
                          type="monotone"
                          dataKey="pageViews"
                          stroke="hsl(var(--accent))"
                          name="Page Views"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Pages */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Pages</CardTitle>
                    <CardDescription>Most viewed pages on your site</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        views: {
                          label: "Views",
                          color: "hsl(var(--primary))",
                        },
                      }}
                      className="h-[400px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData?.topPages} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="pageTitle" type="category" width={150} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="views" fill="hsl(var(--primary))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Top Events */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Events</CardTitle>
                    <CardDescription>Most triggered events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        count: {
                          label: "Count",
                          color: "hsl(var(--accent))",
                        },
                      }}
                      className="h-[400px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData?.topEvents} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="eventName" type="category" width={150} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="count" fill="hsl(var(--accent))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Analytics;
