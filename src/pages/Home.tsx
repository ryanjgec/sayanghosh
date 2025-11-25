import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillCard } from "@/components/SkillCard";
import { 
  Cloud, 
  Shield, 
  Mail, 
  Users, 
  Lock, 
  Database, 
  Terminal, 
  Layers,
  ArrowRight,
  Download,
  Briefcase
} from "lucide-react";

const skills = [
  { icon: Cloud, title: "M365 Administration", description: "Comprehensive tenant management" },
  { icon: Database, title: "Intune MDM", description: "Device & app management" },
  { icon: Mail, title: "Exchange Online", description: "Email & mailbox operations" },
  { icon: Lock, title: "Entra ID & CA", description: "Identity governance" },
  { icon: Users, title: "Teams & OneDrive", description: "Collaboration services" },
  { icon: Terminal, title: "PowerShell", description: "Automation & scripting" },
  { icon: Shield, title: "Defender", description: "Security & compliance" },
  { icon: Layers, title: "Multi-tenant", description: "Enterprise-scale management" },
];

const recentArticles = [
  {
    title: "Exchange Online Mailbox Migration Best Practices",
    category: "Exchange Online",
    excerpt: "Step-by-step guide for seamless mailbox migrations",
  },
  {
    title: "Intune Device Compliance Policies",
    category: "Intune MDM",
    excerpt: "Configure compliance policies for corporate devices",
  },
  {
    title: "Conditional Access Implementation Guide",
    category: "Entra ID",
    excerpt: "Secure your tenant with intelligent access controls",
  },
];

const featuredCases = [
  {
    title: "Exchange Online Management - Atlas Air",
    description: "Managed 5000+ mailboxes with advanced security and compliance",
    tags: ["Exchange Online", "Security", "Compliance"],
  },
  {
    title: "Intune MDM & Infrastructure - JDE",
    description: "Deployed MDM solution for 1000+ devices across multiple regions",
    tags: ["Intune", "MDM", "Device Management"],
  },
  {
    title: "Tenant-to-Tenant Migration - JDE Peets",
    description: "Executed seamless tenant migration with zero downtime",
    tags: ["Migration", "M365", "Project Management"],
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient text-primary-foreground py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Microsoft 365 Administrator & Cloud Services Engineer
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 animate-fade-in">
              4+ years managing global M365 tenants across Exchange Online, Intune, Entra ID, Teams, and Microsoft Defender. 
              Strong in troubleshooting, identity governance, and service operations.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/resume">
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/experience">
                  <Briefcase className="mr-2 h-5 w-5" />
                  View Experience
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/knowledge-base">
                  Explore Knowledge Base
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Core Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive Microsoft 365 administration with focus on security, compliance, and operational excellence
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <SkillCard key={skill.title} {...skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent KB Articles */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Recent Knowledge Base Articles</h2>
              <p className="text-muted-foreground">Latest guides and tutorials</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/knowledge-base">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <Card key={article.title} className="hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="text-xs font-semibold text-primary mb-2">{article.category}</div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription>{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/knowledge-base" className="text-primary hover:underline inline-flex items-center">
                    Read more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Featured Case Studies</h2>
              <p className="text-muted-foreground">Real-world projects and solutions</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/case-studies">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCases.map((caseStudy) => (
              <Card key={caseStudy.title} className="hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-xl">{caseStudy.title}</CardTitle>
                  <CardDescription>{caseStudy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseStudy.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link to="/case-studies" className="text-primary hover:underline inline-flex items-center">
                    Read full case study
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Currently Open to Opportunities</h2>
          <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            1 Month Notice Period • Available for M365 Administration & Cloud Engineering Roles
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">
              Contact Me
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
