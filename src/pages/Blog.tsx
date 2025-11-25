import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Calendar, User, Search } from "lucide-react";
import { format } from "date-fns";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  tags: string[] | null;
  published_at: string;
  author_id: string;
  profiles: {
    full_name: string;
  } | null;
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [searchQuery, articles]);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) throw error;
      
      // Fetch author profiles separately
      const articlesWithProfiles = await Promise.all(
        (data || []).map(async (article) => {
          if (article.author_id) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("full_name")
              .eq("id", article.author_id)
              .single();
            return { ...article, profiles: profile };
          }
          return { ...article, profiles: null };
        })
      );

      setArticles(articlesWithProfiles);
      setFilteredArticles(articlesWithProfiles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Blog & Articles"
        description="Read technical articles and insights on Microsoft 365 administration, cloud services, and IT best practices from Sayan Ghosh."
        keywords="M365 blog, Microsoft 365 articles, cloud services blog, IT technical articles, admin guides"
      />
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Blog & Articles
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Technical insights, tutorials, and best practices
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center text-muted-foreground">Loading articles...</div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center text-muted-foreground">
                {searchQuery ? "No articles found matching your search." : "No articles published yet."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Link key={article.id} to={`/blog/${article.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      {article.cover_image_url && (
                        <img
                          src={article.cover_image_url}
                          alt={article.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      )}
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                        <CardDescription className="line-clamp-3">
                          {article.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{format(new Date(article.published_at), "MMM d, yyyy")}</span>
                          </div>
                          {article.profiles && (
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{article.profiles.full_name}</span>
                            </div>
                          )}
                        </div>

                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {article.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;