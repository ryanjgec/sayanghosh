import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";
import { FileText, Users, BarChart, BookOpen } from "lucide-react";

const AdminDashboard = () => {
  const { user, isAdmin, isEditor, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || (!isAdmin && !isEditor))) {
      navigate("/auth");
    }
  }, [user, isAdmin, isEditor, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Admin Dashboard"
        description="Manage your content and settings"
        keywords="admin, dashboard, content management"
      />
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Welcome back, {user.email}
            </p>
          </div>

          {/* Quick Stats/Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            <Link to="/admin/articles">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Articles</CardTitle>
                      <CardDescription>Manage blog posts</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Manage Articles
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Card className="opacity-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>Coming soon</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" disabled>
                  View Users
                </Button>
              </CardContent>
            </Card>

            <Link to="/admin/analytics">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BarChart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Analytics</CardTitle>
                      <CardDescription>View website metrics</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/kb-articles">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Knowledge Base</CardTitle>
                      <CardDescription>Manage KB articles</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Manage KB Articles
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Role Info */}
          <Card className="mt-8 max-w-6xl">
            <CardHeader>
              <CardTitle>Your Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {isAdmin && "🔑 Admin - Full access to all features"}
                  {!isAdmin && isEditor && "✏️ Editor - Can create and manage articles"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;