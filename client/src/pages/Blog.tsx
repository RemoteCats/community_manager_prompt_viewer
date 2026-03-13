import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { Search, ArrowRight, Calendar, Clock, Tag, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BlogSidebar from '@/components/BlogSidebar';

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

export default function Blog() {
  const [, setLocation] = useLocation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load blog posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        console.log('Loading blog posts from /blog_posts_1000.json');
        const response = await fetch('/blog_posts_1000.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Blog posts loaded:', data.length, 'posts');
        
        if (!Array.isArray(data)) {
          throw new Error('Blog posts data is not an array');
        }
        
        setPosts(data);
        setError(null);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error loading blog posts:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPost(null);
      }
    };
    
    if (selectedPost) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [selectedPost]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    let filtered = posts.filter((post) => {
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === null || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return filtered.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [posts, searchQuery, selectedCategory]);

  // Get featured posts
  const featuredPosts = useMemo(() => {
    return posts
      .filter((p) => p.featured)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3);
  }, [posts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-96">
          <p className="text-white">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-400 font-semibold mb-2">Error loading blog posts</p>
            <p className="text-white text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Logo */}
      <div className="bg-black border-b border-border">
        <div className="container py-8">
          <div className="flex items-center gap-4 mb-6">
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
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            AI Community Management Blog
          </h1>
          <p className="text-lg text-white max-w-2xl">
            {posts.length}+ articles on community management, engagement strategies,
            and best practices for all platforms.
          </p>
          
          <div className="flex gap-2 border-t border-border pt-4 mt-6 -mx-8 px-8">
            <a href="/" className="px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 rounded transition">
              Prompts
            </a>
            <a href="/blog" className="px-4 py-2 text-sm font-medium text-purple-600 hover:bg-gray-800 rounded transition border-b-2 border-purple-600">
              Blog
            </a>
            <a href="/pricing" className="px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 rounded transition">
              Pricing
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <BlogSidebar
          posts={posts}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onPostSelect={setSelectedPost}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search */}
          <div className="bg-black border-b border-border sticky top-0 z-40">
            <div className="container py-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-white" />
                <Input
                  type="text"
                  placeholder="Search articles by title, topic, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-2 h-10 text-white bg-gray-900 border-border placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="container py-12">
              {/* Featured Posts */}
              {!selectedCategory && !searchQuery && featuredPosts.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-white mb-6">Featured Articles</h2>
                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {featuredPosts.map((post) => (
                      <Card
                        key={post.id}
                        className="p-6 border border-border bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer group"
                        onClick={() => setSelectedPost(post)}
                      >
                        <Badge className="mb-3 bg-primary text-white">Featured</Badge>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-300">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime} min
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-white">
                  Showing <span className="font-semibold">{filteredPosts.length}</span> of{' '}
                  <span className="font-semibold">{posts.length}</span> articles
                  {selectedCategory && ` in ${selectedCategory}`}
                </p>
              </div>

              {/* Blog Posts Grid */}
              {filteredPosts.length === 0 ? (
                <Card className="p-12 text-center border border-border bg-gray-900">
                  <p className="text-lg font-semibold text-white mb-2">No articles found</p>
                  <p className="text-white">
                    Try adjusting your search or browse by category
                  </p>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {filteredPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="p-6 border border-border bg-gray-900 hover:shadow-md transition-shadow cursor-pointer group"
                      onClick={() => setSelectedPost(post)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex gap-2 mb-3">
                            <Badge variant="secondary" className="bg-gray-800 text-white">{post.category}</Badge>
                            {post.featured && <Badge className="bg-primary text-white">Featured</Badge>}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-300 mb-4">{post.excerpt}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.keywords.slice(0, 3).map((keyword) => (
                              <Badge key={keyword} variant="outline" className="text-xs text-white border-gray-600">
                                <Tag className="w-3 h-3 mr-1" />
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {post.readTime} min read
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </div>
                            <div>By {post.author}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="flex-shrink-0 text-white hover:text-primary">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Post Detail Modal - Fixed */}
      {selectedPost && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            className="w-full max-w-2xl max-h-[85vh] bg-black rounded-lg border border-border overflow-hidden flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Large and Visible */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 bg-primary hover:bg-primary/90 text-white rounded-full p-2 z-50 transition-all"
              aria-label="Close"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-8">
              <Badge className="mb-3 bg-primary text-white">{selectedPost.category}</Badge>
              <h2 className="text-3xl font-bold text-white mb-4 pr-12">{selectedPost.title}</h2>

              <div className="flex items-center gap-6 text-sm text-gray-300 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedPost.readTime} min read
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedPost.publishedAt).toLocaleDateString()}
                </div>
                <div>By {selectedPost.author}</div>
              </div>

              <div className="space-y-4 text-white">
                {selectedPost.content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h1 key={i} className="text-2xl font-bold mt-4 mb-2 text-white">
                        {paragraph.replace('# ', '')}
                      </h1>
                    );
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={i} className="text-xl font-bold mt-3 mb-2 text-white">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={i} className="text-lg font-bold mt-2 mb-1 text-white">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={i} className="list-disc list-inside space-y-1">
                        {paragraph.split('\n').map((item, j) => (
                          <li key={j} className="text-sm text-gray-300">
                            {item.replace('- ', '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={i} className="text-sm leading-relaxed text-gray-300">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {selectedPost.keywords.map((keyword) => (
                    <Badge key={keyword} variant="outline" className="text-white border-gray-600">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-black text-white py-4 text-center text-sm border-t border-border">
        Made by <span className="font-semibold">Spark Collective</span> ✨
      </div>
    </div>
  );
}
