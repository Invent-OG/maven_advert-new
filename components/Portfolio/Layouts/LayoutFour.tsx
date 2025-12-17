import { FaExternalLinkAlt } from "react-icons/fa";

export default function Layout4({
  title,
  description,
  content,
  images,
  websiteUrl,
}: {
  title: string;
  description: string;
  content: string;
  images: string[];
  websiteUrl?: string | null;
}) {
  return (
    <div className="w-full flex flex-col gap-10 pb-20">
      <section
        className="relative w-full h-[320px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${images?.[0] || "/layout4/hero.jpg"})`,
        }}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-20">
        <img src={images?.[1] || "/layout4/item1.jpg"} className="rounded-xl" />
        <div className="flex flex-col justify-center">
          <h2 className="font-bold text-xl mb-4">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <div
            className="prose text-gray-700"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-20">
        <img src={images?.[2] || "/layout4/item2.jpg"} className="rounded-xl" />
        <img src={images?.[3] || "/layout4/item3.jpg"} className="rounded-xl" />
      </section>

      <section className="w-full px-6 md:px-20">
        <img
          src={images?.[4] || "/layout4/item4.jpg"}
          className="rounded-xl w-full"
        />
      </section>
      {/* FIXED FLOATING VISIT BUTTON */}
      {websiteUrl && (
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full shadow-2xl hover:bg-gray-900 hover:scale-105 transition-all duration-300 font-medium"
        >
          <span>Visit Site</span>
          <FaExternalLinkAlt className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}
