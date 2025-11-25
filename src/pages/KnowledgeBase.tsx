import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Smartphone, Users, FolderOpen, Lock, Shield, Terminal, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "exchange-online",
    icon: Mail,
    title: "Exchange Online",
    description: "Email administration, mailbox management, and migration guides",
    articleCount: 12,
    color: "text-blue-600",
    path: "/knowledge-base/exchange-online",
  },
  {
    id: "intune-mdm",
    icon: Smartphone,
    title: "Intune MDM",
    description: "Device management, compliance policies, and app deployment",
    articleCount: 15,
    color: "text-green-600",
    path: "/knowledge-base/intune-mdm",
  },
  {
    id: "teams",
    icon: Users,
    title: "Microsoft Teams",
    description: "Teams administration, governance, and best practices",
    articleCount: 10,
    color: "text-purple-600",
    path: "/knowledge-base/teams",
  },
  {
    id: "onedrive",
    icon: FolderOpen,
    title: "OneDrive for Business",
    description: "File storage, sync issues, and sharing configurations",
    articleCount: 8,
    color: "text-cyan-600",
    path: "/knowledge-base/onedrive",
  },
  {
    id: "entra-id",
    icon: Lock,
    title: "Entra ID",
    description: "Identity management, Conditional Access, and user lifecycle",
    articleCount: 18,
    color: "text-orange-600",
    path: "/knowledge-base/entra-id",
  },
  {
    id: "defender",
    icon: Shield,
    title: "Microsoft Defender",
    description: "Security operations, threat protection, and compliance",
    articleCount: 14,
    color: "text-red-600",
    path: "/knowledge-base/defender",
  },
  {
    id: "powershell",
    icon: Terminal,
    title: "PowerShell",
    description: "Automation scripts, cmdlets, and best practices",
    articleCount: 20,
    color: "text-indigo-600",
    path: "/knowledge-base/powershell",
  },
];

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || category.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Knowledge Base</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Guides, tutorials, and best practices for Microsoft 365 administration
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles, guides, and tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Link key={category.id} to={category.path}>
                <Card className="h-full hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardHeader>
                    <div className={`p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors`}>
                      <category.icon className={`h-8 w-8 ${category.color}`} />
                    </div>
                    <CardTitle className="text-xl flex items-center justify-between">
                      {category.title}
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">{category.articleCount} Articles</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No categories found matching your search.</p>
          </div>
        )}

        {/* Coming Soon Notice */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                <strong>Note:</strong> Knowledge base articles are currently being curated. 
                This section will be populated with comprehensive guides, tutorials, and best practices soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
