// "use client";

// import { useBlog, useBlogs } from "@/lib/queries/blogs";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// export default function BlogsId() {
//   const { id } = useParams();

//   const { data, isLoading, isError } = useBlog(id as string);
//   const { data: recentData } = useBlogs(1, 3, "", undefined);
//   const recent = recentData?.blogs ?? [];

//   if (isLoading)
//     return (
//       <div className="min-h-screen flex items-center justify-center py-20">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-500">Loading blog post...</p>
//         </div>
//       </div>
//     );

//   if (isError || !data?.blog)
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4">
//         <div className="text-center max-w-md">
//           <div className="text-6xl mb-4">😕</div>
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             Post Not Found
//           </h1>
//           <p className="text-gray-600 mb-6">
//             The blog post you&apos;re looking for doesn&apos;t exist or may have
//             been moved.
//           </p>
//           <Link
//             className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
//             href="/blogs"
//           >
//             <span>←</span>
//             Back to all blogs
//           </Link>
//         </div>
//       </div>
//     );

//   type PostType = typeof data.blog & { tags?: string[] };
//   const post = data.blog as PostType;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Back Navigation */}
//       <div className="border-b border-gray-200 bg-white">
//         <div className="max-w-6xl mx-auto px-4 py-4">
//           <Link
//             className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
//             href="/blogs"
//           >
//             <span>←</span>
//             Back to blogs
//           </Link>
//         </div>
//       </div>

//       {/* Main layout */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
//           {/* Main content */}
//           <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//             {/* Cover Image */}
//             <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[480px]">
//               <Image
//                 src={post.imageUrl}
//                 alt={post.title}
//                 fill
//                 className="object-cover"
//                 priority
//               />
//             </div>

//             {/* Content Container */}
//             <div className="p-6 sm:p-8 lg:p-10">
//               {/* Title */}
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
//                 {post.title}
//               </h1>

//               {/* Blog Meta */}
//               <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-100">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
//                     {post.author?.charAt(0) || "U"}
//                   </div>
//                   <span className="font-medium">{post.author}</span>
//                 </div>
//                 <div className="w-px h-4 bg-gray-300"></div>
//                 <div className="flex items-center gap-1">
//                   <span>📅</span>
//                   <span>
//                     {post.createdAt
//                       ? new Date(post.createdAt).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         })
//                       : "Unknown date"}
//                   </span>
//                 </div>
//                 <div className="w-px h-4 bg-gray-300"></div>
//                 <div className="flex items-center gap-1">
//                   <span>⏱</span>
//                   <span>{post.readTime}</span>
//                 </div>
//                 <div className="w-px h-4 bg-gray-300"></div>
//                 <div className="flex items-center gap-1">
//                   <span>💬</span>
//                   <span>0 Comments</span>
//                 </div>
//               </div>

//               {/* Blog Content */}
//               <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
//                 {Array.isArray(post.content) ? (
//                   post.content.map((block, idx) => (
//                     <p
//                       key={idx}
//                       className="mb-6 last:mb-0 text-base sm:text-lg leading-8"
//                     >
//                       {block}
//                     </p>
//                   ))
//                 ) : (
//                   <p className="mb-6 text-base sm:text-lg leading-8">
//                     {post.content}
//                   </p>
//                 )}
//               </div>

//               {/* Tags + Share */}
//               <div className="mt-10 pt-8 border-t border-gray-100">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                   {/* Tags */}
//                   <div className="flex flex-wrap gap-2">
//                     {(post.tags ?? []).map((t: string) => (
//                       <span
//                         key={t}
//                         className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
//                       >
//                         #{t}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Share */}
//                   <div className="flex items-center gap-4">
//                     <span className="text-sm text-gray-600 font-medium">
//                       Share this post:
//                     </span>
//                     <div className="flex items-center gap-3">
//                       {[
//                         {
//                           name: "Twitter",
//                           icon: "🐦",
//                           color: "hover:text-blue-400",
//                         },
//                         {
//                           name: "Facebook",
//                           icon: "👤",
//                           color: "hover:text-blue-600",
//                         },
//                         {
//                           name: "LinkedIn",
//                           icon: "💼",
//                           color: "hover:text-blue-700",
//                         },
//                       ].map((social) => (
//                         <button
//                           key={social.name}
//                           className={`text-gray-500 ${social.color} transition-colors text-lg`}
//                           aria-label={`Share on ${social.name}`}
//                         >
//                           {social.icon}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Comments Section */}
//               <section className="mt-12 pt-8 border-t border-gray-100">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6">
//                   Comments (0)
//                 </h3>
//                 <div className="text-center py-12 bg-gray-50 rounded-2xl">
//                   <div className="text-4xl mb-4">💬</div>
//                   <p className="text-gray-600 mb-4">No comments yet</p>
//                   <p className="text-sm text-gray-500">
//                     Be the first to share your thoughts!
//                   </p>
//                 </div>
//               </section>
//             </div>
//           </article>

