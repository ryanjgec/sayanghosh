import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const Copyright = () => {
  return (
    <>
      <SEO
        title="Copyright Notice"
        description="Copyright and intellectual property notice for Sayan Ghosh's portfolio website"
        keywords="copyright, intellectual property, DMCA"
      />
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Shield className="h-10 w-10 text-primary mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Copyright Notice</h1>
            </div>
            <p className="text-sm text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Copyright Ownership</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">© {new Date().getFullYear()} Sayan Ghosh. All Rights Reserved.</p>
                <p>All content on this website, including but not limited to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Written articles and blog posts</li>
                  <li>Knowledge base tutorials and guides</li>
                  <li>Case study descriptions and analyses</li>
                  <li>Code examples and scripts</li>
                  <li>Design elements and graphics</li>
                  <li>Website structure and layout</li>
                  <li>Original photographs and images</li>
                </ul>
                <p className="mt-4">is the exclusive intellectual property of Sayan Ghosh unless explicitly stated otherwise.</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Unauthorized Use Prohibited</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Without prior written permission from Sayan Ghosh, you may NOT:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Copy, reproduce, or republish any content from this website</li>
                  <li>Distribute or sell content from this website</li>
                  <li>Create derivative works based on this website's content</li>
                  <li>Use content for commercial purposes</li>
                  <li>Scrape, extract, or harvest data using automated tools</li>
                  <li>Claim authorship of any content presented here</li>
                  <li>Modify or adapt content without authorization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Fair Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Limited use of content is permitted under fair use principles for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Brief quotations in educational materials with proper attribution</li>
                  <li>Personal learning and reference</li>
                  <li>Professional evaluation purposes</li>
                </ul>
                <p className="mt-4">Even under fair use, proper attribution to Sayan Ghosh and a link to this website must be provided.</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Third-Party Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Where third-party content is used on this website:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Proper attribution is provided</li>
                  <li>Content is used with permission or under applicable licenses</li>
                  <li>Trademarks and brand names are property of their respective owners</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Trademark Notice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Microsoft, Microsoft 365, Exchange Online, Intune, Microsoft Teams, OneDrive, SharePoint, Entra ID, Azure, Microsoft Defender, and PowerShell are trademarks or registered trademarks of Microsoft Corporation.</p>
                <p className="mt-4">All other trademarks mentioned on this website are the property of their respective owners.</p>
                <p className="mt-4">Use of trademarks does not imply endorsement or affiliation with trademark holders.</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Permission Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>If you wish to use content from this website beyond fair use, please contact:</p>
                <p className="font-semibold mt-2">Sayan Ghosh</p>
                <p>Email: <a href="mailto:sayan@infra365.online" className="text-primary hover:underline">sayan@infra365.online</a></p>
                <p className="mt-4">Please include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Specific content you wish to use</li>
                  <li>Intended purpose and context</li>
                  <li>How you will provide attribution</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Copyright Infringement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>If you believe your copyrighted work has been used on this website without authorization, please contact:</p>
                <p className="font-semibold mt-2">Email: <a href="mailto:sayan@infra365.online" className="text-primary hover:underline">sayan@infra365.online</a></p>
                <p className="mt-4">Please provide:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Description of the copyrighted work</li>
                  <li>Location of the allegedly infringing content</li>
                  <li>Your contact information</li>
                  <li>Statement of good faith belief that use is not authorized</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6 bg-muted/30">
              <CardContent className="pt-6">
                <p className="text-center font-semibold">
                  Unauthorized copying or distribution of content from this website may result in legal action.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Copyright;
