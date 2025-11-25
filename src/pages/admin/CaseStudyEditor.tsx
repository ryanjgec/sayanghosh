import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { Save, Eye, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CaseStudyEditor = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAdmin, isEditor, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(false);
  const [client, setClient] = useState("");
  const [industry, setIndustry] = useState("");
  const [metrics, setMetrics] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditMode = id && id !== "new";

  useEffect(() => {
    if (!loading && (!user || (!isAdmin && !isEditor))) {
      navigate("/auth");
    } else if (isEditMode) {
      fetchCaseStudy();
    }
  }, [user, isAdmin, isEditor, loading, isEditMode, navigate]);

  useEffect(() => {
    if (!isEditMode && title) {
      const autoSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(autoSlug);
    }
  }, [title, isEditMode]);

  const fetchCaseStudy = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .eq("type", "case_study")
        .single();

      if (error) throw error;

      setTitle(data.title);
      setSlug(data.slug);
      setExcerpt(data.excerpt || "");
      setContent(data.content);
      setCoverImageUrl(data.cover_image_url || "");
      setTags(data.tags ? data.tags.join(", ") : "");
      setPublished(data.published);
      setClient(data.client || "");
      setIndustry(data.industry || "");
      setMetrics(data.metrics ? JSON.stringify(data.metrics, null, 2) : "");
    } catch (error) {
      console.error("Error fetching case study:", error);
      toast({
        title: "Error",
        description: "Failed to load case study",
        variant: "destructive",
      });
      navigate("/admin/case-studies");
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim() || !content.trim()) {
      toast({
        title: "Validation Error",
        description: "Title, slug, and content are required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      let metricsData = null;
      if (metrics) {
        try {
          metricsData = JSON.parse(metrics);
        } catch (e) {
          toast({
            title: "Invalid metrics format",
            description: "Please enter valid JSON for metrics",
            variant: "destructive",
          });
          setSaving(false);
          return;
        }
      }

      const caseStudyData: any = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || null,
        content: content.trim(),
        cover_image_url: coverImageUrl.trim() || null,
        tags: tagsArray.length > 0 ? tagsArray : null,
        published,
        published_at: published && !isEditMode ? new Date().toISOString() : undefined,
        author_id: user!.id,
        type: "case_study",
        client: client.trim() || null,
        industry: industry.trim() || null,
        metrics: metricsData,
      };

      if (isEditMode) {
        const { error } = await supabase
          .from("articles")
          .update(caseStudyData)
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Case Study Updated",
          description: "Your case study has been successfully updated.",
        });
      } else {
        const { data, error } = await supabase
          .from("articles")
          .insert([caseStudyData])
          .select()
          .single();

        if (error) throw error;

        toast({
          title: "Case Study Created",
          description: "Your case study has been successfully created.",
        });

        navigate(`/admin/case-studies/${data.id}`);
      }
    } catch (error: any) {
      console.error("Error saving case study:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save case study",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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
        title={isEditMode ? "Edit Case Study" : "New Case Study"}
        description="Create or edit case studies"
        keywords="admin, case study editor, content management"
      />
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-foreground">
                {isEditMode ? "Edit Case Study" : "New Case Study"}
              </h1>
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/case-studies")}
                className="pl-0"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case Studies
              </Button>
            </div>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter case study title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      placeholder="case-study-url-slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief description"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content (Markdown) *</Label>
                    <Tabs defaultValue="write">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="write">Write</TabsTrigger>
                        <TabsTrigger value="preview">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="write">
                        <Textarea
                          id="content"
                          placeholder="Write your case study in Markdown..."
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          rows={20}
                          className="font-mono"
                        />
                      </TabsContent>
                      <TabsContent value="preview">
                        <div className="prose prose-sm dark:prose-invert max-w-none border rounded-md p-4 min-h-[500px]">
                          {content ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {content}
                            </ReactMarkdown>
                          ) : (
                            <p className="text-muted-foreground">Nothing to preview yet...</p>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publishing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="published">Published</Label>
                    <Switch
                      id="published"
                      checked={published}
                      onCheckedChange={setPublished}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Case Study Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Input
                      id="client"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      placeholder="Global aviation enterprise"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      placeholder="Technology, Aviation, FMCG, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metrics">Metrics (JSON format)</Label>
                    <Textarea
                      id="metrics"
                      value={metrics}
                      onChange={(e) => setMetrics(e.target.value)}
                      placeholder='{"Users Migrated": "10,000+", "Downtime": "<2 hours"}'
                      rows={6}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cover Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="coverImage">Cover Image URL</Label>
                    <Input
                      id="coverImage"
                      placeholder="https://..."
                      value={coverImageUrl}
                      onChange={(e) => setCoverImageUrl(e.target.value)}
                    />
                  </div>
                  {coverImageUrl && (
                    <img
                      src={coverImageUrl}
                      alt="Cover preview"
                      className="w-full rounded-md"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    id="tags"
                    placeholder="Exchange Online, Migration, Security"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudyEditor;
