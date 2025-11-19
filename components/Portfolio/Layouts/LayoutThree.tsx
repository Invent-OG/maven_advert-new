export default function Layout3({
  title,
  description,
  content,
  images,
}: {
  title: string;
  description: string;
  content: string;
  images: string[];
}) {
  return (
    <div className="w-full flex flex-col gap-10 pb-20">
      <section
        className="relative w-full h-[320px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${images?.[0] || "/layout3/hero.jpg"})`,
        }}
      />

      <section className="text-center px-6 md:px-20">
        <h2 className="font-bold text-xl mb-4">{title}</h2>
        <div
          className="text-gray-600 max-w-2xl mx-auto"
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-20">
        <img src={images?.[1] || "/layout3/item1.jpg"} className="rounded-xl" />
        <img src={images?.[2] || "/layout3/item2.jpg"} className="rounded-xl" />
        <img src={images?.[3] || "/layout3/item3.jpg"} className="rounded-xl" />
        <img src={images?.[4] || "/layout3/item4.jpg"} className="rounded-xl" />
      </section>

      <section className="w-full flex justify-center px-6 md:px-20">
        <img
          src={images?.[5] || "/layout3/item5.jpg"}
          className="rounded-xl w-full max-w-3xl"
        />
      </section>

      {content && (
        <section className="px-6 md:px-20 max-w-3xl mx-auto">
          <div
            className="prose text-gray-700"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      )}
    </div>
  );
}
