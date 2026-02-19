import React from "react";
import { PortfolioBlock } from "@/lib/types/portfolios";
import {
  Check,
  ChevronRight,
  Quote,
  Play,
  ArrowRight,
  Download,
  ExternalLink,
} from "lucide-react";

interface BlockRendererProps {
  blocks: PortfolioBlock[];
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-12">
      {blocks.map((block) => (
        <BlockWrapper key={block.id} block={block} />
      ))}
    </div>
  );
};

const BlockWrapper: React.FC<{ block: PortfolioBlock }> = ({ block }) => {
  // Helper to safely get value or default
  const getVal = (val: any, def: string = "0px") => {
    if (!val) return def;
    const str = String(val);
    return str.match(/^[0-9]+$/) ? `${str}px` : str;
  };

  const cssVars = {
    "--pt": getVal(block.content.paddingTop),
    "--pb": getVal(block.content.paddingBottom),
    "--pl": getVal(block.content.paddingLeft),
    "--pr": getVal(block.content.paddingRight),
    "--mt": getVal(block.content.marginTop),
    "--mb": getVal(block.content.marginBottom),
    "--bw": block.content.borderWidth ? `${block.content.borderWidth}` : "0px",
    "--br": block.content.borderRadius
      ? `${block.content.borderRadius}`
      : "0px",
    "--bc": block.content.borderColor || "transparent",
    "--bg": block.content.backgroundColor || "transparent",
    "--text": block.content.textColor || "inherit",
    "--grad": block.content.gradient || "none",
  } as React.CSSProperties;

  return (
    <div
      className="w-full transition-all duration-300 overflow-hidden @container"
      style={cssVars}
    >
      <div
        className={`
          w-full
          pt-[calc(var(--pt)*0.5)] @md:pt-[var(--pt)]
          pb-[calc(var(--pb)*0.5)] @md:pb-[var(--pb)]
          pl-[calc(var(--pl)*0.5)] @md:pl-[var(--pl)]
          pr-[calc(var(--pr)*0.5)] @md:pr-[var(--pr)]
          mt-[calc(var(--mt)*0.5)] @md:mt-[var(--mt)]
          mb-[calc(var(--mb)*0.5)] @md:mb-[var(--mb)]
          border-[length:var(--bw)] border-[color:var(--bc)] rounded-[var(--br)]
          ${block.content.borderWidth ? "border-solid" : "border-none"}
        `}
        style={{
          background: "var(--grad, var(--bg))",
          color: "var(--text)",
        }}
      >
        <BlockContent block={block} />
      </div>
    </div>
  );
};