//           {/* Sidebar */}
//           <aside className="space-y-6 lg:space-y-8">
//             {/* Recent Posts */}
//             <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 shadow-sm">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
//                 <h4 className="font-bold text-gray-900 text-xl">
//                   Recent Posts
//                 </h4>
//               </div>

//               <div className="space-y-4">
//                 {recent.map((r) => (
//                   <Link
//                     key={r.id}
//                     href={`/blogs/${r.id}`}
//                     className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-orange-200"
//                   >
//                     <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
//                       <Image
//                         src={r.imageUrl}
//                         alt={r.title}
//                         fill
//                         className="object-cover group-hover:scale-110 transition-transform duration-300"
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors text-sm leading-snug mb-2">
//                         {r.title}
//                       </p>
//                       <div className="flex items-center gap-2 text-xs text-gray-500">
//                         <span>
//                           {r.createdAt
//                             ? new Date(r.createdAt).toLocaleDateString()
//                             : ""}
//                         </span>
//                         <span>•</span>
//                         <span>{r.readTime}</span>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
//               <div className="flex items-center justify-between mb-6">
//                 <h4 className="font-bold text-gray-900 text-xl">Category</h4>
//                 <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
//                   <span className="text-gray-600 text-lg">📁</span>
//                 </div>
//               </div>

