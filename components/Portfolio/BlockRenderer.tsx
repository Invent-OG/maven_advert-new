import React from "react";

export type PortfolioBlock = {
  id: string;
  type: "hero" | "text" | "image_full" | "image_grid" | "gallery" | "spacer" | "stats_grid" | "image_text_split" | "gallery_text_split" | "image_with_text";
  content: any;
};

const resolveImageSrc = (value?: string) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!value) return "/next.svg";
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  if (cloudName) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${value}`;
  }
  return value;
};

export default function BlockRenderer({
  blocks,
}: {
  blocks: PortfolioBlock[];
}) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="w-full flex flex-col">
      {blocks.map((block) => {
        switch (block.type) {
          case "hero":
            return (
              <section
                key={block.id}
                className="relative w-full h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center text-center px-4"
                style={{
                  backgroundImage: `url(${resolveImageSrc(
                    block.content.image
                  )})`,
                }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-white max-w-4xl">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    {block.content.title}
                  </h1>
                  <p className="text-lg md:text-2xl drop-shadow-md opacity-90">
                    {block.content.subtitle}
                  </p>
                </div>
              </section>
            );

          case "text":
            return (
              <section key={block.id} className="max-w-4xl mx-auto px-6 py-12">
                <div
                  className="prose prose-lg max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{ __html: block.content.html }}
                />
              </section>
            );

          case "image_full":
            return (
              <section key={block.id} className="w-full py-6">
                <img
                  src={resolveImageSrc(block.content.image)}
                  alt={block.content.caption || "Portfolio Image"}
                  className="w-full h-auto object-cover max-h-[90vh]"
                />
                {block.content.caption && (
                  <p className="text-center text-gray-500 mt-2 italic">
                    {block.content.caption}
                  </p>
                )}
              </section>
            );

            case "image_grid":
            return (
              <section key={block.id} className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {block.content.images?.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="overflow-hidden"
                    >
                      <img
                        src={resolveImageSrc(img)}
                        className="w-full h-auto"
                        alt={`Grid item ${idx + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </section>
            );

            case "gallery":
              return (
                <section key={block.id} className="max-w-[1920px] mx-auto px-4 py-12">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {block.content.images?.map((img: string, idx: number) => (
                      <div
                        key={idx} 
                        className={`relative overflow-hidden rounded-lg ${
                          idx % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                        }`}
                      >
                        <img
                          src={resolveImageSrc(img)}
                          className="w-full h-full object-cover min-h-[200px] hover:scale-110 transition duration-700"
                          alt={`Gallery item ${idx + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              );

          case "spacer":
            return (
              <div
                key={block.id}
                style={{ height: `${block.content.height || 50}px` }}
              />
            );

            case "stats_grid":
                return (
                    <section key={block.id} className="max-w-7xl mx-auto px-6 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {block.content.items?.map((item: any, idx: number) => (
                                <div key={idx} className="text-center group hover:bg-gray-50 p-6 rounded-2xl transition-all duration-300 border border-transparent hover:border-gray-100/60">
                                    <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-3">{item.label}</h3>
                                    <p className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                );

            case "image_text_split":
                const isLight = block.content.theme === 'light';
                return (
                    <section key={block.id} className={`w-full overflow-hidden ${isLight ? 'bg-white text-gray-900' : 'bg-[#111] text-white'}`}>
                        <div className={`flex flex-col ${block.content.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} h-full`}> 
                            {/* Image Side */}
                            <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-[600px] relative">
                                <img 
                                    src={resolveImageSrc(block.content.image)} 
                                    alt="Feature" 
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                {/* Optional Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${isLight ? 'from-white/10 to-transparent' : 'from-black/20 to-transparent'}`} />
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2 p-10 lg:p-20 flex flex-col justify-center">
                                <h2 className={`text-4xl lg:text-5xl font-black uppercase mb-6 tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
                                    {block.content.title}
                                </h2>
                                <p className={`text-lg mb-10 leading-relaxed max-w-xl ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {block.content.description}
                                </p>
                                
                                {block.content.points && block.content.points.length > 0 && (
                                    <ul className="space-y-6">
                                        {block.content.points.map((point: any, idx: number) => (
                                            <li key={idx} className="flex gap-4 items-start group">
                                                 {/* Custom Star/Diamond Icon */}
                                                <div className={`mt-1.5 w-3 h-3 rotate-45 ${isLight ? 'bg-blue-600' : 'bg-white'} group-hover:scale-125 transition-transform duration-300 shrink-0`} />
                                                <div className="flex-1">
                                                    <p className={`font-semibold text-lg mb-1 ${isLight ? 'text-gray-800' : 'text-white'}`}>{point.title}</p>
                                                    <p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>{point.description}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </section>
                );

            case "gallery_text_split":
                 return (
                    <section key={block.id} className="w-full bg-[#0a2e1d] text-white"> {/* Dark Green Theme as per image */}
                        <div className={`flex flex-col ${block.content.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-[600px]`}>
                             {/* Grid Images Side */}
                             <div className="w-full lg:w-1/2 p-4 lg:p-12 self-center">
                                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto perspective-1000">
                                     {Array.from({ length: 4 }).map((_, idx) => {
                                         const img = block.content.images?.[idx];
                                         if(!img) return <div key={idx} className="bg-white/5 rounded-xl aspect-[4/3]" />;
                                         
                                         // Staggered effect classes
                                         const transforms = [
                                             "lg:translate-y-8",
                                             "lg:-translate-y-8", 
                                             "lg:translate-y-4", 
                                             "lg:-translate-y-4"
                                         ];
                                         
                                         return (
                                             <div key={idx} className={`rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:z-10 hover:scale-105 ${transforms[idx] || ''}`}>
                                                 <img 
                                                     src={resolveImageSrc(img)} 
                                                     className="w-full h-full object-cover aspect-[4/3]" 
                                                     alt={`Gallery ${idx}`}
                                                 />
                                             </div>
                                         )
                                     })}
                                </div>
                             </div>

                             {/* Content Side */}
                             <div className="w-full lg:w-1/2 p-10 lg:p-20 flex flex-col justify-center">
                                <ul className="space-y-8">
                                    {block.content.points?.map((point: any, idx: number) => (
                                        <li key={idx} className="flex gap-6 items-start group">
                                            <div className="mt-2 w-2 h-2 rotate-45 bg-white group-hover:bg-green-400 transition-colors duration-300 shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-bold text-xl mb-2 text-white leading-tight">{point.title}</p>
                                                <p className="text-gray-300 text-sm leading-relaxed">{point.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                             </div>
                        </div>
                    </section>
                 );

            case "image_with_text":
                return (
                    <section key={block.id} className="max-w-7xl mx-auto px-6 py-16">
                        <div className={`flex flex-col ${block.content.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
                            {/* Image */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                                    <img 
                                        src={resolveImageSrc(block.content.image)} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        alt={block.content.title}
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="w-full lg:w-1/2">
                                {block.content.label && (
                                    <span className="inline-block text-blue-600 font-bold tracking-wider uppercase text-sm mb-3">
                                        {block.content.label}
                                    </span>
                                )}
                                <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                                    {block.content.title}
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    {block.content.description}
                                </p>
                            </div>
                        </div>
                    </section>
                );

          default:
            return null;
        }
      })}
    </div>
  );
}
