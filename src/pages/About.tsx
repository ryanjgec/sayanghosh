import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, MapPin, Languages, Calendar, Briefcase } from "lucide-react";

const certifications = [
  { name: "MS-900", title: "Microsoft 365 Fundamentals", icon: "📜" },
  { name: "AZ-900", title: "Azure Fundamentals", icon: "☁️" },
  { name: "MS-102", title: "Microsoft 365 Administrator", icon: "🎓" },
];

const tools = [
  "Exchange Online", "Intune MDM", "Entra ID", "Microsoft Teams", 
  "OneDrive", "SharePoint", "Microsoft Defender", "PowerShell",
  "Azure AD", "Conditional Access", "DLP", "Compliance Center",
  "Power Automate", "Microsoft Forms", "Confluence", "ServiceNow"
];

const timeline = [
  {
    period: "Dec 2021 - Present",
    role: "Infra Managed Services Analyst",
    company: "Accenture",
    description: "Managing Microsoft 365 tenants across multiple enterprise clients, handling 15k-200k users per tenant.",
  },
  {
    period: "2021",
    role: "Career Transition",
    company: "M365 Specialization",
    description: "Completed Microsoft 365 certifications and specialized in cloud infrastructure management.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">About Me</h1>
          <div className="flex flex-wrap gap-4 mb-8">
            <Badge variant="outline" className="flex items-center gap-2 py-2 px-4">
              <MapPin className="h-4 w-4" />
              India
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 py-2 px-4">
              <Calendar className="h-4 w-4" />
              1 Month Notice Period
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 py-2 px-4">
              <Languages className="h-4 w-4" />
              English, Hindi, Bengali
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 py-2 px-4">
              <Briefcase className="h-4 w-4" />
              4+ Years Experience
            </Badge>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Professional Summary</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-foreground">
              <p className="text-lg leading-relaxed mb-4">
                I'm Sayan Ghosh, a Microsoft 365 Administrator with 4+ years of experience at Accenture, 
                specializing in enterprise-scale cloud infrastructure management. I work across multi-region 
                tenants serving 15,000 to 200,000 users, ensuring secure, reliable, and efficient cloud operations.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                My expertise spans Exchange Online administration, Intune MDM deployment, Entra ID identity 
                governance, Conditional Access policies, Microsoft Teams collaboration, OneDrive for Business, 
                and comprehensive security management through Microsoft Defender.
              </p>
              <p className="text-lg leading-relaxed">
                I'm passionate about automation through PowerShell, implementing security best practices, 
                and delivering exceptional service to end users while maintaining enterprise-grade compliance 
                and governance standards.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Career Timeline */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Career Timeline</h2>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <Card key={index} className="hover:shadow-card-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <CardTitle className="text-xl">{item.role}</CardTitle>
                    <Badge variant="secondary">{item.period}</Badge>
                  </div>
                  <p className="text-primary font-semibold">{item.company}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center">
            <Award className="mr-3 h-8 w-8 text-primary" />
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.name} className="hover:shadow-card-hover transition-all duration-300 text-center">
                <CardHeader>
                  <div className="text-5xl mb-4">{cert.icon}</div>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{cert.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tools & Technologies */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Tools & Technologies</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <Badge key={tool} variant="secondary" className="text-sm py-2 px-4">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
