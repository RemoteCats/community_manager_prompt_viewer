import { useState, useMemo, useEffect } from "react";
import { Search, Copy, Check, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Prompt {
  id: number;
  platform: string;
  category: string;
  tone: string;
  situation: string;
  prompt: string;
}

export default function Home() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [selectedSituation, setSelectedSituation] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Load prompts from JSON
  useEffect(() => {
    fetch("/prompts.json")
      .then((res) => res.json())
      .then((data) => setPrompts(data))
      .catch((err) => console.error("Error loading prompts:", err));
  }, []);

  // Get unique values for filters
  const platforms = useMemo(
    () => Array.from(new Set(prompts.map((p) => p.platform))).sort(),
    [prompts]
  );
  const categories = useMemo(
    () => Array.from(new Set(prompts.map((p) => p.category))).sort(),
    [prompts]
  );
  const tones = useMemo(
    () => Array.from(new Set(prompts.map((p) => p.tone))).sort(),
    [prompts]
  );
  const situations = useMemo(
    () => Array.from(new Set(prompts.map((p) => p.situation))).sort(),
    [prompts]
  );

  // Filter prompts
  const filteredPrompts = useMemo(() => {
    return prompts.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.situation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPlatform = !selectedPlatform || p.platform === selectedPlatform;
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesTone = !selectedTone || p.tone === selectedTone;
      const matchesSituation = !selectedSituation || p.situation === selectedSituation;

      return matchesSearch && matchesPlatform && matchesCategory && matchesTone && matchesSituation;
    });
  }, [prompts, searchQuery, selectedPlatform, selectedCategory, selectedTone, selectedSituation]);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearFilters = () => {
    setSelectedPlatform(null);
    setSelectedCategory(null);
    setSelectedTone(null);
    setSelectedSituation(null);
    setSearchQuery("");
  };

  const activeFiltersCount = [selectedPlatform, selectedCategory, selectedTone, selectedSituation].filter((f) => f !== null).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-cyan-200/50 shadow-sm">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-slate-900">
                AI Prompt Library
              </h1>
              <p className="text-slate-600 mt-1">
                10,000+ prompts for every community management scenario
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {filteredPrompts.length.toLocaleString()}
              </div>
              <p className="text-sm text-slate-600">prompts found</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search prompts by keyword, platform, category, tone, or situation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-base bg-white border-2 border-cyan-200 focus:border-blue-500 rounded-lg"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="px-4 border-2 border-cyan-200 hover:border-blue-500"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-cyan-200 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-900">Refine Your Search</h3>
                {activeFiltersCount > 0 && (
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    size="sm"
                    className="text-orange-600 hover:bg-orange-50"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Platform Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Platform
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {platforms.map((platform) => (
                      <label key={platform} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPlatform === platform}
                          onChange={(e) =>
                            setSelectedPlatform(e.target.checked ? platform : null)
                          }
                          className="w-4 h-4 rounded border-cyan-300 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-slate-700">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategory === category}
                          onChange={(e) =>
                            setSelectedCategory(e.target.checked ? category : null)
                          }
                          className="w-4 h-4 rounded border-cyan-300 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-slate-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tone Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Tone
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {tones.map((tone) => (
                      <label key={tone} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTone === tone}
                          onChange={(e) =>
                            setSelectedTone(e.target.checked ? tone : null)
                          }
                          className="w-4 h-4 rounded border-cyan-300 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-slate-700">{tone}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Situation Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Situation
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {situations.map((situation) => (
                      <label key={situation} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSituation === situation}
                          onChange={(e) =>
                            setSelectedSituation(e.target.checked ? situation : null)
                          }
                          className="w-4 h-4 rounded border-cyan-300 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-slate-700">{situation}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              No prompts found
            </h2>
            <p className="text-slate-600 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
              onClick={clearFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt) => (
              <Card
                key={prompt.id}
                className="bg-white border-2 border-cyan-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Metadata */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {prompt.platform}
                    </span>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                      {prompt.tone}
                    </span>
                  </div>

                  {/* Category & Situation */}
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold text-slate-600 mb-1">
                      {prompt.category}
                    </h3>
                    <p className="text-xs text-slate-500 italic">
                      Situation: {prompt.situation}
                    </p>
                  </div>

                  {/* Prompt Text */}
                  <p className="text-slate-800 leading-relaxed mb-4 text-sm line-clamp-4">
                    {prompt.prompt}
                  </p>

                  {/* Copy Button */}
                  <Button
                    onClick={() => copyToClipboard(prompt.prompt, prompt.id)}
                    className={`w-full transition-all duration-300 ${
                      copiedId === prompt.id
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    }`}
                  >
                    {copiedId === prompt.id ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Prompt
                      </>
                    )}
                  </Button>

                  {/* Prompt ID */}
                  <p className="text-xs text-slate-400 mt-3 text-center">
                    Prompt #{prompt.id}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="container text-center">
          <p className="text-slate-400">
            Community Manager OS • AI Prompt Library • {prompts.length.toLocaleString()} prompts
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Made by Spark Collective ✨
          </p>
        </div>
      </footer>
    </div>
  );
}