const BlockContent: React.FC<{ block: PortfolioBlock }> = ({ block }) => {
  switch (block.type) {
    case "hero":
      return (
        <div
          className="relative min-h-[50vh] @md:min-h-[60vh] flex items-center justify-center bg-cover bg-center text-white w-full py-12 @md:py-0"
          style={{
            backgroundImage: block.content.image
              ? `url(${block.content.image})`
              : "none",
            backgroundColor: !block.content.image ? "#1a1a1a" : "transparent",
          }}
        >
          {block.content.image && (
            <div className="absolute inset-0 bg-black/40" />
          )}
          <div className="relative z-10 text-center p-6 @md:p-8 max-w-4xl mx-auto">
            <h1
              className="text-3xl @md:text-5xl lg:text-6xl font-bold mb-4 @md:mb-6 leading-tight"
              style={{ color: block.content.textColor }}
            >
              {block.content.title}
            </h1>
            <p
              className="text-lg @md:text-xl lg:text-2xl opacity-90 font-light max-w-2xl mx-auto"
              style={{ color: block.content.textColor }}
            >
              {block.content.subtitle}
            </p>
          </div>
        </div>
      );

    case "text":
      return (
        <div className="max-w-4xl mx-auto px-4 @md:px-6 py-8 @md:py-12">
          <div
            className="prose prose-base @md:prose-lg max-w-none text-inherit"
            style={{ color: "inherit" }}
            dangerouslySetInnerHTML={{ __html: block.content.html || "" }}
          />
        </div>
      );

    case "image_full":
      if (!block.content.image) {
        return (
          <div className="w-full p-6 @md:p-8 flex justify-center bg-gray-50/50">
            <div className="w-full h-48 @md:h-64 bg-gray-100/50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
              <span className="text-sm">No Image Selected</span>
            </div>
          </div>
        );
      }
      return (
        <div className="w-full">
          <img
            src={block.content.image}
            alt={block.content.caption || "Full width image"}
            className="w-full h-auto object-cover"
          />
          {block.content.caption && (
            <p className="mt-4 text-center text-inherit opacity-70 text-sm italic px-4">
              {block.content.caption}
            </p>
          )}
        </div>
      );

    case "image_grid":
    case "gallery":
      const images = (block.content.images || []).filter((img: string) => img);
      if (images.length === 0) return null;

      return (
        <div className="max-w-7xl mx-auto px-4 @md:px-6 py-8 @md:py-12">
          <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6">
            {images.map((img: string, idx: number) => (
              <div
                key={idx}
                className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 group"
              >
                <img
                  src={img}
                  alt={`Gallery image ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      );

    case "spacer":
      return <div style={{ height: Number(block.content.height) || 50 }} />;

    case "stats_grid":
      const items = block.content.items || [];
      if (items.length === 0) return null;

      return (
        <div className="py-12 @md:py-16">
          <div className="max-w-7xl mx-auto px-4 @md:px-6">
            <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-8 @md:gap-8">
              {items.map((item: any, idx: number) => (
                <div key={idx} className="text-center space-y-2">
                  <p className="text-3xl @md:text-5xl font-bold text-inherit">
                    {item.value}
                  </p>
                  <p className="text-xs @md:text-sm font-semibold text-inherit opacity-60 uppercase tracking-widest">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "image_text_split":
      const isDark = block.content.theme === "dark";
      const isReverse = block.content.reverse;

      return (
        <div className={`py-12 @md:py-20`}>
          <div className="max-w-7xl mx-auto px-4 @md:px-6">
            <div
              className={`flex flex-col @lg:flex-row gap-8 @lg:gap-20 items-center ${
                isReverse ? "@lg:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full @lg:w-1/2">
                {block.content.image ? (
                  <img
                    src={block.content.image}
                    alt={block.content.title}
                    className="w-full rounded-2xl shadow-xl"
                  />
                ) : (
                  <div className="w-full aspect-video bg-gray-200/10 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-500/20">
                    <span className="text-sm opacity-50">No Image</span>
                  </div>
                )}
              </div>
              <div className="w-full @lg:w-1/2 space-y-6 @md:space-y-8">
                <div className="space-y-3 @md:space-y-4">
                  <h2 className="text-2xl @md:text-4xl font-bold leading-tight text-inherit">
                    {block.content.title}
                  </h2>
                  <p className="text-base @md:text-lg leading-relaxed text-inherit opacity-80">
                    {block.content.description}
                  </p>
                </div>

                {block.content.points && block.content.points.length > 0 && (
                  <div className="space-y-4 @md:space-y-6">
                    {block.content.points.map((point: any, idx: number) => (
                      <div key={idx} className="flex gap-4">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                            isDark
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-base @md:text-lg mb-1 text-inherit">
                            {point.title}
                          </h4>
                          <p className="text-sm text-inherit opacity-70">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );

    case "gallery_text_split":
      const galleryImages = (block.content.images || []).filter(
        (img: string) => img,
      );
      const isSplitReverse = block.content.reverse;

      return (
        <div className="py-12 @md:py-20">
          <div className="max-w-7xl mx-auto px-4 @md:px-6">
            <div
              className={`flex flex-col @lg:flex-row gap-8 @lg:gap-16 items-start ${
                isSplitReverse ? "@lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text Side */}
              <div className="w-full @lg:w-1/2 space-y-6 self-center">
                <div className="space-y-4">
                  <h2 className="text-3xl @md:text-4xl font-bold leading-tight text-inherit">
                    {block.content.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-inherit opacity-80">
                    {block.content.description}
                  </p>
                </div>
                {block.content.points && block.content.points.length > 0 && (
                  <ul className="space-y-3">
                    {block.content.points.map((point: any, idx: number) => (
                      <li key={idx} className="flex gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60 shrink-0" />
                        <span className="text-inherit opacity-80">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Gallery Side */}
              <div className="w-full @lg:w-1/2">
                {galleryImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 @md:gap-4">
                    {galleryImages
                      .slice(0, 4)
                      .map((img: string, idx: number) => (
                        <div
                          key={idx}
                          className={`relative rounded-xl overflow-hidden shadow-sm bg-gray-100 aspect-square ${
                            galleryImages.length === 3 && idx === 0
                              ? "col-span-2 aspect-[2/1]"
                              : ""
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Gallery image ${idx + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="w-full aspect-square bg-gray-100/50 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                    <span className="text-sm opacity-50">
                      No Images Selected
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );

    case "image_with_text":
      return (
        <div className="py-12 @md:py-16 max-w-7xl mx-auto px-4 @md:px-6">
          <div
            className={`flex flex-col @lg:flex-row gap-8 @lg:gap-16 items-center ${
              block.content.reverse ? "@lg:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full @lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/5 rounded-3xl transform rotate-3" />
                {block.content.image ? (
                  <img
                    src={block.content.image}
                    alt={block.content.title}
                    className="relative w-full rounded-3xl shadow-lg bg-white"
                  />
                ) : (
                  <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
            </div>
            <div className="w-full @lg:w-1/2 space-y-4 @md:space-y-6">
              {block.content.label && (
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wider uppercase">
                  {block.content.label}
                </span>
              )}
              <h2 className="text-2xl @md:text-3xl font-bold text-inherit">
                {block.content.title}
              </h2>
              <p className="text-base @md:text-lg text-inherit opacity-80 leading-relaxed">
                {block.content.description}
              </p>
            </div>
          </div>
        </div>
      );

    case "video":
      return (
        <div className="max-w-5xl mx-auto px-4 @md:px-6 py-8 @md:py-12">
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl group">
            {block.content.url ? (
              <iframe
                src={block.content.url.replace("watch?v=", "embed/")}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gray-100">
                <Play className="w-12 h-12 mb-4 opacity-50" />
                <p>No Video URL Provided</p>
              </div>
            )}
          </div>
        </div>
      );

    case "testimonials":
      return (
        <div className="py-12 @md:py-20">
          <div className="max-w-7xl mx-auto px-4 @md:px-6">
            {block.content.title && (
              <h2 className="text-2xl @md:text-3xl font-bold text-center text-inherit mb-8 @md:mb-12">
                {block.content.title}
              </h2>
            )}
            <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-6 @md:gap-8">
              {block.content.items?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white/50 p-6 @md:p-8 rounded-2xl shadow-sm border border-gray-100 relative"
                >
                  <Quote className="w-6 h-6 @md:w-8 @md:h-8 text-blue-100 absolute top-6 left-6" />
                  <div className="relative z-10 space-y-4 @md:space-y-6">
                    <p className="text-gray-600 italic leading-relaxed text-sm @md:text-base">
                      "{item.text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold shrink-0">
                        {item.author?.[0] || "?"}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">
                          {item.author}
                        </h4>
                        <p className="text-xs text-gray-500">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "features":
      return (
        <div className="py-12 @md:py-20 max-w-7xl mx-auto px-4 @md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 @md:mb-16 space-y-3 @md:space-y-4">
            <h2 className="text-2xl @md:text-3xl font-bold text-inherit">
              {block.content.title}
            </h2>
            <p className="text-inherit opacity-80 text-base @md:text-lg">
              {block.content.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 @md:grid-cols-3 gap-6 @md:gap-10">
            {block.content.items?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="bg-white/50 p-6 @md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center space-y-3 @md:space-y-4"
              >
                <div className="w-12 h-12 @md:w-14 @md:h-14 mx-auto bg-blue-50/50 rounded-xl flex items-center justify-center text-xl @md:text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-lg @md:text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm @md:text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "cta":
      return (
        <div className="py-12 @md:py-20">
          <div className="max-w-4xl mx-auto px-4 @md:px-6 text-center space-y-6 @md:space-y-8">
            <h2 className="text-3xl @md:text-4xl font-bold text-inherit">
              {block.content.title}
            </h2>
            <p className="text-lg @md:text-xl text-inherit opacity-90 leading-relaxed max-w-2xl mx-auto">
              {block.content.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={block.content.buttonLink}
                className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
              >
                {block.content.buttonText}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      );

    case "bento_grid":
      const bentoImages = (block.content.images || []).filter(
        (img: string) => img,
      );
      if (bentoImages.length === 0) return null;

      // Expecting 3 images: Large Top, Small Left, Small Right
      const [largeImg, smallLeft, smallRight] = bentoImages;

      return (
        <div className="py-12 @md:py-20 max-w-5xl mx-auto px-4 @md:px-6">
          <div className="flex flex-col gap-4">
            {/* Top Large Image */}
            <div className="relative w-full aspect-[16/9] @md:aspect-[2/1] rounded-2xl overflow-hidden shadow-sm bg-gray-100 group">
              {largeImg ? (
                <img
                  src={largeImg}
                  alt="Feature Large"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Large Image
                </div>
              )}
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Small Left */}
              <div className="relative aspect-square @md:aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-gray-100 group">
                {smallLeft ? (
                  <img
                    src={smallLeft}
                    alt="Feature Small 1"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Small Image 1
                  </div>
                )}
              </div>
              {/* Small Right */}
              <div className="relative aspect-square @md:aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-gray-100 group">
                {smallRight ? (
                  <img
                    src={smallRight}
                    alt="Feature Small 2"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Small Image 2
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="p-8 text-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg m-6">
          <p className="text-gray-500 font-medium">
            Block type{" "}
            <span className="font-mono text-gray-700">"{block.type}"</span>{" "}
            renderer not implemented yet.
          </p>
        </div>
      );
  }
};

export default BlockRenderer;
