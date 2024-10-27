import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, Menu } from 'lucide-react';
import { PublicationNavbarItem } from '../generated/graphql';
import { Button } from './button';
import { Container } from './container';
import { useAppContext } from './contexts/appContext';
import { PublicationLogo } from './publication-logo';
import PublicationSidebar from './sidebar';

// Update the type guard to be more specific
function hasUrl(
  navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string; label: string } {
  return !!navbarItem.url && navbarItem.url.length > 0 && !!navbarItem.label;
}

export const Header = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const { publication } = useAppContext();
  const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
  const visibleItems = navbarItems.slice(0, 3);
  const hiddenItems = navbarItems.slice(3);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const NavItem = ({ url, label }: { url: string; label: string }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      {label}
    </a>
  );

  return (
    <header className="relative border-b border-white/10 bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-transparent" />
      
      <Container className="relative">
        <div className="flex h-20 items-center justify-between px-4">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              type="outline"
              label=""
              icon={<Menu className="h-5 w-5" />}
              className="rounded-full border-white/20 bg-white/5 p-2 text-white backdrop-blur-sm hover:bg-white/10"
              onClick={toggleSidebar}
            />
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <PublicationLogo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-1">
              {visibleItems.map((item) => (
                <li key={item.url}>
                  <NavItem url={item.url} label={item.label} />
                </li>
              ))}

              {hiddenItems.length > 0 && (
                <li>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="group inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20">
                        More
                        <ChevronDown className="ml-2 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                      </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="mt-2 w-48 overflow-hidden rounded-lg border border-white/10 bg-slate-800 p-1 shadow-lg backdrop-blur-sm"
                        align="end"
                        sideOffset={5}
                      >
                        {hiddenItems.map((item) => (
                          <DropdownMenu.Item asChild key={item.url}>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block rounded-md px-3 py-2 text-sm text-white transition-colors hover:bg-white/10 focus:outline-none"
                            >
                              {item.label}
                            </a>
                          </DropdownMenu.Item>
                        ))}
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </Container>

      {/* Mobile Sidebar */}
      {isSidebarVisible && (
        <PublicationSidebar navbarItems={navbarItems} toggleSidebar={toggleSidebar} />
      )}
    </header>
  );
};

export default Header;