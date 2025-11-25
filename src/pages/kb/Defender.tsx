import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { SEO } from "@/components/SEO";

const articles = [
  {
    title: "Threat Protection Configuration",
    description: "Set up advanced threat protection for your tenant",
    readTime: "18 min",
    difficulty: "Advanced",
  },
  {
    title: "Security Incident Response",
    description: "Handle and investigate security incidents",
    readTime: "16 min",
    difficulty: "Advanced",
  },
  {
    title: "DLP Policies Implementation",
    description: "Configure data loss prevention policies",
    readTime: "14 min",
    difficulty: "Intermediate",
  },
];

const Defender = () => {
  useEffect(() => {
    trackEvent("kb_article_view", "Knowledge Base", "Microsoft Defender");
  }, []);

  return (
    <>
      <SEO 
        title="Microsoft Defender - Knowledge Base"
        description="Microsoft Defender guides covering threat protection, security incident response, DLP policies, and comprehensive security operations."
        keywords="Microsoft Defender, threat protection, DLP policies, security incidents, Defender for Office 365, security operations"
        ogType="article"
      />
      <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/knowledge-base">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Knowledge Base
            </Link>
          </Button>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Microsoft Defender</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Security operations, threat protection, and compliance management
          </p>

          <div className="space-y-6">
            {articles.map((article, index) => (
              <Card key={index} className="hover:shadow-card-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                      <CardDescription>{article.description}</CardDescription>
                    </div>
                    <BookOpen className="h-6 w-6 text-muted-foreground ml-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{article.readTime}</Badge>
                    <Badge variant="outline">{article.difficulty}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-muted/30">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                More articles coming soon covering Microsoft Defender for Office 365, Endpoint, Cloud Apps, and Identity.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default Defender;
