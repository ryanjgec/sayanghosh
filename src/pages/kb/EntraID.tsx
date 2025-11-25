import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

const articles = [
  {
    title: "Conditional Access Implementation Guide",
    description: "Configure intelligent access controls for your tenant",
    readTime: "20 min",
    difficulty: "Advanced",
  },
  {
    title: "User Lifecycle Management",
    description: "Automate user provisioning and deprovisioning",
    readTime: "15 min",
    difficulty: "Intermediate",
  },
  {
    title: "Multi-Factor Authentication Setup",
    description: "Implement MFA policies and methods",
    readTime: "12 min",
    difficulty: "Beginner",
  },
];

const EntraID = () => {
  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/knowledge-base">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Knowledge Base
            </Link>
          </Button>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Entra ID</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Identity management, Conditional Access, and user lifecycle administration
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
                More articles coming soon covering privileged identity management, identity protection, and advanced security features.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EntraID;
