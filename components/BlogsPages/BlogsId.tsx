import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/data/blogs";

interface BlogPageProps {
  params: {
    id: string;
  };
}

export default function BlogsId({ params }: BlogPageProps) {
  const post = blogs.find((b) => b.id === params.id);

  if (!post) {
    return (
      <div className="max-w-6xl mx-auto py-24 px-4">
        <p className="text-gray-600">Post not found.</p>
        <Link className="text-orange-600 underline" href="/blogs">
          ← Back to blogs
        </Link>
      </div>
    );
  }

  const recent = blogs.slice(0, 3);

  return (
    <div className="bg-white">
      {/* Main layout */}
      <div className="max-w-6xl mx-auto px-4 md:px-0 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 md:py-24 py-12">
        {/* Main content */}
        <article className="space-y-6">
          <div className="relative w-full h-72 md:h-96 rounded-md overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <h2 className="text-xl md:text-2xl font-semibold">{post.title}</h2>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>👤 {post.author}</span>
            <span>•</span>
            <span>📅 {post.date}</span>
            <span>•</span>
            <span>⏱ {post.readTime}</span>
            <span>•</span>
            <span>💬 {post.commentsCount} Comments</span>
          </div>

          <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-[15px]">
            {post.content.map((block, i) =>
              typeof block === "string" ? (
                <p key={i}>{block}</p>
              ) : block.type === "quote" ? (
                <blockquote
                  key={i}
                  className="border-l-4 border-orange-500 pl-4 italic text-gray-700"
                >
                  {block.text}
                </blockquote>
              ) : null
            )}
          </div>

          {/* Tags + Share */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-full border border-gray-300"
                >
                  #{t}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-3">
              <span>Share:</span>
              <a href="#" className="hover:text-orange-600">
                Twitter
              </a>
              <a href="#" className="hover:text-orange-600">
                Facebook
              </a>
              <a href="#" className="hover:text-orange-600">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Comments */}
          <section>
            <h3 className="font-semibold mb-4">
              {post.comments.length} Comments
            </h3>
            <div className="space-y-6">
              {post.comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={c.avatar}
                      alt={c.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="border-b border-gray-200 pb-4 w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{c.name}</p>
                      <span className="text-xs text-gray-500">{c.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{c.text}</p>
                    <button className="text-xs text-orange-600 mt-2">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Recent posts */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h4 className="font-bold text-gray-900 text-lg">Recent Posts</h4>
            </div>
            <div className="space-y-4">
              {recent.map((r) => (
                <Link
                  key={r.id}
                  href={`/blogs/${r.id}`}
                  className="flex gap-4 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group"
                >
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 shadow-sm">
                    <Image
                      src={r.cover}
                      alt={r.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors text-sm leading-snug mb-1">
                      {r.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>📅 {r.date}</span>
                      <span>•</span>
                      <span>⏱ {r.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories - Updated Design */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-gray-900 text-xl">Categories</h4>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm">📁</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {post.categories.map((category) => (
                <Link
                  key={category}
                  href="#"
                  className="bg-gradient-to-br from-white to-white/10 hover:from-orange-600 hover:to-orange-700 text-black rounded-xl p-4 text-center transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl group"
                >
                  <div className="font-semibold text-sm group-hover:text-white transition-colors">
                    {category}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tags - Updated Design */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h4 className="font-bold text-gray-900 text-lg">Popular Tags</h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href="#"
                  className="inline-flex items-center px-4 py-2 bg-white hover:bg-orange-50 border border-gray-200 hover:border-gray-300 rounded-full text-sm text-gray-700 hover:text-orange-500 transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                  <span className="mr-1">#</span>
                  {tag}
                  <span className="ml-2 w-1.5 h-1.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
