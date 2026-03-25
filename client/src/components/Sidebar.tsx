import { useState } from "react";
import { Menu, X, Home, BookOpen, Info, Mail, ShoppingCart } from "lucide-react";
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
        className="fixed left-4 top-4 z-50 p-2 rounded-lg bg-white/70 backdrop-blur-xl border border-white/20 hover:bg-white/80 transition-all"
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-purple-600" />
        ) : (
          <Menu className="w-6 h-6 text-purple-600" />
        )}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-white/70 backdrop-blur-xl border-r border-white/20 z-40 transition-transform duration-300 slide-in ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-20">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/spark-collective-logo.png"
              alt="Spark Collective"
              className="h-12 w-auto mb-2"
            />
            <h2 className="text-xl font-bold gradient-text">Community Manager OS</h2>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavigate(item.href)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-100/50 transition-colors group"
                >
                  <Icon className="w-5 h-5 group-hover:text-purple-600 transition-colors" />
                  <span className="font-medium group-hover:text-purple-600 transition-colors">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="my-6 border-t border-white/20" />

          {/* CTA Button */}
          <a
            href="https://nestuge.me/sparkcollective"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg futuristic-button text-white font-semibold transition-all hover:shadow-xl"
          >
            <ShoppingCart className="w-5 h-5" />
            Buy Template
          </a>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-xs text-gray-600 text-center">
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