//               <div className="grid gap-3">
//                 <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-xl cursor-pointer">
//                   <div className="font-bold text-lg">
//                     {post.tags?.[0] || post.category || "Uncategorized"}
//                   </div>
//                   <p className="text-orange-100 text-sm mt-2">
//                     Explore more in this category
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Tags */}
//             <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 shadow-sm">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
//                 <h4 className="font-bold text-gray-900 text-xl">
//                   Popular Tags
//                 </h4>
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 {(post.tags ?? []).map((tag: string) => (
//                   <Link
//                     key={tag}
//                     href="#"
//                     className="inline-flex items-center px-4 py-2.5 bg-white hover:bg-orange-500 border border-gray-200 hover:border-orange-500 rounded-xl text-sm text-gray-700 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md group"
//                   >
//                     <span className="mr-1.5">#</span>
//                     {tag}
//                     <span className="ml-2 w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useBlog, useBlogs } from "@/lib/queries/blogs";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// export default function BlogsId() {
//   const { id } = useParams();

//   const { data, isLoading, isError } = useBlog(id as string);
//   const { data: recentData } = useBlogs(1, 4, "", undefined);
//   const recent = recentData?.blogs ?? [];

//   if (isLoading)
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-3 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading article...</p>
//         </div>
//       </div>
//     );

//   if (isError || !data?.blog)
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-serif text-gray-900 mb-4">
//             Article Not Found
//           </h1>
//           <Link
//             href="/blogs"
//             className="text-blue-600 hover:text-blue-800 font-serif"
//           >
//             ← Return to Articles
//           </Link>
//         </div>
//       </div>
//     );

//   type PostType = typeof data.blog & { tags?: string[] };
//   const post = data.blog as PostType;

//   return (
//     <div className="min-h-screen bg-white overflow-x-hidden">
//       {" "}
//       {/* FIX 1 */}
//       {/* Header */}
//       <header className="border-b-2 border-gray-900 py-6">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <Link
//             href="/blogs"
//             className="text-sm text-gray-600 hover:text-gray-900 mb-2 block"
//           >
//             ← BACK TO ARTICLES
//           </Link>
//           <div className="w-20 h-1 bg-gray-900 mx-auto mb-4"></div>
//           <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight mx-auto max-w-2xl">
//             {post.title}
//           </h1>
//         </div>
//       </header>
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
//           {/* SIDEBAR FIRST ON MOBILE */}
//           <aside className="space-y-8 order-last md:order-last md:col-span-1">
//             <div className="border border-gray-300 p-6">
//               <h3 className="font-serif font-bold text-gray-900 text-lg mb-4 border-b pb-2">
//                 MORE STORIES
//               </h3>
//               <div className="space-y-6">
//                 {recent.map((r) => (
//                   <Link
//                     key={r.id}
//                     href={`/blogs/${r.id}`}
//                     className="block group"
//                   >
//                     <p className="font-serif text-gray-900 group-hover:text-blue-800 leading-tight text-sm mb-2">
//                       {r.title}
//                     </p>
//                     <div className="text-xs text-gray-600 flex items-center gap-2">
//                       <span>{r.readTime}</span>
//                       <span>•</span>
//                       <span>
//                         {r.createdAt ? new Date(r.createdAt).getFullYear() : ""}
//                       </span>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-gray-100 p-6 border border-gray-300">
//               <h3 className="font-serif font-bold text-gray-900 text-lg mb-4">
//                 NEWSLETTER
//               </h3>
//               <p className="text-sm text-gray-700 mb-4">
//                 Stay updated with our latest stories
//               </p>
//               <input
//                 type="email"
//                 placeholder="Your email"
//                 className="w-full px-3 py-2 text-sm border border-gray-300 mb-2"
//               />
//               <button className="w-full bg-gray-900 text-white py-2 text-sm font-semibold hover:bg-gray-800">
//                 SUBSCRIBE
//               </button>
//             </div>
//           </aside>

//           {/* MAIN CONTENT */}
//           <article className="md:col-span-3">
//             {/* Meta */}
//             <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 mb-8 border-b pb-4">
//               <div className="flex flex-wrap gap-3 items-center">
//                 <span className="font-semibold">
//                   BY {post.author?.toUpperCase()}
//                 </span>
//                 <span>•</span>
//                 <span>
//                   {post.createdAt
//                     ? new Date(post.createdAt).toLocaleDateString("en-US", {
//                         month: "long",
//                         day: "numeric",
//                         year: "numeric",
//                       })
//                     : ""}
//                 </span>
//               </div>
//               <span>{post.readTime}</span>
//             </div>

//             {/* Featured image */}
//             <div className="mb-8 border border-gray-300">
//               <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
//                 {" "}
//                 {/* FIX 2 */}
//                 <Image
//                   src={post.imageUrl}
//                   alt={post.title}
//                   fill
//                   className="object-cover"
//                   priority
//                 />
//               </div>
//               <div className="p-4 text-sm text-gray-600 border-t border-gray-300">
//                 Featured image for {post.title}
//               </div>
//             </div>

//             {/* Content (column layout only on large screens) */}
//             <div className="columns-1 lg:columns-2 gap-6 space-y-6">
//               {" "}
//               {/* FIX 3 */}
//               {Array.isArray(post.content) ? (
//                 post.content.map((block: string, idx: number) => (
//                   <p
//                     key={idx}
//                     className="text-gray-700 leading-7 text-justify font-serif text-lg"
//                   >
//                     {block}
//                   </p>
//                 ))
//               ) : (
//                 <p className="text-gray-700 leading-7 text-justify font-serif text-lg">
//                   {post.content}
//                 </p>
//               )}
//             </div>

//             {/* Quote */}
//             <div className="my-12 border-l-4 border-gray-900 pl-6">
//               <blockquote className="text-2xl font-serif italic text-gray-900 leading-tight">
//                 &quot;The most important stories are those that change our
//                 perspective on the world around us.&quot;
//               </blockquote>
//             </div>

//             {/* Footer */}
//             <div className="border-t border-gray-300 pt-8 mt-12">
//               <div className="flex flex-wrap gap-3 mb-6">
//                 {(post.tags ?? []).map((tag: string) => (
//                   <span
//                     key={tag}
//                     className="px-3 py-1 bg-gray-100 text-gray-700 text-sm border border-gray-300"
//                   >
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </article>
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useBlog, useBlogs } from "@/lib/queries/blogs";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useState } from "react";

// export default function BlogsId() {
//   const { id } = useParams();
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(24);

//   const { data, isLoading, isError } = useBlog(id as string);
//   const { data: recentData } = useBlogs(1, 6, "", undefined);
//   const recent = recentData?.blogs ?? [];

//   const handleLike = () => {
//     if (isLiked) setLikeCount(likeCount - 1);
//     else setLikeCount(likeCount + 1);
//     setIsLiked(!isLiked);
//   };

//   if (isLoading)
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-3 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading article...</p>
//         </div>
//       </div>
//     );

//   if (isError || !data?.blog)
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-serif text-gray-900 mb-4">
//             Article Not Found
//           </h1>
//           <Link
//             href="/blogs"
//             className="text-blue-600 hover:text-blue-800 font-serif"
//           >
//             ← Return to Articles
//           </Link>
//         </div>
//       </div>
//     );

//   const post = data.blog;

//   return (
//     <div className="min-h-screen bg-white overflow-x-hidden">
//       {/* Header */}
//       <header className="border-b-2 border-gray-900 py-6">
//         <div className="max-w-6xl mx-auto px-4 text-center">
//           <Link
//             href="/blogs"
//             className="text-sm text-gray-600 hover:text-gray-900 mb-2 block"
//           >
//             ← BACK TO ARTICLES
//           </Link>
//           <div className="w-20 h-1 bg-gray-900 mx-auto mb-4"></div>
//           <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight mx-auto max-w-2xl">
//             {post.title}
//           </h1>
//         </div>
//       </header>

//       <div className="max-w-6xl mx-auto px-4 py-8">
//         {/* MAIN CONTENT ONLY (Sidebar Removed) */}
//         <article className="w-full mx-auto">
//           {/* Meta Information */}
//           <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 mb-8 border-b pb-4">
//             <div className="flex flex-wrap gap-3 items-center">
//               <span className="font-semibold">
//                 BY {post.author?.toUpperCase()}
//               </span>
//               <span>•</span>
//               <span>
//                 {post.createdAt
//                   ? new Date(post.createdAt).toLocaleDateString("en-US", {
//                       month: "long",
//                       day: "numeric",
//                       year: "numeric",
//                     })
//                   : ""}
//               </span>
//               <span>•</span>
//               <span>{post.readTime} READ</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
//                 LIVE
//               </span>
//               <span className="text-gray-500">Updated recently</span>
//             </div>
//           </div>

//           {/* Featured Image */}
//           <div className="mb-8 border border-gray-300 bg-white">
//             <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
//               <Image
//                 src={post.imageUrl}
//                 alt={post.title}
//                 fill
//                 className="object-cover"
//                 priority
//               />
//             </div>
//             <div className="p-4 text-sm text-gray-600 border-t border-gray-300 flex justify-between items-center">
//               <span>Featured image for {post.title}</span>
//               <span className="text-xs text-gray-500">
//                 Photo: Editorial Team
//               </span>
//             </div>
//           </div>

//           {/* Like Button (Comments + Share Removed) */}
//           <div className="flex items-center justify-start mb-8 p-4 bg-gray-50 border border-gray-200">
//             <button
//               onClick={handleLike}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
//                 isLiked
//                   ? "bg-red-50 text-red-600 border border-red-200"
//                   : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
//               }`}
//             >
//               <span
//                 className={`text-lg ${
//                   isLiked ? "text-red-500" : "text-gray-500"
//                 }`}
//               >
//                 {isLiked ? "❤️" : "🤍"}
//               </span>
//               <span
//                 className={`font-semibold ${
//                   isLiked ? "text-red-600" : "text-gray-600"
//                 }`}
//               >
//                 {likeCount}
//               </span>
//             </button>
//           </div>

//           {/* Article Summary */}
//           <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
//             <h3 className="font-serif font-bold text-gray-900 text-lg mb-3">
//               ARTICLE SUMMARY
//             </h3>
//             <p className="text-gray-700 leading-6">
//               This comprehensive exploration delves into the key aspects of
//               modern content creation, offering insights and practical advice
//               for writers and creators looking to make an impact in today's
//               digital landscape.
//             </p>
//           </div>

//           {/* Content */}
//           <div className="space-y-6">
//             {Array.isArray(post.content) ? (
//               post.content.map((block: string, idx: number) => (
//                 <p
//                   key={idx}
//                   className="text-gray-700 leading-7 text-justify font-serif text-lg"
//                 >
//                   {block}
//                 </p>
//               ))
//             ) : (
//               <p className="text-gray-700 leading-7 text-justify font-serif text-lg">
//                 {post.content}
//               </p>
//             )}
//           </div>

//           {/* Tags */}
//           <div className="border-t border-gray-300 pt-8 mt-12">
//             <div className="flex flex-wrap gap-3 mb-6">
//               <span className="font-semibold text-gray-900">Tags:</span>
//               {(post.tags ?? []).map((tag: string) => (
//                 <span
//                   key={tag}
//                   className="px-3 py-1 bg-gray-100 text-gray-700 text-sm border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors"
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Related Articles - untouched */}
//           <div className="mt-16 border-t border-gray-300 pt-12">
//             <h3 className="font-serif font-bold text-gray-900 text-2xl mb-8 text-center">
//               RELATED ARTICLES YOU MIGHT ENJOY
//             </h3>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recent.slice(0, 3).map((r) => (
//                 <Link
//                   key={r.id}
//                   href={`/blogs/${r.id}`}
//                   className="group border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-lg"
//                 >
//                   <div className="relative h-48 overflow-hidden">
//                     <Image
//                       src={r.imageUrl}
//                       alt={r.title}
//                       fill
//                       className="object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <h4 className="font-serif font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-800 transition-colors">
//                       {r.title}
//                     </h4>
//                     <div className="flex items-center justify-between text-xs text-gray-600">
//                       <span>{r.readTime}</span>
//                       <span>
//                         {r.createdAt ? new Date(r.createdAt).getFullYear() : ""}
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Explore More */}
//           <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 border border-blue-200">
//             <h3 className="font-serif font-bold text-gray-900 text-2xl mb-4 text-center">
//               READY TO EXPLORE MORE?
//             </h3>
//             <p className="text-gray-700 text-center mb-6 max-w-2xl mx-auto">
//               Dive deeper into our collection of articles and discover more
//               insights that matter to you.
//             </p>
//             <div className="text-center">
//               <Link
//                 href="/blogs"
//                 className="inline-block bg-gray-900 text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors"
//               >
//                 BROWSE ALL ARTICLES
//               </Link>
//             </div>
//           </div>
//         </article>
//       </div>
//     </div>
//   );
// }
"use client";

