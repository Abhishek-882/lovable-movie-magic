
// This component is marked as read-only, so we cannot modify it directly.
// Instead, we will create a wrapper component that adds our location selector
// to the existing Navbar component.

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import LocationSelector from "./LocationSelector";
import AuthModal from "./AuthModal";

const NavbarWrapper = () => {
  const isMobile = useIsMobile();
  const { isAuthenticated, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
  }`;
  
  return (
    <header className={navClasses}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">CineBook</span>
          </Link>
          
          {/* Location Selector */}
          <div className="flex-shrink-0 md:order-1">
            <LocationSelector />
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/movies" className={navigationMenuTriggerStyle()}>
                    Movies
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/movies/coming-soon" className={navigationMenuTriggerStyle()}>
                    Coming Soon
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>More</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/bookings"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              My Bookings
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              View your past and upcoming bookings
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/offers"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              Offers
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Exclusive deals and discounts
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
          
          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="outline" className="hidden sm:inline-flex">
                    My Account
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="hidden sm:inline-flex"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:inline-flex"
              >
                Sign In
              </Button>
            )}
            
            {/* Mobile Menu */}
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                
                <SheetContent side="right" className="w-[275px] sm:w-[350px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-8 flex flex-col gap-4">
                    <Link to="/" className="text-lg font-medium">
                      Home
                    </Link>
                    <Link to="/movies" className="text-lg font-medium">
                      Movies
                    </Link>
                    <Link to="/movies/coming-soon" className="text-lg font-medium">
                      Coming Soon
                    </Link>
                    <Link to="/bookings" className="text-lg font-medium">
                      My Bookings
                    </Link>
                    
                    <div className="my-4 border-t" />
                    
                    {isAuthenticated ? (
                      <>
                        <Link to="/profile" className="text-lg font-medium">
                          My Account
                        </Link>
                        <Button variant="ghost" onClick={logout}>
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsAuthModalOpen(true)}>
                        Sign In
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default NavbarWrapper;
