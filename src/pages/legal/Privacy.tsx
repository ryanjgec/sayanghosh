import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy policy for Sayan Ghosh's portfolio website - India DPDP Act 2023 compliant"
        keywords="privacy policy, data protection, DPDP Act 2023"
      />
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
            <p className="mb-8 text-muted-foreground">This Privacy Policy is compliant with the Digital Personal Data Protection Act, 2023 (DPDP Act) of India.</p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>1. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We collect limited personal information only when you voluntarily provide it:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Contact Forms:</strong> Name, email address, and message content</li>
                  <li><strong>Resume Downloads:</strong> Name and email address</li>
                  <li><strong>Analytics Data:</strong> Anonymous usage statistics (page views, device type, location)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>2. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Your information is used solely for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Responding to your inquiries via contact forms</li>
                  <li>Providing resume download access</li>
                  <li>Improving website performance and user experience</li>
                  <li>Understanding visitor demographics (anonymously)</li>
                </ul>
                <p className="font-semibold mt-4">We do NOT:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Sell your personal data to third parties</li>
                  <li>Share your information without your consent</li>
                  <li>Use your data for marketing purposes without permission</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>3. Data Storage and Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Your data is stored securely using industry-standard encryption and security practices:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Data is stored on secure cloud infrastructure</li>
                  <li>Access is restricted to authorized personnel only</li>
                  <li>Regular security audits are conducted</li>
                  <li>Data transmission is encrypted using HTTPS</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>4. Your Consent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>By submitting forms or downloading content on this website, you explicitly consent to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Collection of the information you provide</li>
                  <li>Processing of your data as described in this policy</li>
                  <li>Storage of your information for legitimate purposes</li>
                </ul>
                <p className="mt-4">You have the right to withdraw consent at any time by contacting us.</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>5. Your Rights (DPDP Act 2023)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Under the Digital Personal Data Protection Act 2023, you have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request information about data we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Grievance:</strong> File a complaint regarding data handling</li>
                </ul>
                <p className="mt-4">To exercise these rights, contact: <a href="mailto:sayan@infra365.online" className="text-primary hover:underline">sayan@infra365.online</a></p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>6. Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>
                <p>You may request deletion of your data at any time.</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>7. Cookies and Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>This website may use cookies and analytics tools to improve user experience. These tools collect:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Anonymous browsing behavior</li>
                  <li>Device and browser information</li>
                  <li>Geographic location (country/region level)</li>
                </ul>
                <p className="mt-4">You can disable cookies in your browser settings at any time.</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>8. Changes to Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We may update this Privacy Policy periodically. The "Last Updated" date at the top indicates the most recent revision. Continued use of the website constitutes acceptance of the updated policy.</p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>9. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact:</p>
                <p className="font-semibold mt-2">Sayan Ghosh</p>
                <p>Email: <a href="mailto:sayan@infra365.online" className="text-primary hover:underline">sayan@infra365.online</a></p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
