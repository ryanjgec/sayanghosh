import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

const AdminArticles = () => {
  const { user, isAdmin, isEditor, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    if (!loading && (!user || (!isAdmin && !isEditor))) {
      navigate("/auth");
    } else if (user && (isAdmin || isEditor)) {
      fetchArticles();
    }
  }, [user, isAdmin, isEditor, loading, navigate]);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, excerpt, published, published_at, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast({
        title: "Error",
        description: "Failed to load articles",
        variant: "destructive",
      });
    } finally {
      setLoadingArticles(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Article Deleted",
        description: "The article has been successfully deleted.",
      });

      fetchArticles();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete article",
        variant: "destructive",
      });
    }
  };

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
        title="Manage Articles"
        description="Create and manage blog articles"
        keywords="admin, articles, content management"
      />
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-foreground">Articles</h1>
              <p className="text-lg text-muted-foreground">
                Manage your blog articles
              </p>
            </div>
            <Link to="/admin/articles/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Article
              </Button>
            </Link>
          </div>

          {/* Articles List */}
          {loadingArticles ? (
            <div className="text-center text-muted-foreground">Loading articles...</div>
          ) : articles.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No articles yet</p>
                <Link to="/admin/articles/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Article
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <Card key={article.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle>{article.title}</CardTitle>
                          {article.published ? (
                            <Badge variant="default" className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <EyeOff className="h-3 w-3" />
                              Draft
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="line-clamp-2">
                          {article.excerpt || "No excerpt"}
                        </CardDescription>
                        <p className="text-xs text-muted-foreground mt-2">
                          Created: {format(new Date(article.created_at), "MMM d, yyyy")}
                          {article.published_at && ` • Published: ${format(new Date(article.published_at), "MMM d, yyyy")}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/admin/articles/edit/${article.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        {isAdmin && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(article.id, article.title)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminArticles;