'use client';

import { useTheme } from "next-themes";
import { Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300bg-gradient-to-r from-violet-600/20 to-blue-600/20 backdrop-blur-lg shadow-sm ${
      isScrolled 
        ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Certificate Generator
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/?tab=template#template-section"
              className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
            >
              Templates
            </Link>
            <a href="#features" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Features
            </a>
            <a href="pricing" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Pricing
            </a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="default"
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
            >
              Get Started
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 