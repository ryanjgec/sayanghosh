import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, CheckCircle2, Target, Wrench, TrendingUp } from "lucide-react";

const experience = {
  company: "Accenture",
  role: "Infra Managed Services Analyst",
  period: "December 2021 - Present",
  location: "India",
  responsibilities: [
    "Managing Microsoft 365 tenants for multiple enterprise clients (15k-200k users)",
    "Exchange Online administration including mailbox management, migration, and troubleshooting",
    "Intune MDM deployment and device compliance policy configuration",
    "Entra ID user lifecycle management and Conditional Access implementation",
    "Microsoft Teams administration and governance",
    "OneDrive for Business deployment and management",
    "Microsoft Defender security operations and incident response",
    "PowerShell automation for routine administrative tasks",
    "Multi-tenant architecture support and management",
    "24/7 production support with SLA-driven service delivery",
  ],
};

const projects = [
  {
    title: "Exchange Online Management - Atlas Air",
    client: "Atlas Air",
    duration: "Ongoing",
    description: "Comprehensive Exchange Online administration for a global airline with 5000+ mailboxes.",
    problem: "Client required robust email infrastructure management with advanced security, compliance, and seamless user experience across multiple global locations.",
    solution: [
      "Implemented mailbox management workflows for onboarding/offboarding",
      "Configured transport rules and DLP policies",
      "Set up retention policies and litigation hold",
      "Deployed advanced threat protection",
      "Created PowerShell automation for routine tasks",
    ],
    tools: ["Exchange Online", "PowerShell", "Security & Compliance Center", "Microsoft Defender"],
    outcome: "Achieved 99.9% uptime, reduced ticket resolution time by 40%, implemented enterprise-grade security posture.",
  },
  {
    title: "Intune/MDM & Infrastructure Management - JDE",
    client: "JDE (Jacobs Douwe Egberts)",
    duration: "18 months",
    description: "Complete Intune MDM implementation and infrastructure management for global coffee company.",
    problem: "Organization needed unified device management solution for 1000+ corporate devices across multiple regions with compliance requirements.",
    solution: [
      "Deployed Intune MDM architecture",
      "Created device compliance policies",
      "Configured app deployment and management",
      "Implemented Conditional Access policies",
      "Set up Windows Autopilot for zero-touch deployment",
      "Created security baselines and configuration profiles",
    ],
    tools: ["Intune MDM", "Entra ID", "Conditional Access", "Windows Autopilot", "PowerShell"],
    outcome: "Successfully managed 1000+ devices, achieved 95% compliance rate, reduced device provisioning time by 60%.",
  },
  {
    title: "Tenant-to-Tenant Migration - JDE Peets",
    client: "JDE Peets",
    duration: "6 months",
    description: "Complex tenant-to-tenant migration following corporate merger.",
    problem: "Post-merger consolidation required migrating users, mailboxes, files, Teams, and security configurations from source tenant to target tenant with zero data loss and minimal downtime.",
    solution: [
      "Planned comprehensive migration strategy",
      "Used Microsoft native tools and third-party solutions",
      "Migrated mailboxes using Exchange hybrid approach",
      "Transferred OneDrive and SharePoint data",
      "Recreated Teams structure and migrated conversations",
      "Reconfigured security policies and Conditional Access",
      "Conducted user training and communication",
    ],
    tools: ["Exchange Online", "SharePoint", "OneDrive", "Teams", "PowerShell", "Migration Tools"],
    outcome: "Completed migration with 99.8% data integrity, zero security incidents, minimal user disruption.",
  },
  {
    title: "Confluence Cloud Administration - Amadeus",
    client: "Amadeus",
    duration: "Ongoing",
    description: "Administration and governance of Confluence Cloud for global travel technology company.",
    problem: "Client needed robust knowledge management platform administration with proper governance, security, and user management.",
    solution: [
      "Managed Confluence spaces and permissions",
      "Implemented user access governance",
      "Created backup and recovery procedures",
      "Optimized space structure and content organization",
      "Provided training and support to space administrators",
    ],
    tools: ["Confluence Cloud", "Jira", "Atlassian Admin"],
    outcome: "Improved knowledge management efficiency, reduced access-related issues by 50%.",
  },
];

const Experience = () => {
  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Experience & Projects</h1>
          <p className="text-lg text-muted-foreground">
            Professional journey and major projects in Microsoft 365 administration
          </p>
        </div>

        {/* Current Employment */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center">
            <Briefcase className="mr-3 h-8 w-8 text-primary" />
            Current Position
          </h2>
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <CardTitle className="text-2xl">{experience.role}</CardTitle>
                <Badge className="w-fit">{experience.period}</Badge>
              </div>
              <CardDescription className="text-lg">
                {experience.company} • {experience.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-4 text-lg flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />
                Key Responsibilities
              </h3>
              <ul className="space-y-2">
                {experience.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-3 text-primary">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Major Projects */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Major Projects</h2>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-card-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                      <CardDescription className="text-base">
                        <span className="font-semibold text-primary">{project.client}</span> • {project.duration}
                      </CardDescription>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4">{project.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Problem Statement */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center text-lg">
                      <Target className="mr-2 h-5 w-5 text-destructive" />
                      Problem Statement
                    </h3>
                    <p className="text-muted-foreground">{project.problem}</p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center text-lg">
                      <Wrench className="mr-2 h-5 w-5 text-primary" />
                      What I Did
                    </h3>
                    <ul className="space-y-2">
                      {project.solution.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-3 text-primary">•</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools Used */}
                  <div>
                    <h3 className="font-semibold mb-3 text-lg">Tools Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <Badge key={tool} variant="secondary">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Outcome */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center text-lg">
                      <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                      Outcome
                    </h3>
                    <p className="text-muted-foreground">{project.outcome}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
