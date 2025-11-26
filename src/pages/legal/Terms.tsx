import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="Terms and conditions for using Sayan Ghosh's professional portfolio website"
        keywords="terms and conditions, legal, usage terms"
      />
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Terms & Conditions</h1>
            <p className="text-sm text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>1. Content Ownership</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>All content on this website, including but not limited to text, images, code examples, case studies, and knowledge base articles, is the intellectual property of Sayan Ghosh unless otherwise stated.</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>2. Permitted Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>You may view and use the content on this website for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personal reference and learning</li>
                  <li>Educational purposes</li>
                  <li>Professional evaluation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>3. Prohibited Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>You may not:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Copy, reproduce, or redistribute content without explicit written permission</li>
                  <li>Use content for commercial purposes without authorization</li>
                  <li>Claim authorship of any content presented on this website</li>
                  <li>Scrape, harvest, or extract data through automated means</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>4. No Professional Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>The information provided on this website is for general informational purposes only. It does not constitute professional IT consulting, technical advice, or recommendations for your specific situation.</p>
                <p>Sayan Ghosh assumes no liability for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Actions taken based on information from this website</li>
                  <li>Technical issues arising from implementation of guides or tutorials</li>
                  <li>Business decisions made using case study information</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>5. No Warranties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>This website and its content are provided "as is" without warranties of any kind, either express or implied, including but not limited to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Accuracy or completeness of information</li>
                  <li>Fitness for a particular purpose</li>
                  <li>Non-infringement</li>
                  <li>Uninterrupted or error-free operation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>6. Third-Party Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>This website may contain links to third-party websites, tools, or resources. Sayan Ghosh is not responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Content on external websites</li>
                  <li>Privacy practices of third parties</li>
                  <li>Availability or functionality of external services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>7. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Sayan Ghosh reserves the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the updated terms.</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>8. Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
