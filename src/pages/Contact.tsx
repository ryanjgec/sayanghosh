import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Linkedin, MapPin, Clock, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const cvDownloadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
});

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [cvName, setCvName] = useState("");
  const [cvEmail, setCvEmail] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const result = contactSchema.safeParse({
      name,
      email,
      phone,
      message,
    });

    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      trackEvent("contact_form_submit", "Contact", "Form Submission");
      
      const { error } = await supabase.functions.invoke("submit-contact", {
        body: {
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone || undefined,
          message: result.data.message,
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to submit form");
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCvDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = cvDownloadSchema.safeParse({
      name: cvName,
      email: cvEmail,
    });

    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    
    try {
      // Track CV download in database
      const { error } = await supabase
        .from("cv_downloads")
        .insert([{
          name: result.data.name,
          email: result.data.email,
        }]);

      if (error) {
        throw error;
      }

      trackEvent("cv_download", "Contact", "CV Download");
      
      toast({
        title: "Download Starting",
        description: "Your CV download will begin shortly. Thank you for your interest!",
      });

      // Trigger download
      const link = document.createElement('a');
      link.href = '/Sayan_Resume_M365.pdf';
      link.download = 'Sayan_Ghosh_Resume_M365.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setCvName("");
      setCvEmail("");
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: "Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact & Resume"
        description="Get in touch with Sayan Ghosh or download his resume. Microsoft 365 Administrator with 4+ years experience. Available for M365 and Cloud Services roles, currently serving notice period."
        keywords="contact Sayan Ghosh, M365 administrator contact, hire Microsoft 365 expert, cloud services consultant, Sayan Ghosh resume"
      />
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Contact & Resume</h1>
          <p className="text-lg text-muted-foreground">
            Let's discuss opportunities or download my CV
          </p>
        </div>

        {/* Professional Summary Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                <FileText className="h-12 w-12 text-primary" />
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

              {/* Key Highlights */}
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
            </CardContent>
          </Card>
        </div>

        {/* CV Download Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download My Resume
              </CardTitle>
              <CardDescription>
                Provide your details to download my complete CV
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCvDownload} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cv-name">Name *</Label>
                    <Input
                      id="cv-name"
                      placeholder="Your name"
                      value={cvName}
                      onChange={(e) => setCvName(e.target.value)}
                      required
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cv-email">Email *</Label>
                    <Input
                      id="cv-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={cvEmail}
                      onChange={(e) => setCvEmail(e.target.value)}
                      required
                      maxLength={255}
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={isDownloading}>
                  <Download className="mr-2 h-5 w-5" />
                  {isDownloading ? "Processing..." : "Download CV (PDF)"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
                <CardDescription>Feel free to reach out through any channel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <a
                      href="mailto:sayan@infra365.online"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      sayan@infra365.online
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Phone</p>
                    <p className="text-sm text-muted-foreground">+91 70011 64440</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Linkedin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-sm">LinkedIn</p>
                    <a
                      href="https://linkedin.com/in/sayankghosh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      linkedin.com/in/sayankghosh
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Location</p>
                    <p className="text-sm text-muted-foreground">India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Availability</p>
                    <p className="text-sm text-muted-foreground">Currently Serving Notice Period</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <p className="text-sm">
                  <strong>Currently Open to Opportunities</strong>
                  <br />
                  Looking for M365 Administrator or Cloud Services Engineer roles.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      maxLength={100}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      maxLength={255}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 70011 64440"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={20}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, opportunity, or question..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      required
                      maxLength={1000}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    You'll receive a confirmation email once your message is submitted.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
