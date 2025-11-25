import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";

const KBArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user && id && id !== "new") {
      fetchArticle();
    } else {
      setLoading(false);
    }
  }, [user, authLoading, id, navigate]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from("kb_articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setTitle(data.title);
      setSlug(data.slug);
      setExcerpt(data.excerpt || "");
      setContent(data.content);
      setCategory(data.category);
      setCoverImageUrl(data.cover_image_url || "");
      setPublished(data.published || false);
    } catch (error) {
      console.error("Error fetching article:", error);
      toast({
        title: "Error",
        description: "Failed to load article",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (id === "new" && !slug) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSave = async () => {
    if (!title || !slug || !content || !category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const articleData = {
        title,
        slug,
        excerpt,
        content,
        category,
        cover_image_url: coverImageUrl || null,
        published,
        author_id: user?.id,
      };

      if (id === "new") {
        const { error } = await supabase.from("kb_articles").insert([articleData]);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Article created successfully",
        });
      } else {
        const { error } = await supabase
          .from("kb_articles")
          .update(articleData)
          .eq("id", id);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Article updated successfully",
        });
      }

      navigate("/admin/kb-articles");
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/kb-articles")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Button>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">
            {id === "new" ? "New KB Article" : "Edit KB Article"}
          </h1>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Article"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Article Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter article title"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="article-url-slug"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="entra-id, exchange-online, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief description of the article"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content *</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="write">
                  <TabsList className="mb-4">
                    <TabsTrigger value="write">Write</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="write">
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your article content in Markdown..."
                      rows={20}
                      className="font-mono"
                    />
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="prose prose-lg dark:prose-invert max-w-none border rounded-md p-4 min-h-[500px]">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content || "*Preview will appear here...*"}
                      </ReactMarkdown>
                    </div>
                  </TabsContent>
                </Tabs>
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
                  <Label htmlFor="published">Publish Article</Label>
                  <Switch
                    id="published"
                    checked={published}
                    onCheckedChange={setPublished}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {published
                    ? "This article is visible to everyone"
                    : "This article is only visible to admins"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="coverImage">Cover Image URL</Label>
                  <Input
                    id="coverImage"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {coverImageUrl && (
                  <img
                    src={coverImageUrl}
                    alt="Cover preview"
                    className="w-full rounded-lg"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KBArticleEditor;
