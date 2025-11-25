import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    title: "Exchange Online Management - Atlas Air",
    client: "Atlas Air",
    industry: "Aviation",
    description: "Comprehensive Exchange Online administration for global airline with 5000+ mailboxes, implementing advanced security and compliance measures.",
    tags: ["Exchange Online", "Security", "Compliance", "Migration"],
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "Ticket Resolution", value: "40% faster" },
      { label: "Users", value: "5000+" },
    ],
  },
  {
    title: "Intune MDM & Infrastructure - JDE",
    client: "JDE (Jacobs Douwe Egberts)",
    industry: "Food & Beverage",
    description: "End-to-end Intune MDM deployment and infrastructure management for global coffee company across multiple regions.",
    tags: ["Intune MDM", "Device Management", "Compliance", "Autopilot"],
    metrics: [
      { label: "Devices Managed", value: "1000+" },
      { label: "Compliance Rate", value: "95%" },
      { label: "Provisioning Time", value: "60% faster" },
    ],
  },
  {
    title: "Tenant-to-Tenant Migration - JDE Peets",
    client: "JDE Peets",
    industry: "Food & Beverage",
    description: "Complex post-merger tenant consolidation with comprehensive data migration including mailboxes, files, Teams, and security configurations.",
    tags: ["Migration", "M365", "Change Management", "SharePoint"],
    metrics: [
      { label: "Data Integrity", value: "99.8%" },
      { label: "Security Incidents", value: "0" },
      { label: "Duration", value: "6 months" },
    ],
  },
  {
    title: "Confluence Cloud Administration - Amadeus",
    client: "Amadeus",
    industry: "Travel Technology",
    description: "Comprehensive Confluence Cloud administration and governance for global travel technology leader with focus on knowledge management.",
    tags: ["Confluence", "Knowledge Management", "Governance", "Atlassian"],
    metrics: [
      { label: "Spaces Managed", value: "100+" },
      { label: "Issue Reduction", value: "50%" },
      { label: "User Satisfaction", value: "4.5/5" },
    ],
  },
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Case Studies</h1>
          <p className="text-lg text-muted-foreground">
            Real-world projects showcasing Microsoft 365 implementations, migrations, and infrastructure management
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="max-w-6xl mx-auto space-y-8">
          {caseStudies.map((study, index) => (
            <Card key={index} className="hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline" className="text-primary border-primary">
                        {study.industry}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2">{study.title}</CardTitle>
                    <CardDescription className="text-base">
                      <span className="font-semibold">{study.client}</span>
                    </CardDescription>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4">{study.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tags */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase">Key Metrics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {study.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-muted/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full sm:w-auto" disabled>
                  Read Full Case Study (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note */}
        <div className="max-w-6xl mx-auto mt-12">
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Detailed case studies with in-depth technical analysis, challenges, solutions, and lessons learned will be added soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
