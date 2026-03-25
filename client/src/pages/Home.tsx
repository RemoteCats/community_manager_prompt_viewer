import { useState, useEffect, useMemo } from "react";
import { Search, Copy, Check, Filter, X, Heart, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useFavorites } from "@/hooks/useFavorites";
import Sidebar from "@/components/Sidebar";
import EventsBanner from "@/components/EventsBanner";

interface Prompt {
  id: number;
  platform: string;
  category: string;
  tone: string;
  situation: string;
  prompt: string;
}

const LOGO_URL = "/spark-collective-logo.png";
const PROMPTS_PER_PAGE = 10;

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
  const [currentPage, setCurrentPage] = useState(1);

  const { favorites, toggleFavorite, isFavorite, count: favoritesCount } = useFavorites();

  useEffect(() => {
    fetch("/prompts.json")
      .then((res) => res.json())
      .then((data) => setPrompts(data))
      .catch((err) => console.error("Error loading prompts:", err));
  }, []);

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

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      if (showFavoritesOnly && !isFavorite(prompt.id)) {
        return false;
      }

      const matchesSearch =
        searchQuery === "" ||
        prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tone.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPlatform = selectedPlatform === null || prompt.platform === selectedPlatform;
      const matchesCategory = selectedCategory === null || prompt.category === selectedCategory;
      const matchesTone = selectedTone === null || prompt.tone === selectedTone;
      const matchesSituation = selectedSituation === null || prompt.situation === selectedSituation;

      return matchesSearch && matchesPlatform && matchesCategory && matchesTone && matchesSituation;
    });
  }, [prompts, searchQuery, selectedPlatform, selectedCategory, selectedTone, selectedSituation, showFavoritesOnly, favorites]);

  const totalPages = Math.ceil(filteredPrompts.length / PROMPTS_PER_PAGE);
  const paginatedPrompts = useMemo(() => {
    const startIdx = (currentPage - 1) * PROMPTS_PER_PAGE;
    return filteredPrompts.slice(startIdx, startIdx + PROMPTS_PER_PAGE);
  }, [filteredPrompts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedPlatform, selectedCategory, selectedTone, selectedSituation, showFavoritesOnly]);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo and Product Showcase */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 py-6 px-4">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Community Manager OS</h1>
            <p className="text-gray-600 mt-1">Free: 10,000 AI-Ready Prompts</p>
          </div>
          <div className="flex items-center gap-6">
            {/* Product Showcase */}
            <div className="text-right">
              <img 
                src="https://cdn.manus.im/community_manager_os_template.webp" 
                alt="AI Community Manager OS Template" 
                className="h-32 w-auto rounded-lg shadow-lg border-2 border-purple-200 mb-2" 
              />
              <p className="text-sm font-bold text-gray-900">Buy Full Template</p>
              <a 
                href="https://nestuge.me/sparkcollective" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-semibold"
              >
                Get Premium Version
              </a>
            </div>
            {/* Logo */}
            <button onClick={() => setLocation("/")} className="hover:opacity-80 transition-opacity" title="Go to home">
              <img src={LOGO_URL} alt="Spark Collective" className="h-16 w-auto" />
            </button>
          </div>
        </div>
      </div>

      {/* Firecrawl Events Tracker Banner */}
      <EventsBanner />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 w-full">
          <div className="container max-w-7xl mx-auto py-8 px-4">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Community Manager OS</h1>
              <p className="text-lg text-gray-600">10,000 AI-Ready Prompts for Every Platform, Tone & Situation</p>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search prompts by keyword, category, or tone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="border-gray-200">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                variant={showFavoritesOnly ? "default" : "outline"}
                className={showFavoritesOnly ? "bg-purple-600 text-white border-purple-600" : "border-gray-200"}
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorites {favoritesCount > 0 && `(${favoritesCount})`}
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg mb-6">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 block mb-2">Platform</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <button
                      onClick={() => setSelectedPlatform(null)}
                      className={`w-full text-left px-2 py-1 text-sm rounded transition ${selectedPlatform === null ? "bg-purple-600 text-white" : "hover:bg-gray-200 text-gray-900"}`}
                    >
                      All Platforms
                    </button>
                    {platforms.map((platform) => (
                      <button
                        key={platform}
                        onClick={() => setSelectedPlatform(platform)}
                        className={`w-full text-left px-2 py-1 text-sm rounded transition ${selectedPlatform === platform ? "bg-purple-600 text-white" : "hover:bg-gray-200 text-gray-900"}`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 block mb-2">Category</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-2 py-1 text-sm rounded transition ${selectedCategory === null ? "bg-purple-600 text-white" : "hover:bg-gray-200 text-gray-900"}`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-2 py-1 text-sm rounded transition ${selectedCategory === category ? "bg-purple-600 text-white" : "hover:bg-gray-200 text-gray-900"}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 block mb-2">Tone</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <button
                      onClick={() => setSelectedTone(null)}
                      className={`w-full text-left px-2 py-1 text-sm rounded transition ${selectedTone === null ? "bg-purple-600 text-white" : "hover:bg-gray-200 text-gray-900"}`}
                    >
                      All Tones
                    </button>
                    {tones.map((tone) => (
                      <button
                        key={tone}
                        onClick={() => setSelectedTone(tone)}
                        className={`w-full text-left px-2 py-1 text-sm rounded transition ${selectedTone === tone ? "bg-purple-600 text-white" : "hover:bg-gray-200 text-gray-900"}`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-600 block mb-2">Situation</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <button
                      onClick={() => setSelectedSituation(null)}
                      className={`w-full text-left px-2 py-1 text-sm rounded transition ${selectedSituation === null ? "bg-purple-600 text-white" : "hover:bg-gray-200 text-gray-900"}`}
                    >
                      All Situations
                    </button>
                    {situations.map((situation) => (
                      <button
                        key={situation}
                        onClick={() => setSelectedSituation(situation)}
                        className={`w-full text-left px-2 py-1 text-sm rounded transition ${selectedSituation === situation ? "bg-purple-600 text-white" : "hover:bg-gray-200 text-gray-900"}`}
                      >
                        {situation}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Active Filters Display */}
            {(selectedPlatform || selectedCategory || selectedTone || selectedSituation) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPlatform && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 text-white text-xs rounded">
                    {selectedPlatform}
                    <button onClick={() => setSelectedPlatform(null)} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedCategory && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 text-white text-xs rounded">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory(null)} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedTone && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 text-white text-xs rounded">
                    {selectedTone}
                    <button onClick={() => setSelectedTone(null)} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedSituation && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 text-white text-xs rounded">
                    {selectedSituation}
                    <button onClick={() => setSelectedSituation(null)} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Results Count */}
            <div className="text-sm text-gray-600 mb-6">
              {showFavoritesOnly ? (
                <>Showing {paginatedPrompts.length} of {filteredPrompts.length} favorite{filteredPrompts.length !== 1 ? "s" : ""}</>
              ) : (
                <>Showing {paginatedPrompts.length} of {filteredPrompts.length} prompts</>
              )}
            </div>

            {/* Prompts Grid */}
            {paginatedPrompts.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {showFavoritesOnly
                    ? "No favorite prompts yet. Start bookmarking prompts to save them here!"
                    : "No prompts found. Try adjusting your filters or search query."}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 mb-8">
                {paginatedPrompts.map((prompt) => (
                  <Card key={prompt.id} className="p-4 border border-gray-200 hover:border-purple-300 transition bg-white">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-widest bg-purple-100 text-purple-700 rounded">
                            {prompt.platform}
                          </span>
                          <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-widest bg-pink-100 text-pink-700 rounded">
                            {prompt.category}
                          </span>
                          <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-widest bg-blue-100 text-blue-700 rounded">
                            {prompt.tone}
                          </span>
                          <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-widest bg-green-100 text-green-700 rounded">
                            {prompt.situation}
                          </span>
                        </div>

                        <div className="font-mono text-sm leading-relaxed text-gray-900 bg-gray-50 p-3 rounded border border-gray-200">
                          {prompt.prompt}
                        </div>

                        <div className="text-xs text-gray-500 mt-2">Prompt #{prompt.id}</div>
                      </div>

                      <div className="flex-shrink-0 flex gap-2">
                        <button
                          onClick={() => toggleFavorite(prompt.id)}
                          className="p-2 hover:bg-gray-100 rounded transition"
                          title={isFavorite(prompt.id) ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              isFavorite(prompt.id)
                                ? "fill-purple-600 text-purple-600"
                                : "text-gray-400 hover:text-purple-600"
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => copyToClipboard(prompt.prompt, prompt.id)}
                          className="p-2 hover:bg-gray-100 rounded transition"
                          title="Copy prompt"
                        >
                          {copiedId === prompt.id ? (
                            <Check className="w-5 h-5 text-purple-600" />
                          ) : (
                            <Copy className="w-5 h-5 text-gray-400 hover:text-purple-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                    className="border-gray-200"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    className="border-gray-200"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
