import { useState } from "react";
import { Menu, X, Home, BookOpen, Info, Mail } from "lucide-react";
import { useLocation } from "wouter";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();

  const menuItems = [
    { label: "Prompts", href: "/", icon: Home },
    { label: "Blog", href: "/blog", icon: BookOpen },
    { label: "About", href: "#about", icon: Info },
    { label: "Contact", href: "#contact", icon: Mail },
  ];

  const handleNavigate = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      setLocation(href);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all"
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-700 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-20 h-full flex flex-col">
          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Spark Collective</h2>
            <p className="text-xs text-gray-400 mt-2">AI Community Manager OS</p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavigate(item.href)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-purple-600/50 hover:text-white transition-colors group"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="my-6 border-t border-gray-700" />

          {/* CTA Button */}
          <a
            href="https://nestuge.me/sparkcollective"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-center hover:shadow-lg transition-all hover:scale-105"
          >
            Buy Full Template
          </a>

          {/* Footer Info */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-400 text-center">
              10,000 AI-Ready Prompts
            </p>
            <p className="text-xs text-gray-500 text-center mt-1">
              Made by Spark Collective
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
