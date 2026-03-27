"use client";

import { useState, useEffect, useCallback } from "react";
import GlassCard from "@/components/GlassCard";

interface Post {
  id: string;
  title: string;
  body: string;
  category: string;
  upvotes: number;
  createdAt: string;
  user: { name: string | null; email: string };
  _count: { comments: number };
}

const categories = [
  "All",
  "General",
  "Showcase",
  "Feedback",
  "Tutorials",
  "Collab Wanted",
];

function AvatarInitials({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const initials = name
    .split(/[\s@]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
  const dim = size === "md" ? "w-9 h-9 text-sm" : "w-7 h-7 text-[10px]";
  return (
    <div className={`${dim} rounded-full bg-primary/20 text-primary flex items-center justify-center font-studio tracking-wider shrink-0`}>
      {initials}
    </div>
  );
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("recent");
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  const [creating, setCreating] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  const fetchPosts = useCallback(() => {
    setLoading(true);
    fetch(`/api/community/posts?category=${category}&sort=${sort}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category, sort]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = async () => {
    if (!newTitle || !newBody) return;
    setCreating(true);
    try {
      await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, body: newBody, category: newCategory }),
      });
      setNewTitle("");
      setNewBody("");
      setShowCreate(false);
      fetchPosts();
    } catch {
      // handle error
    } finally {
      setCreating(false);
    }
  };

  const upvote = async (postId: string) => {
    try {
      const res = await fetch(`/api/community/posts/${postId}/upvote`, {
        method: "POST",
      });
      const data = await res.json();
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, upvotes: data.upvotes } : p))
      );
    } catch {
      // handle error
    }
  };

  const openPost = async (post: Post) => {
    setSelectedPost(post);
    try {
      const res = await fetch(`/api/community/posts/${post.id}/comments`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch {
      setComments([]);
    }
  };

  const addComment = async () => {
    if (!newComment || !selectedPost) return;
    try {
      await fetch(`/api/community/posts/${selectedPost.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: newComment }),
      });
      setNewComment("");
      const res = await fetch(`/api/community/posts/${selectedPost.id}/comments`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch {
      // handle error
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-headline text-4xl text-on-surface tracking-[0.05em] uppercase">
            COMMUNITY
          </h1>
          <p className="font-body text-sm text-muted-text mt-1">
            Connect with AI filmmakers
          </p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="bg-primary text-on-surface px-5 py-2.5 font-studio text-xs tracking-widest uppercase hover:bg-primary-hover transition-colors duration-150 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Post
        </button>
      </div>

      {/* Create Post Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-[10000] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border-custom/50 w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline text-xl text-on-surface tracking-[0.05em] uppercase">
                CREATE POST
              </h3>
              <button onClick={() => setShowCreate(false)} className="text-muted-text hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Post title..."
                className="w-full bg-deep-surface text-on-surface font-body text-sm px-3 py-2.5 border border-border-custom/30 focus:border-primary/50 focus:outline-none"
              />
              <textarea
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                placeholder="Share your thoughts..."
                rows={5}
                className="w-full bg-deep-surface text-on-surface font-body text-sm px-3 py-2.5 border border-border-custom/30 focus:border-primary/50 focus:outline-none resize-none"
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-deep-surface text-on-surface font-body text-sm px-3 py-2.5 border border-border-custom/30 focus:border-primary/50 focus:outline-none"
              >
                {categories
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCreate(false)}
                  className="flex-1 border border-border-custom text-muted-text py-2.5 font-studio text-xs tracking-widest uppercase hover:text-on-surface transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createPost}
                  disabled={creating || !newTitle || !newBody}
                  className="flex-1 bg-primary text-on-surface py-2.5 font-studio text-xs tracking-widest uppercase hover:bg-primary-hover transition-colors disabled:opacity-50"
                >
                  {creating ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`font-studio text-xs tracking-widest uppercase px-3 py-1.5 transition-colors duration-150 ${
                category === c
                  ? "bg-primary text-on-surface"
                  : "text-muted-text hover:text-on-surface"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-deep-surface text-muted-text font-studio text-xs px-3 py-1.5 border border-border-custom/20 focus:outline-none"
        >
          <option value="recent">Latest</option>
          <option value="popular">Most Upvoted</option>
        </select>
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[10000] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border-custom/50 w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-3">
                <AvatarInitials name={selectedPost.user.name || selectedPost.user.email} size="md" />
                <div>
                  <span className="font-studio text-xs text-primary tracking-widest uppercase">
                    {selectedPost.category}
                  </span>
                  <h2 className="font-headline text-2xl text-on-surface tracking-[0.05em] uppercase mt-1">
                    {selectedPost.title}
                  </h2>
                  <p className="font-body text-xs text-muted-text mt-1">
                    by {selectedPost.user.name || selectedPost.user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-muted-text hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="font-body text-sm text-on-surface mb-6 leading-relaxed whitespace-pre-wrap">
              {selectedPost.body}
            </p>

            <div className="border-t border-border-custom/20 pt-4">
              <h3 className="font-studio text-xs text-muted-text tracking-widest uppercase mb-4">
                Comments ({comments.length})
              </h3>
              <div className="space-y-3 mb-4">
                {comments.map((c: any) => (
                  <div
                    key={c.id}
                    className="bg-deep-surface p-3 border border-border-custom/15 flex gap-3"
                  >
                    <AvatarInitials name={c.user?.name || c.user?.email || "?"} />
                    <div>
                      <p className="font-body text-sm text-on-surface">
                        {c.body}
                      </p>
                      <p className="font-studio text-xs text-muted-text mt-1">
                        {c.user?.name || c.user?.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addComment()}
                  placeholder="Add a comment..."
                  className="flex-1 bg-deep-surface text-on-surface font-body text-sm px-3 py-2 border border-border-custom/30 focus:border-primary/50 focus:outline-none"
                />
                <button
                  onClick={addComment}
                  disabled={!newComment}
                  className="bg-primary text-on-surface px-4 py-2 font-studio text-xs tracking-widest uppercase hover:bg-primary-hover transition-colors duration-150 disabled:opacity-50"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 skeleton-shimmer border border-border-custom/20" />
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-3">
          {posts.map((post) => (
            <GlassCard
              key={post.id}
              className="p-5 cursor-pointer"
              hover
              onClick={() => openPost(post)}
            >
              <div className="flex items-start gap-4">
                {/* Upvote */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    upvote(post.id);
                  }}
                  className="flex flex-col items-center gap-0.5 text-muted-text hover:text-primary transition-colors duration-150 shrink-0"
                >
                  <span className="material-symbols-outlined text-sm">
                    expand_less
                  </span>
                  <span className="font-studio text-xs">{post.upvotes}</span>
                </button>

                {/* Avatar */}
                <AvatarInitials name={post.user.name || post.user.email} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-studio text-xs text-primary tracking-widest uppercase">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-headline text-lg text-on-surface tracking-[0.05em] uppercase">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-muted-text line-clamp-2 mt-1">
                    {post.body}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-studio text-xs text-muted-text/60">
                      {post.user.name || post.user.email}
                    </span>
                    <span className="font-studio text-xs text-muted-text/40 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">
                        chat_bubble
                      </span>
                      {post._count.comments}
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-5xl text-muted-text/30 block mb-4">
            forum
          </span>
          <p className="font-body text-muted-text">
            No posts yet. Be the first to start a discussion!
          </p>
        </div>
      )}
    </div>
  );
}
