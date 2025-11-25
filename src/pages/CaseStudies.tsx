import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Building, TrendingUp } from "lucide-react";
import { format } from "date-fns";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  client: string | null;
  industry: string | null;
  metrics: any;
  tags: string[] | null;
  published_at: string;
  author_id: string;
  profiles: {
    full_name: string;
  } | null;
}

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .eq("type", "case_study")
        .order("published_at", { ascending: false });

      if (error) throw error;

      // Fetch author profiles
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

      setCaseStudies(articlesWithProfiles as Article[]);
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Case Studies"
        description="Real-world Microsoft 365 project case studies showcasing expertise in Exchange Online, Intune, tenant migrations, and more."
        keywords="M365 case studies, Exchange Online projects, Intune implementation, tenant migration, Microsoft 365 success stories"
      />
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Case Studies
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-world success stories showcasing expertise in Microsoft 365, Azure, and enterprise IT solutions
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading case studies...</p>
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="text-center p-8 bg-muted/50 rounded-lg">
              <h2 className="text-2xl font-semibold mb-3 text-foreground">
                Case Studies Coming Soon
              </h2>
              <p className="text-muted-foreground">
                We're working on comprehensive case studies with in-depth analysis, challenges faced, solutions implemented, and measurable outcomes.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {caseStudies.map((study) => (
                <Link key={study.id} to={`/blog/${study.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        {study.industry && <Badge variant="outline">{study.industry}</Badge>}
                      </div>
                      <CardTitle className="text-2xl mb-2">{study.title}</CardTitle>
                      {study.client && (
                        <CardDescription className="flex items-center gap-2 text-sm">
                          <Building className="h-4 w-4" />
                          {study.client}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-foreground/90">{study.excerpt}</p>

                      {study.tags && study.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {study.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {study.metrics && (
                        <div className="pt-4 border-t space-y-2">
                          <p className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Key Metrics:
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries(study.metrics).map(([key, value]) => (
                              <div key={key} className="bg-muted/50 p-3 rounded-lg">
                                <p className="text-xs text-muted-foreground">{key}</p>
                                <p className="font-semibold text-foreground">{value as string}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(study.published_at), "MMM d, yyyy")}</span>
                        </div>
                        {study.profiles && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{study.profiles.full_name}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CaseStudies;
