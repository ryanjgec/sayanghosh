import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  tags: string[] | null;
  published_at: string;
  author_id: string;
  profiles: {
    full_name: string;
  } | null;
}

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) throw error;

      // Fetch author profile
      if (data.author_id) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", data.author_id)
          .single();
        setArticle({ ...data, profiles: profile });
      } else {
        setArticle({ ...data, profiles: null });
      }
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/case-studies">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt || ""}
        keywords={article.tags?.join(", ") || ""}
        ogImage={article.cover_image_url || undefined}
        ogType="article"
        article={{
          publishedTime: article.published_at,
          author: article.profiles?.full_name,
          tags: article.tags || undefined,
        }}
      />
      <div className="min-h-screen py-12 bg-background">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link to="/case-studies">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Button>
          </Link>

          {/* Cover Image */}
          {article.cover_image_url && (
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(article.published_at), "MMMM d, yyyy")}</span>
            </div>
            {article.profiles && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.profiles.full_name}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t">
            <Link to="/case-studies">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case Studies
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogArticle;