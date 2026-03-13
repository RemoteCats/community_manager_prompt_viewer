import { useState, useEffect, useMemo } from "react";
import { Search, Copy, Check, Filter, X, Heart, BookOpen } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useFavorites } from "@/hooks/useFavorites";

interface Prompt {
  id: number;
  platform: string;
  category: string;
  tone: string;
  situation: string;
  prompt: string;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [selectedSituation, setSelectedSituation] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const { favorites, toggleFavorite, isFavorite, clearFavorites, count: favoritesCount } = useFavorites();

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
    return prompts.filter((prompt) => {
      // Check if favorites-only filter is active
      if (showFavoritesOnly && !isFavorite(prompt.id)) {
        return false;
      }

      const matchesSearch =
        searchQuery === "" ||
        prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tone.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPlatform =
        selectedPlatform === null || prompt.platform === selectedPlatform;
      const matchesCategory =
        selectedCategory === null || prompt.category === selectedCategory;
      const matchesTone = selectedTone === null || prompt.tone === selectedTone;
      const matchesSituation =
        selectedSituation === null || prompt.situation === selectedSituation;

      return (
        matchesSearch &&
        matchesPlatform &&
        matchesCategory &&
        matchesTone &&
        matchesSituation
      );
    });
  }, [
    prompts,
    searchQuery,
    selectedPlatform,
    selectedCategory,
    selectedTone,
    selectedSituation,
    showFavoritesOnly,
    favorites,
  ]);

  // Copy to clipboard
  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
                    AI Community Manager OS
                  </h1>
                  <p className="text-sm text-gray-300 mt-2">
                    10,000 AI-Ready Prompts for Every Platform, Tone & Situation
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
              <a href="/blog" className="px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 rounded transition flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Blog
              </a>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search prompts by keyword, category, or tone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900 border-border text-white placeholder:text-gray-400"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="border-border text-white bg-gray-900 hover:bg-gray-800"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                variant={showFavoritesOnly ? "default" : "outline"}
                className={showFavoritesOnly ? "bg-purple-600 text-white hover:bg-purple-700" : "border-border text-white bg-gray-900 hover:bg-gray-800"}
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorites {favoritesCount > 0 && `(${favoritesCount})`}
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-900 border border-border rounded">
                {/* Platform Filter */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-2">
                    Platform
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <button
                      onClick={() => setSelectedPlatform(null)}
                      className={`w-full text-left px-2 py-1 text-sm rounded transition ${
                        selectedPlatform === null
                          ? "bg-purple-600 text-white"
                          : "hover:bg-gray-800 text-white"
                      }`}
                    >
                      All Platforms
                    </button>
                    {platforms.map((platform) => (
                      <button
                        key={platform}
                        onClick={() => setSelectedPlatform(platform)}
                        className={`w-full text-left px-2 py-1 text-sm rounded transition ${
                          selectedPlatform === platform
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-800 text-white"
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-2">
                    Category
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-2 py-1 text-sm rounded transition ${
                        selectedCategory === null
                          ? "bg-purple-600 text-white"
                          : "hover:bg-gray-800 text-white"
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-2 py-1 text-sm rounded transition ${
                          selectedCategory === category
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-800 text-white"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tone Filter */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-2">
                    Tone
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <button
                      onClick={() => setSelectedTone(null)}
                      className={`w-full text-left px-2 py-1 text-sm rounded transition ${
                        selectedTone === null
                          ? "bg-purple-600 text-white"
                          : "hover:bg-gray-800 text-white"
                      }`}
                    >
                      All Tones
                    </button>
                    {tones.map((tone) => (
                      <button
                        key={tone}
                        onClick={() => setSelectedTone(tone)}
                        className={`w-full text-left px-2 py-1 text-sm rounded transition ${
                          selectedTone === tone
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-800 text-white"
                        }`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Situation Filter */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-2">
                    Situation
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <button
                      onClick={() => setSelectedSituation(null)}
                      className={`w-full text-left px-2 py-1 text-sm rounded transition ${
                        selectedSituation === null
                          ? "bg-purple-600 text-white"
                          : "hover:bg-gray-800 text-white"
                      }`}
                    >
                      All Situations
                    </button>
                    {situations.map((situation) => (
                      <button
                        key={situation}
                        onClick={() => setSelectedSituation(situation)}
                        className={`w-full text-left px-2 py-1 text-sm rounded transition ${
                          selectedSituation === situation
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-800 text-white"
                        }`}
                      >
                        {situation}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Active Filters Display */}
            {(selectedPlatform ||
              selectedCategory ||
              selectedTone ||
              selectedSituation) && (
              <div className="flex flex-wrap gap-2">
                {selectedPlatform && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 text-white text-xs rounded">
                    {selectedPlatform}
                    <button
                      onClick={() => setSelectedPlatform(null)}
                      className="hover:opacity-70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedCategory && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 text-white text-xs rounded">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="hover:opacity-70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedTone && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 text-white text-xs rounded">
                    {selectedTone}
                    <button
                      onClick={() => setSelectedTone(null)}
                      className="hover:opacity-70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedSituation && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 text-white text-xs rounded">
                    {selectedSituation}
                    <button
                      onClick={() => setSelectedSituation(null)}
                      className="hover:opacity-70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Results Count */}
            <div className="text-xs text-gray-400">
              {showFavoritesOnly ? (
                <>
                  Showing {filteredPrompts.length} favorite{filteredPrompts.length !== 1 ? "s" : ""} of {favoritesCount} saved
                </>
              ) : (
                <>
                  Showing {filteredPrompts.length} of {prompts.length} prompts
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400">
              {showFavoritesOnly
                ? "No favorite prompts yet. Start bookmarking prompts to save them here!"
                : "No prompts found. Try adjusting your filters or search query."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredPrompts.map((prompt) => (
              <Card
                key={prompt.id}
                className="p-4 border border-border hover:border-purple-600 transition bg-gray-900"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-widest bg-purple-700 text-white rounded">
                        {prompt.platform}
                      </span>
                      <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-widest bg-purple-600 text-white rounded">
                        {prompt.category}
                      </span>
                      <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-widest bg-purple-500 text-white rounded">
                        {prompt.tone}
                      </span>
                      <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-widest bg-purple-400 text-white rounded">
                        {prompt.situation}
                      </span>
                    </div>

                    <div className="font-mono text-sm leading-relaxed text-white bg-gray-800 p-3 rounded border border-border">
                      {prompt.prompt}
                    </div>

                    <div className="text-xs text-gray-400 mt-2">
                      Prompt #{prompt.id}
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex gap-2">
                    <button
                      onClick={() => toggleFavorite(prompt.id)}
                      className="p-2 hover:bg-gray-800 rounded transition"
                      title={isFavorite(prompt.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorite(prompt.id)
                            ? "fill-purple-600 text-purple-600"
                            : "text-gray-400 hover:text-white"
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => copyToClipboard(prompt.prompt, prompt.id)}
                      className="p-2 hover:bg-gray-800 rounded transition"
                      title="Copy prompt"
                    >
                      {copiedId === prompt.id ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-400 hover:text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
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
