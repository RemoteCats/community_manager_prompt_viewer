import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, X, Sparkles } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EventsBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get featured events for banner
  const { data: featuredItems, isLoading: isFeaturedLoading } = trpc.aggregator.getFeaturedItems.useQuery();
  const { data: searchEvents } = trpc.aggregator.searchEvents.useQuery(
    { query: searchQuery, limit: 10 },
    { enabled: searchQuery.length > 0 }
  );

  const allEvents = searchQuery ? searchResults : featuredItems?.events || [];

  // Update search results when query changes
  useEffect(() => {
    if (searchQuery && searchEvents) {
      setSearchResults(searchEvents);
    }
  }, [searchQuery, searchEvents]);

  // Auto-rotate banner every 2 seconds
  useEffect(() => {
    if (allEvents.length === 0 || showSearch) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allEvents.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [allEvents.length, showSearch]);

  if (allEvents.length === 0 && !showSearch) {
    return null;
  }

  const currentEvent = allEvents[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + allEvents.length) % allEvents.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allEvents.length);
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white py-4 px-4 sticky top-16 z-40 shadow-xl">
      <div className="container">
        {showSearch ? (
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <Input
                placeholder="Search AI events, grants, and resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                autoFocus
              />
            </div>
            <Button
              onClick={() => {
                setShowSearch(false);
                setSearchQuery("");
                setSearchResults([]);
              }}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={goToPrevious}
              className="p-2 hover:bg-white/20 rounded-lg transition"
              title="Previous event"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 min-w-0">
              {isFeaturedLoading ? (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading AI events...</span>
                </div>
              ) : currentEvent ? (
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-sm truncate">
                    {currentEvent.title}
                  </h3>
                  <p className="text-xs text-white/80 truncate">
                    {currentEvent.location || currentEvent.source}
                    {currentEvent.startDate && (
                      <>
                        {" • "}
                        {new Date(currentEvent.startDate).toLocaleDateString()}
                      </>
                    )}
                  </p>
                  {currentEvent.url && (
                    <a
                      href={currentEvent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white/90 hover:text-white underline"
                    >
                      Learn more →
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-sm text-white/80">No events available</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {allEvents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition ${
                      index === currentIndex ? "bg-white" : "bg-white/40"
                    }`}
                    title={`Go to item ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-2 hover:bg-white/20 rounded-lg transition"
                title="Next event"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <Button
                onClick={() => setShowSearch(true)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {searchQuery && searchResults.length > 0 && (
          <div className="mt-3 max-h-64 overflow-y-auto bg-white/10 rounded-lg p-3">
            <div className="text-xs font-semibold mb-2">
              Found {searchResults.length} results
            </div>
            <div className="space-y-2">
              {searchResults.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 bg-white/10 hover:bg-white/20 rounded transition text-sm"
                >
                  <div className="font-medium truncate">{item.title}</div>
                  <div className="text-xs text-white/70 truncate">
                    {item.source}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
