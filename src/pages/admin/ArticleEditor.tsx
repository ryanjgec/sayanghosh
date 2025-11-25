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

const ArticleEditor = () => {
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
  const [type, setType] = useState<"blog" | "case_study">("blog");
  const [client, setClient] = useState("");
  const [industry, setIndustry] = useState("");
  const [metrics, setMetrics] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditMode = id && id !== "new";

  useEffect(() => {
    if (!loading && (!user || (!isAdmin && !isEditor))) {
      navigate("/auth");
    } else if (isEditMode) {
      fetchArticle();
    }
  }, [user, isAdmin, isEditor, loading, isEditMode, navigate]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditMode && title) {
      const autoSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(autoSlug);
    }
  }, [title, isEditMode]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setTitle(data.title);
      setSlug(data.slug);
      setExcerpt(data.excerpt || "");
      setContent(data.content);
      setCoverImageUrl(data.cover_image_url || "");
      setTags(data.tags ? data.tags.join(", ") : "");
      setPublished(data.published);
      setType((data.type as "blog" | "case_study") || "blog");
      setClient(data.client || "");
      setIndustry(data.industry || "");
      setMetrics(data.metrics ? JSON.stringify(data.metrics, null, 2) : "");
    } catch (error) {
      console.error("Error fetching article:", error);
      toast({
        title: "Error",
        description: "Failed to load article",
        variant: "destructive",
      });
      navigate("/admin/articles");
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
      if (type === "case_study" && metrics) {
        try {
          metricsData = JSON.parse(metrics);
        } catch (e) {
          toast({
            title: "Invalid metrics format",
            description: "Please enter valid JSON for metrics",
            variant: "destructive",
          });
          return;
        }
      }

      const articleData: any = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || null,
        content: content.trim(),
        cover_image_url: coverImageUrl.trim() || null,
        tags: tagsArray.length > 0 ? tagsArray : null,
        published,
        published_at: published && !isEditMode ? new Date().toISOString() : undefined,
        author_id: user!.id,
        type,
      };

      if (type === "case_study") {
        articleData.client = client || null;
        articleData.industry = industry || null;
        articleData.metrics = metricsData;
      }

      if (isEditMode) {
        const { error } = await supabase
          .from("articles")
          .update(articleData)
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Article Updated",
          description: "Your article has been successfully updated.",
        });
      } else {
        const { data, error } = await supabase
          .from("articles")
          .insert([articleData])
          .select()
          .single();

        if (error) throw error;

        toast({
          title: "Article Created",
          description: "Your article has been successfully created.",
        });

        navigate(`/admin/articles/edit/${data.id}`);
      }
    } catch (error: any) {
      console.error("Error saving article:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save article",
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
        title={isEditMode ? "Edit Article" : "New Article"}
        description="Create or edit blog articles"
        keywords="admin, article editor, content management"
      />
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-foreground">
                {isEditMode ? "Edit Article" : "New Article"}
              </h1>
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/articles")}
                className="pl-0"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Button>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Editor */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="type">Content Type</Label>
                    <select
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value as "blog" | "case_study")}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="blog">Blog Post</option>
                      <option value="case_study">Case Study</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter article title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      placeholder="article-url-slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      URL: /blog/{slug || "your-slug"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief description of the article"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content (Markdown) *</Label>
                    <Tabs defaultValue="write" className="w-full">
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
                          placeholder="Write your article in Markdown..."
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
                            <p className="text-muted-foreground">
                              Nothing to preview yet...
                            </p>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
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
                  <p className="text-xs text-muted-foreground">
                    {published
                      ? "Article is visible to everyone"
                      : "Article is saved as draft"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
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
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      placeholder="Microsoft 365, Tutorial, PowerShell"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {type === "case_study" && (
                <>
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
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input
                          id="industry"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          placeholder="Technology, Healthcare, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="metrics">Metrics (JSON format)</Label>
                        <Textarea
                          id="metrics"
                          value={metrics}
                          onChange={(e) => setMetrics(e.target.value)}
                          placeholder='{"metric1": "value1", "metric2": "value2"}'
                          rows={6}
                        />
                        <p className="text-xs text-muted-foreground">
                          Example: {`{"Users Migrated": "10,000+", "Downtime": "<2 hours"}`}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleEditor;