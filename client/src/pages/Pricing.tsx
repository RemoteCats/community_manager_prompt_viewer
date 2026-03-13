import { useLocation } from 'wouter';
import { Check, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Pricing() {
  const [, setLocation] = useLocation();

  const products = [
    {
      id: 'notion-template',
      name: 'Notion Template',
      price: 79,
      description: 'Pre-built community management system',
      icon: '📋',
      features: [
        'Complete community dashboard',
        'Member management system',
        'Event planning templates',
        'Content calendar',
        'Analytics dashboard',
        'Customizable workflows',
        'Database templates',
        'Integration guides',
      ],
      cta: 'Get Notion Template',
      highlighted: false,
    },
    {
      id: 'bundle',
      name: 'Ultimate Bundle',
      price: 99,
      originalPrice: 108,
      description: 'Everything you need to run a thriving community',
      icon: '⚡',
      features: [
        'All Notion Template features',
        '10,000 AI Prompts library',
        'Prompt Library access',
        'Priority email support',
        'Monthly updates',
        'Community access',
        'Exclusive templates',
        'Lifetime updates',
      ],
      cta: 'Get Ultimate Bundle',
      highlighted: true,
      badge: 'BEST VALUE',
    },
    {
      id: 'prompt-library',
      name: 'Prompt Library',
      price: 29,
      description: 'Downloadable collection of 10,000 prompts',
      icon: '💡',
      features: [
        '10,000 AI prompts',
        'All platforms included',
        'CSV, PDF, JSON formats',
        'Lifetime access',
        'Regular updates',
        'Commercial use allowed',
        'No subscription needed',
        'Instant download',
      ],
      cta: 'Get Prompt Library',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-border bg-black sticky top-0 z-50 shadow-sm">
        <div className="container py-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => setLocation('/')}
                  className="hover:opacity-80 transition-opacity"
                  title="Go to home"
                >
                  <img 
                    src="/spark-collective-logo.png" 
                    alt="Spark Collective" 
                    className="h-32 w-auto cursor-pointer"
                  />
                </button>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-white">
                    Pricing & Products
                  </h1>
                  <p className="text-sm text-gray-300 mt-2">
                    Choose the perfect plan to supercharge your community management
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                  Made by
                </p>
                <p className="text-sm font-semibold text-white">
                  Spark Collective
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-2 border-t border-border pt-4 -mx-6 px-6">
              <a href="/" className="px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 rounded transition">
                Prompts
              </a>
              <a href="/blog" className="px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 rounded transition">
                Blog
              </a>
              <a href="/pricing" className="px-4 py-2 text-sm font-medium text-purple-600 hover:bg-gray-800 rounded transition border-b-2 border-purple-600">
                Pricing
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get access to powerful community management tools and 10,000 AI prompts. No hidden fees, no subscriptions.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <Card
              key={product.id}
              className={`relative border transition-all ${
                product.highlighted
                  ? 'border-purple-600 bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl shadow-purple-600/20 md:scale-105'
                  : 'border-border bg-gray-900 hover:border-purple-600'
              }`}
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                    {product.badge}
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Icon & Name */}
                <div className="text-5xl mb-4">{product.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{product.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <p className="text-sm text-purple-400 mt-2">
                      Save ${product.originalPrice - product.price} (8% off)
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">One-time payment</p>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full mb-8 ${
                    product.highlighted
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-white border border-border'
                  }`}
                >
                  {product.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {/* Features */}
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    What's Included
                  </p>
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Compare All Products</h3>
          <Card className="border-border bg-gray-900 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Notion Template</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Prompt Library</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600 font-bold">Ultimate Bundle</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Notion Templates', notion: true, prompts: false, bundle: true },
                    { feature: '10,000 AI Prompts', notion: false, prompts: true, bundle: true },
                    { feature: 'Multiple Formats (CSV, PDF, JSON)', notion: false, prompts: true, bundle: true },
                    { feature: 'Community Dashboard', notion: true, prompts: false, bundle: true },
                    { feature: 'Member Management', notion: true, prompts: false, bundle: true },
                    { feature: 'Event Planning Templates', notion: true, prompts: false, bundle: true },
                    { feature: 'Content Calendar', notion: true, prompts: false, bundle: true },
                    { feature: 'Analytics Dashboard', notion: true, prompts: false, bundle: true },
                    { feature: 'Lifetime Access', notion: true, prompts: true, bundle: true },
                    { feature: 'Priority Support', notion: false, prompts: false, bundle: true },
                    { feature: 'Monthly Updates', notion: false, prompts: false, bundle: true },
                    { feature: 'Community Access', notion: false, prompts: false, bundle: true },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-gray-800/50 transition">
                      <td className="px-6 py-4 text-sm text-gray-300 font-medium">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {row.notion ? (
                          <Check className="w-5 h-5 text-purple-600 mx-auto" />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.prompts ? (
                          <Check className="w-5 h-5 text-purple-600 mx-auto" />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.bundle ? (
                          <Check className="w-5 h-5 text-purple-600 mx-auto" />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: 'Do I need a subscription?',
                a: 'No! All our products are one-time purchases with lifetime access. No recurring fees or subscriptions.',
              },
              {
                q: 'Can I use these commercially?',
                a: 'Yes, you can use all products for commercial purposes. No restrictions on how you use them.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee if you\'re not satisfied with your purchase.',
              },
              {
                q: 'Will I get updates?',
                a: 'Yes! Bundle members get monthly updates. Notion Template and Prompt Library get regular updates.',
              },
              {
                q: 'What formats are included?',
                a: 'Prompt Library includes CSV, PDF, and JSON formats for maximum compatibility.',
              },
              {
                q: 'Is there customer support?',
                a: 'Bundle members get priority email support. All customers get access to our community.',
              },
            ].map((item, idx) => (
              <Card key={idx} className="border-border bg-gray-900 p-6">
                <h4 className="font-bold text-white mb-3 flex items-start gap-2">
                  <Zap className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  {item.q}
                </h4>
                <p className="text-gray-300 text-sm">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16 border-t border-border">
          <h3 className="text-3xl font-bold mb-4">Ready to transform your community?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of community managers using our tools to create engaging, thriving communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 border border-border">
              View Free Resources
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-black mt-12">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm font-semibold text-white">
                AI Community Manager OS
              </p>
              <p className="text-xs text-gray-400 mt-1">
                10,000 AI-Ready Prompts for Community Managers
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                Made by
              </p>
              <p className="text-sm font-semibold text-white">
                Spark Collective
              </p>
            </div>
          </div>
          <div className="border-t border-border mt-6 pt-6 text-center">
            <p className="text-xs text-gray-400">
              © 2026 Spark Collective. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
