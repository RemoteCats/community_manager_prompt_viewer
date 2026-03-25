import { ArrowRight } from "lucide-react";

const PRODUCT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663125095136/73XCVvWpcYFwjyUFSr5itr/hf_20260313_070937_2700dbee-9691-4722-94a8-185bed2b16cc_325112f4.webp";

export default function ProductShowcase() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Premium Template
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Unlock the full power of AI Community Manager OS with our premium template bundle
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="text-gray-700">10,000 AI-Ready Prompts</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="text-gray-700">Professional Chat Templates</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="text-gray-700">Community Management Toolkit</span>
              </div>
            </div>
          </div>

          {/* Right - Product Image with Arrows */}
          <div className="flex-1 relative">
            {/* Top Left Arrow */}
            <div className="absolute -top-12 left-0 flex items-center gap-2 animate-bounce">
              <ArrowRight className="w-8 h-8 text-purple-600 rotate-180" strokeWidth={3} />
              <ArrowRight className="w-8 h-8 text-purple-600 rotate-180" strokeWidth={3} />
            </div>

            {/* Bottom Right Arrow */}
            <div className="absolute -bottom-12 right-0 flex items-center gap-2 animate-bounce" style={{ animationDelay: "0.2s" }}>
              <ArrowRight className="w-8 h-8 text-purple-600" strokeWidth={3} />
              <ArrowRight className="w-8 h-8 text-purple-600" strokeWidth={3} />
            </div>

            {/* Product Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow">
              <img
                src={PRODUCT_IMAGE}
                alt="AI Community Manager OS Premium Template"
                className="w-full h-auto rounded-2xl"
              />
            </div>

            {/* CTA Text Below */}
            <div className="mt-8 text-center">
              <a
                href="https://nestuge.me/sparkcollective"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105"
              >
                Buy Full Template
              </a>
              <p className="text-sm text-gray-600 mt-3">
                Get instant access to all premium features
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
