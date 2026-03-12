import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  category: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  keywords: string[];
}

interface BlogSidebarProps {
  posts: BlogPost[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  onPostSelect?: (post: BlogPost) => void;
}

export default function BlogSidebar({
  posts,
  selectedCategory,
  onCategorySelect,
  onPostSelect,
}: BlogSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set([selectedCategory || ''])
  );

  // Group posts by category
  const categories = Array.from(new Set(posts.map((p) => p.category))).sort();

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getCategoryPostCount = (category: string) => {
    return posts.filter((p) => p.category === category).length;
  };

  const getCategoryPosts = (category: string) => {
    return posts.filter((p) => p.category === category);
  };

  return (
    <aside className="w-64 bg-black border-r border-border h-screen overflow-y-auto sticky top-0 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border flex-shrink-0">
        <p className="text-xs text-white">
          {posts.length} articles
        </p>
      </div>

      {/* Categories */}
      <nav className="p-4 flex-1 overflow-y-auto bg-black">
        {/* All Posts Button */}
        <Button
          variant={selectedCategory === null ? 'default' : 'ghost'}
          className="w-full justify-start mb-4 text-sm text-white bg-gray-900 hover:bg-gray-800"
          onClick={() => {
            onCategorySelect(null);
            setExpandedCategories(new Set());
          }}
        >
          <span className="flex-1 text-left">All Posts</span>
          <span className="text-xs bg-primary text-white px-2 py-1 rounded">
            {posts.length}
          </span>
        </Button>

        <div className="space-y-1">
          {categories.map((category) => {
            const isExpanded = expandedCategories.has(category);
            const postCount = getCategoryPostCount(category);
            const categoryPosts = getCategoryPosts(category);

            return (
              <div key={category}>
                {/* Category Header */}
                <button
                  onClick={() => {
                    toggleCategory(category);
                    onCategorySelect(category);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="flex-1 text-left">{category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-primary text-white px-2 py-0.5 rounded">
                      {postCount}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Category Posts */}
                {isExpanded && (
                  <div className="ml-2 mt-1 space-y-0.5 border-l-2 border-border pl-3">
                    {categoryPosts.map((post) => (
                      <button
                        key={post.id}
                        onClick={() => onPostSelect?.(post)}
                        className="w-full text-left px-2 py-1.5 rounded text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors group"
                        title={post.title}
                      >
                        <div className="truncate font-medium text-white group-hover:text-primary">
                          {post.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {post.readTime} min read
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-gray-900 flex-shrink-0">
        <div className="text-xs text-gray-400 space-y-1">
          <p>
            <span className="font-semibold text-white">{categories.length}</span> Categories
          </p>
          <p>
            <span className="font-semibold text-white">{posts.length}</span> Total Articles
          </p>
          <p className="text-xs">
            Updated daily with new content
          </p>
        </div>
      </div>
    </aside>
  );
}
