import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Linkedin, FileText } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const Resume = () => {
  const handleDownloadClick = () => {
    trackEvent("resume_download_click", "Resume", "Download Button");
  };

  const handleLinkedInClick = () => {
    trackEvent("linkedin_click", "Resume", "LinkedIn Profile");
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Resume</h1>
            <p className="text-lg text-muted-foreground">
              Download my complete resume or connect on LinkedIn
            </p>
          </div>

          {/* Resume Card */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="mx-auto mb-6 p-4 bg-primary/10 rounded-full w-fit">
                <FileText className="h-16 w-16 text-primary" />
              </div>
              <CardTitle className="text-2xl">Sayan Ghosh</CardTitle>
              <p className="text-muted-foreground">Microsoft 365 Administrator & Cloud Services Engineer</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">4+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">200k+</div>
                  <div className="text-sm text-muted-foreground">Users Managed</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">3</div>
                  <div className="text-sm text-muted-foreground">Certifications</div>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Key Highlights</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-3 text-primary">•</span>
                    <span>4+ years at Accenture managing enterprise M365 tenants (15k-200k users)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-primary">•</span>
                    <span>Expert in Exchange Online, Intune MDM, Entra ID, Teams, and Defender</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-primary">•</span>
                    <span>Led multiple successful migrations and infrastructure projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-primary">•</span>
                    <span>Strong PowerShell automation and security implementation skills</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-primary">•</span>
                    <span>MS-900, AZ-900, and MS-102 certified</span>
                  </li>
                </ul>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="flex-1" disabled onClick={handleDownloadClick}>
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume (PDF)
                </Button>
                <Button size="lg" variant="outline" className="flex-1" asChild>
                  <a
                    href="https://linkedin.com/in/sayankghosh"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkedInClick}
                  >
                    <Linkedin className="mr-2 h-5 w-5" />
                    View LinkedIn Profile
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-center">Contact Information</h3>
              <div className="space-y-2 text-center text-muted-foreground">
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:sayan.ghosh@outlook.in" className="text-primary hover:underline">
                    sayan.ghosh@outlook.in
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong> +91 70011 64440
                </p>
                <p>
                  <strong>Location:</strong> India
                </p>
                <p>
                  <strong>Notice Period:</strong> 1 Month
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Note */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Resume PDF will be available for download soon. Please connect on LinkedIn for more details.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
