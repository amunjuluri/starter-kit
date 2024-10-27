import Link from 'next/link';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import { SocialLinks } from './social-links';

export const Footer = () => {
  const { publication } = useAppContext();
  const PUBLICATION_LOGO = publication.preferences.logo;

  const FooterSection = ({ title, links }: { title: string; links: string[] }) => (
    <div className="relative z-10">
      <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-slate-400">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a 
              href="#" 
              className="group relative text-sm text-slate-300 transition-all duration-300 hover:text-white"
            >
              <span className="relative">
                <span className="relative z-10">{link}</span>
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-black">
      {/* Gradient Orbs */}
      <div className="absolute left-1/4 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[100px]" />
      <div className="absolute right-1/4 top-0 -z-10 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-purple-500/20 blur-[100px]" />
      
      {/* Main Content */}
      <Container className="relative z-10">
        <div className="px-6 pb-20 pt-24">
          {/* Logo Section */}
          <div className="mb-20">
            <div className="flex justify-center">
              {PUBLICATION_LOGO ? (
                <Link
                  href="/"
                  aria-label={`${publication.title} home page`}
                  className="group relative"
                >
                  <div className="absolute -inset-x-6 -inset-y-4 hidden rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur-lg transition duration-500 group-hover:opacity-100 group-hover:duration-200 dark:block" />
                  <img 
                    className="relative h-12 w-auto transform transition duration-500 will-change-transform group-hover:scale-105" 
                    src={PUBLICATION_LOGO} 
                    alt={publication.title}
                  />
                </Link>
              ) : (
                <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
                  {publication.title}
                </h1>
              )}
            </div>
          </div>

          {/* Links Grid */}
          <div className="mb-20 grid gap-x-8 gap-y-12 md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-full grid gap-x-8 gap-y-12 md:col-span-4 md:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
              <FooterSection
                title="Stay Connected"
                links={['Contact us', 'Book a demo', 'Newsletter', 'Community']}
              />
              <FooterSection
                title="Resources"
                links={['Documentation', 'Guides', 'Source Code', 'Blog']}
              />
              <FooterSection
                title="Company"
                links={['About', 'Careers', 'Press', 'Partners']}
              />
            </div>

            {/* Social & Legal Section */}
            <div className="col-span-2 flex flex-col justify-between space-y-8">
              {/* Social Links */}
              <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent p-6 backdrop-blur-sm">
                <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-slate-400">
                  Follow Us
                </h3>
                <SocialLinks />
              </div>

              {/* Legal Links */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
                  <a href="#" className="hover:text-white">Privacy</a>
                  <a href="#" className="hover:text-white">Terms</a>
                  <a href="#" className="hover:text-white">Cookies</a>
                </div>
                <p className="text-sm text-slate-500">
                  © {new Date().getFullYear()} {publication.title}. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;