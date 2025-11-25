import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { Pencil, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
  published_at: string | null;
  excerpt: string | null;
  client: string | null;
  industry: string | null;
}

const CaseStudiesAdmin = () => {
  const { user, isAdmin, isEditor, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loadingCaseStudies, setLoadingCaseStudies] = useState(true);

  useEffect(() => {
    if (!loading && (!user || (!isAdmin && !isEditor))) {
      navigate("/auth");
    } else if (user) {
      fetchCaseStudies();
    }
  }, [user, isAdmin, isEditor, loading, navigate]);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, published, created_at, published_at, excerpt, client, industry")
        .eq("type", "case_study")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      toast({
        title: "Error",
        description: "Failed to load case studies",
        variant: "destructive",
      });
    } finally {
      setLoadingCaseStudies(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;

    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Case Study Deleted",
        description: "The case study has been successfully deleted.",
      });

      fetchCaseStudies();
    } catch (error: any) {
      console.error("Error deleting case study:", error);
      toast({
        title: "Error",
        description: "Failed to delete case study",
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
        title="Manage Case Studies"
        description="Manage your case studies"
        keywords="admin, case studies, content management"
      />
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-foreground">Case Studies</h1>
              <p className="text-lg text-muted-foreground">
                Create and manage your case studies
              </p>
            </div>
            <Link to="/admin/case-studies/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Case Study
              </Button>
            </Link>
          </div>

          {loadingCaseStudies ? (
            <div className="flex justify-center py-12">
              <p className="text-muted-foreground">Loading case studies...</p>
            </div>
          ) : caseStudies.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No case studies yet</p>
                <Link to="/admin/case-studies/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Case Study
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {caseStudies.map((caseStudy) => (
                <Card key={caseStudy.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle>{caseStudy.title}</CardTitle>
                          <Badge variant={caseStudy.published ? "default" : "secondary"}>
                            {caseStudy.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        {caseStudy.excerpt && (
                          <CardDescription className="line-clamp-2">
                            {caseStudy.excerpt}
                          </CardDescription>
                        )}
                        {(caseStudy.client || caseStudy.industry) && (
                          <div className="flex gap-2 mt-2">
                            {caseStudy.client && (
                              <Badge variant="outline">{caseStudy.client}</Badge>
                            )}
                            {caseStudy.industry && (
                              <Badge variant="outline">{caseStudy.industry}</Badge>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Link to={`/admin/case-studies/${caseStudy.id}`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        {isAdmin && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(caseStudy.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      <p>Created: {format(new Date(caseStudy.created_at), "PPP")}</p>
                      {caseStudy.published_at && (
                        <p>Published: {format(new Date(caseStudy.published_at), "PPP")}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CaseStudiesAdmin;