import { useBlog, useBlogs } from "@/lib/queries/blogs";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function BlogsId() {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);

  const { data, isLoading, isError } = useBlog(id as string);
  const { data: recentData } = useBlogs(1, 6, "", undefined);
  const recent = recentData?.blogs ?? [];

  const handleLike = () => {
    if (isLiked) setLikeCount(likeCount - 1);
    else setLikeCount(likeCount + 1);
    setIsLiked(!isLiked);
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );

  if (isError || !data?.blog)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-gray-900 mb-4">
            Article Not Found
          </h1>
          <Link
            href="/blogs"
            className="text-blue-600 hover:text-blue-800 font-serif"
          >
            ← Return to Articles
          </Link>
        </div>
      </div>
    );

  type PostType = typeof data.blog & { tags?: string[] };
  const post = data.blog as PostType;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="border-b-2 border-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link
            href="/blogs"
            className="text-sm text-gray-600 hover:text-gray-900 mb-2 block"
          >
            ← BACK TO ARTICLES
          </Link>
          <div className="w-20 h-1 bg-gray-900 mx-auto mb-4"></div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight mx-auto max-w-2xl">
            {post.title}
          </h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* MAIN CONTENT */}
          <article className="lg:col-span-3">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 mb-8 border-b pb-4">
              <div className="flex flex-wrap gap-3 items-center">
                <span className="font-semibold">
                  BY {post.author?.toUpperCase()}
                </span>
                <span>•</span>
                <span>
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : ""}
                </span>
                <span>•</span>
                <span>{post.readTime} READ</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  LIVE
                </span>
                <span className="text-gray-500">Updated recently</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8 border border-gray-300 bg-white">
              <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-4 text-sm text-gray-600 border-t border-gray-300 flex justify-between items-center">
                <span>Featured image for {post.title}</span>
                <span className="text-xs text-gray-500">
                  Photo: Editorial Team
                </span>
              </div>
            </div>

            {/* LIKE ONLY (Share + Comment Removed) */}
            <div className="flex items-center justify-start mb-8 p-4 bg-gray-50 border border-gray-200">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isLiked
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`text-lg ${
                    isLiked ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {isLiked ? "❤️" : "🤍"}
                </span>
                <span
                  className={`font-semibold ${
                    isLiked ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  {likeCount}
                </span>
              </button>
            </div>

            {/* Article Summary */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 className="font-serif font-bold text-gray-900 text-lg mb-3">
                ARTICLE SUMMARY
              </h3>
              <p className="text-gray-700 leading-6">
                This comprehensive exploration delves into the key aspects of
                modern content creation, offering insights and practical advice
                for writers and creators looking to make an impact in
                today&apos;s digital landscape.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {Array.isArray(post.content) ? (
                post.content.map((block: string, idx: number) => (
                  <p
                    key={idx}
                    className="text-gray-700 leading-7 text-justify font-serif text-lg"
                  >
                    {block}
                  </p>
                ))
              ) : (
                <p className="text-gray-700 leading-7 text-justify font-serif text-lg">
                  {post.content}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="border-t border-gray-300 pt-8 mt-12">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="font-semibold text-gray-900">Tags:</span>
                {(post.tags ?? []).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-16 border-t border-gray-300 pt-12">
              <h3 className="font-serif font-bold text-gray-900 text-2xl mb-8 text-center">
                RELATED ARTICLES YOU MIGHT ENJOY
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recent.slice(0, 3).map((r) => (
                  <Link
                    key={r.id}
                    href={`/blogs/${r.id}`}
                    className="group border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={r.imageUrl}
                        alt={r.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-800 transition-colors">
                        {r.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{r.readTime}</span>
                        <span>
                          {r.createdAt
                            ? new Date(r.createdAt).getFullYear()
                            : ""}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Explore More */}
            <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 border border-blue-200">
              <h3 className="font-serif font-bold text-gray-900 text-2xl mb-4 text-center">
                READY TO EXPLORE MORE?
              </h3>
              <p className="text-gray-700 text-center mb-6 max-w-2xl mx-auto">
                Dive deeper into our collection of articles and discover more
                insights that matter to you.
              </p>
              <div className="text-center">
                <Link
                  href="/blogs"
                  className="inline-block bg-gray-900 text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors"
                >
                  BROWSE ALL ARTICLES
                </Link>
              </div>
            </div>
          </article>

          {/* RIGHT SIDEBAR (ASIDE restored) */}
          <aside className="space-y-8 order-last lg:order-last lg:col-span-1">
            {/* Table of Contents */}
            <div className="border border-gray-300 p-6 bg-white">
              <h3 className="font-serif font-bold text-gray-900 text-lg mb-4 border-b pb-2">
                IN THIS ARTICLE
              </h3>
              <div className="space-y-3">
                {[
                  "Introduction",
                  "Key Insights",
                  "Main Discussion",
                  "Case Studies",
                  "Conclusion",
                  "Future Outlook",
                ].map((item, index) => (
                  <a
                    key={index}
                    href={`#section-${index}`}
                    className="block text-sm text-gray-700 hover:text-blue-800 transition-colors py-1 border-b border-gray-100 last:border-b-0"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Trending Stories */}
            <div className="border border-gray-300 p-6">
              <h3 className="font-serif font-bold text-gray-900 text-lg mb-4 border-b pb-2">
                TRENDING STORIES
              </h3>
              <div className="space-y-6">
                {recent.slice(0, 3).map((r) => (
                  <Link
                    key={r.id}
                    href={`/blogs/${r.id}`}
                    className="block group"
                  >
                    <p className="font-serif text-gray-900 group-hover:text-blue-800 leading-tight text-sm mb-2 line-clamp-2">
                      {r.title}
                    </p>
                    <div className="text-xs text-gray-600 flex items-center gap-2">
                      <span>{r.readTime}</span>
                      <span>•</span>
                      <span>
                        {r.createdAt ? new Date(r.createdAt).getFullYear() : ""}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="border border-gray-300 p-6 bg-white">
              <h3 className="font-serif font-bold text-gray-900 text-lg mb-4 border-b pb-2">
                POPULAR TAGS
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Technology",
                  "Design",
                  "Business",
                  "Innovation",
                  "Startup",
                  "AI",
                  "Future",
                  "Trends",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useBlog, useBlogs } from "@/lib/queries/blogs";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// export default function BlogsId() {
//   const { id } = useParams();

//   const { data, isLoading, isError } = useBlog(id as string);
//   const { data: recentData } = useBlogs(1, 3, "", undefined);
//   const recent = recentData?.blogs ?? [];

//   if (isLoading)
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-light">Loading creative story...</p>
//         </div>
//       </div>
//     );

//   if (isError || !data?.blog)
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">🎨</div>
//           <h1 className="text-2xl font-light text-gray-900 mb-4">
//             Story Not Found
//           </h1>
//           <Link
//             href="/blogs"
//             className="text-black hover:text-gray-700 border-b border-black pb-1"
//           >
//             ← Back to Stories
//           </Link>
//         </div>
//       </div>
//     );

//   type PostType = typeof data.blog & { tags?: string[] };
//   const post = data.blog as PostType;

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Creative Header */}
//       <header className="border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-6 py-8">
//           <div className="flex items-center justify-between">
//             <Link
//               href="/blogs"
//               className="text-black hover:text-gray-600 text-lg font-light"
//             >
//               ← Portfolio
//             </Link>
//             <div className="text-right">
//               <div className="text-sm text-gray-600">{post.author}</div>
//               <div className="text-xs text-gray-500">
//                 {post.createdAt ? new Date(post.createdAt).getFullYear() : ""}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-4xl mx-auto px-6 py-12">
//         {/* Hero Section */}
//         <div className="text-center mb-16">
//           <h1 className="text-5xl lg:text-6xl font-light text-gray-900 leading-tight mb-8">
//             {post.title}
//           </h1>
//           <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
//             A creative exploration of ideas and perspectives that shape our
//             understanding.
//           </p>
//         </div>

//         {/* Full-width Featured Image */}
//         <div className="mb-16 -mx-6">
//           <div className="relative h-96 lg:h-[500px]">
//             <Image
//               src={post.imageUrl}
//               alt={post.title}
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>
//         </div>

//         {/* Content Grid */}
//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             <div className="space-y-8 text-lg leading-8 text-gray-700 font-light">
//               {Array.isArray(post.content) ? (
//                 post.content.map((block, idx) => <p key={idx}>{block}</p>)
//               ) : (
//                 <p>{post.content}</p>
//               )}
//             </div>

//             {/* Creative Break */}
//             <div className="my-16 text-center">
//               <div className="text-6xl mb-4">✨</div>
//               <p className="text-gray-600 italic text-lg">
//                 Every story has the power to change a perspective
//               </p>
//             </div>
//           </div>

//           {/* Sidebar - Creative Details */}
//           <div className="space-y-8">
//             <div className="border-l-2 border-black pl-6">
//               <h3 className="text-sm font-medium text-gray-900 mb-4">
//                 PROJECT DETAILS
//               </h3>
//               <div className="space-y-3 text-sm text-gray-600">
//                 <div>
//                   <div className="font-medium">Author</div>
//                   <div>{post.author}</div>
//                 </div>
//                 <div>
//                   <div className="font-medium">Reading Time</div>
//                   <div>{post.readTime}</div>
//                 </div>
//                 <div>
//                   <div className="font-medium">Published</div>
//                   <div>
//                     {post.createdAt
//                       ? new Date(post.createdAt).toLocaleDateString()
//                       : "Unknown"}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-sm font-medium text-gray-900 mb-4">TAGS</h3>
//               <div className="flex flex-wrap gap-2">
//                 {(post.tags ?? []).map((tag: string) => (
//                   <span
//                     key={tag}
//                     className="px-3 py-1 border border-gray-300 text-gray-700 text-sm hover:border-black transition-colors cursor-pointer"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h3 className="text-sm font-medium text-gray-900 mb-4">SHARE</h3>
//               <div className="flex gap-3">
//                 {["Twitter", "LinkedIn", "Copy Link"].map((platform) => (
//                   <button
//                     key={platform}
//                     className="text-xs border border-gray-300 px-3 py-1 hover:border-black transition-colors"
//                   >
//                     {platform}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Next Project */}
//         <div className="mt-24 border-t border-gray-200 pt-16">
//           <h3 className="text-2xl font-light text-gray-900 mb-8">Next Story</h3>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {recent.map((r) => (
//               <Link key={r.id} href={`/blogs/${r.id}`} className="group">
//                 <div className="aspect-video relative mb-4">
//                   <Image
//                     src={r.imageUrl}
//                     alt={r.title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>
//                 <h4 className="font-light text-gray-900 group-hover:text-black text-lg">
//                   {r.title}
//                 </h4>
//                 <p className="text-sm text-gray-600">{r.readTime}</p>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
