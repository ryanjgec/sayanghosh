import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Disclaimer = () => {
  return (
    <>
      <SEO
        title="Disclaimer"
        description="Legal disclaimer for Sayan Ghosh's portfolio website"
        keywords="disclaimer, legal notice, liability"
      />
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Disclaimer</h1>
            <p className="text-sm text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Educational and Reference Purpose Only</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>All technical content, tutorials, guides, and knowledge base articles on this website are provided for <strong>educational and reference purposes only</strong>.</p>
                <p>The information presented here:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Should not be considered as professional IT consulting advice</li>
                  <li>May not be applicable to your specific environment or situation</li>
                  <li>Should be tested in non-production environments before implementation</li>
                  <li>May become outdated as technology evolves</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>No Confidential Information Shared</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>All case studies and project descriptions on this website have been:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Carefully anonymized to protect client confidentiality</li>
                  <li>Stripped of any proprietary or sensitive information</li>
                  <li>Generalized to prevent identification of specific organizations</li>
                  <li>Reviewed to ensure compliance with non-disclosure obligations</li>
                </ul>
                <p className="mt-4">No confidential information from any current or former employer or client is disclosed on this website.</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Anonymized Case Studies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>All case studies presented use generic descriptors such as:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>"Global aviation enterprise"</li>
                  <li>"Multinational FMCG company"</li>
                  <li>"Global F&B conglomerate"</li>
                  <li>"Travel technology provider"</li>
                </ul>
                <p className="mt-4">These descriptions are intentionally vague to protect client identities while demonstrating professional capabilities.</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>No Professional Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Sayan Ghosh assumes no liability for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Damages resulting from implementation of guides or tutorials</li>
                  <li>Business losses arising from decisions based on case study information</li>
                  <li>Technical issues encountered while following provided instructions</li>
                  <li>Incompatibility with specific systems or environments</li>
                  <li>Data loss or system downtime resulting from content usage</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>No Affiliation with Microsoft or Other Brands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>This website is an independent professional portfolio and is not:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Affiliated with Microsoft Corporation</li>
                  <li>Endorsed or sponsored by Microsoft</li>
                  <li>An official Microsoft resource or documentation</li>
                  <li>Representing any current or former employer</li>
                </ul>
                <p className="mt-4">Microsoft, Microsoft 365, Exchange Online, Intune, Teams, OneDrive, Entra ID, and Microsoft Defender are trademarks of Microsoft Corporation.</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>No Current Employer Representation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>The views, opinions, and content expressed on this website are solely those of Sayan Ghosh as an individual and do not represent the views of:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Current employer (Accenture)</li>
                  <li>Past employers</li>
                  <li>Clients or business partners</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Accuracy of Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>While efforts are made to ensure accuracy, Sayan Ghosh makes no guarantees regarding:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Completeness of technical information</li>
                  <li>Currency of content (technology changes rapidly)</li>
                  <li>Applicability to all scenarios</li>
                </ul>
                <p className="mt-4">Always verify information with official Microsoft documentation before implementation.</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>External Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>This website may contain links to external resources. Sayan Ghosh is not responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Content on external websites</li>
                  <li>Availability of external resources</li>
                  <li>Privacy practices of third-party sites</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Contact for Concerns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>If you have concerns about any content on this website, please contact:</p>
                <p className="font-semibold mt-2">Email: <a href="mailto:sayan@infra365.online" className="text-primary hover:underline">sayan@infra365.online</a></p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;
