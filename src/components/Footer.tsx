import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Sayan Ghosh</h3>
            <p className="text-sm text-secondary-foreground/80">
              Microsoft 365 Administrator & Cloud Services Engineer with 4+ years of experience managing global M365 tenants.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link to="/knowledge-base" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/legal/terms" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legal/disclaimer" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/legal/copyright" className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Copyright Notice
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <a href="mailto:sayan@infra365.online" className="hover:text-secondary-foreground/80 transition-colors">
                  sayan@infra365.online
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Linkedin className="h-4 w-4" />
                <a
                  href="https://linkedin.com/in/sayankghosh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary-foreground/80 transition-colors"
                >
                  linkedin.com/in/sayankghosh
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary-foreground/20 text-center text-sm text-secondary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Sayan Ghosh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
