// export default function Layout3({
//   title,
//   description,
//   content,
//   images,
// }: {
//   title: string;
//   description: string;
//   content: string;
//   images: string[];
// }) {
//   return (
//     <div className="w-full flex flex-col mt-18 gap-10 pb-20">
//       <section
//         className="relative w-full h-[80vh] bg-cover object-contain bg-center"
//         style={{
//           backgroundImage: `url(${images?.[0] || "/layout3/hero.jpg"})`,
//         }}
//       />

//       <section className="text-center px-6 md:px-20">
//         <h2 className="font-bold text-xl mb-4">{title}</h2>
//         <div
//           className="text-gray-600 max-w-2xl mx-auto"
//           dangerouslySetInnerHTML={{ __html: description || "" }}
//         />
//       </section>

//       <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-20">
//         <img src={images?.[1] || "/layout3/item1.jpg"} className="rounded-xl" />
//         <img src={images?.[2] || "/layout3/item2.jpg"} className="rounded-xl" />
//         <img src={images?.[3] || "/layout3/item3.jpg"} className="rounded-xl" />
//         <img src={images?.[4] || "/layout3/item4.jpg"} className="rounded-xl" />
//       </section>

//       <section className="w-full flex justify-center px-6 md:px-20">
//         <img
//           src={images?.[5] || "/layout3/item5.jpg"}
//           className="rounded-xl w-full max-w-3xl"
//         />
//       </section>

//       {content && (
//         <section className="px-6 md:px-20 max-w-3xl mx-auto">
//           <div
//             className="prose text-gray-700"
//             dangerouslySetInnerHTML={{ __html: content }}
//           />
//         </section>
//       )}
//     </div>
//   );
// }
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Layout3({
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
    <div className="w-full flex flex-col pb-20 bg-white">
      {/* ====================== 1. TOP HERO IMAGE ====================== */}
      <section
        className="relative w-full h-[45vh] sm:h-[60vh] md:h-[85vh] bg-cover bg-center rounded-none"
        style={{
          backgroundImage: `url(${images?.[0] || "/layout3/hero.jpg"})`,
        }}
      />

      {/* ====================== 2. TITLE + DESCRIPTION ====================== */}
      <section className="text-center px-4 sm:px-8 md:px-20 mt-10">
        <h2 className="font-bold text-3xl sm:text-4xl mb-4">{title}</h2>
        <div
          className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
      </section>

      {/* ====================== 3. FIRST WIDE IMAGE ====================== */}
      <section className="w-full flex justify-center px-4 sm:px-8 md:px-20 mt-10">
        <img
          src={images?.[1] || "/layout3/item1.jpg"}
          className="rounded-none w-full max-w-6xl h-[300px] sm:h-[420px] md:h-[520px] object-cover"
        />
      </section>

      {/* ====================== 4. THREE IMAGES IN A ROW ====================== */}
      <section className="w-full mt-10 px-4 sm:px-8 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <img
            src={images?.[2] || "/layout3/item2.jpg"}
            className="rounded-none w-full h-[260px] sm:h-[300px] md:h-[340px] object-cover"
          />

          <img
            src={images?.[3] || "/layout3/item3.jpg"}
            className="rounded-none w-full h-[260px] sm:h-[300px] md:h-[340px] object-cover"
          />

          <img
            src={images?.[4] || "/layout3/item4.jpg"}
            className="rounded-none w-full h-[260px] sm:h-[300px] md:h-[340px] object-cover"
          />
        </div>
      </section>

      {/* ====================== 5. FINAL BIG IMAGE ====================== */}
      <section className="w-full flex justify-center px-4 sm:px-8 md:px-20 mt-10">
        <img
          src={images?.[5] || "/layout3/item5.jpg"}
          className="rounded-none w-full max-w-6xl h-[300px] sm:h-[420px] md:h-[520px] object-cover"
        />
      </section>

      {/* ====================== 6. FINAL CONTENT TEXT ====================== */}
      {content && (
        <section className="px-4 sm:px-8 md:px-20 max-w-4xl mx-auto mt-12">
          <div
            className="prose text-gray-700 text-base sm:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      )}

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
