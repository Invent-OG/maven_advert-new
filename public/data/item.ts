export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  section: string;
  width: number;
  height: number;
}

export const items: PortfolioItem[] = [
  // Hero Section
  {
    id: 1,
    title: "Packaging Hero",
    description:
      "The smart bottle features technology that keeps you connected.",
    image:
      "https://images.pexels.com/photos/33894780/pexels-photo-33894780.jpeg",
    alt: "Packaging",
    section: "hero",
    width: 600,
    height: 400,
  },

  // Product Section 1
  {
    id: 2,
    title: "Product 1",
    description: "Kuppaimeni Soap",
    image:
      "https://images.pexels.com/photos/33894780/pexels-photo-33894780.jpeg",
    alt: "Product 1",
    section: "product-section-1",
    width: 300,
    height: 300,
  },
  {
    id: 3,
    title: "Product 2",
    description: "Kuppaimeni Soap",
    image:
      "https://images.pexels.com/photos/33894780/pexels-photo-33894780.jpeg",
    alt: "Product 2",
    section: "product-section-1",
    width: 300,
    height: 300,
  },

  // Product Section 2
  {
    id: 4,
    title: "Product 3",
    description: "Aloe Vera Soap",
    image:
      "https://images.pexels.com/photos/33894780/pexels-photo-33894780.jpeg",
    alt: "Product 3",
    section: "product-section-2",
    width: 600,
    height: 400,
  },

  // Product Section 3
  {
    id: 5,
    title: "Product 4",
    description: "Goat Milk Soap Layout",
    image:
      "https://images.pexels.com/photos/33894780/pexels-photo-33894780.jpeg",
    alt: "Product 4",
    section: "product-section-3",
    width: 600,
    height: 400,
  },
  {
    id: 6,
    title: "Product 5",
    description: "Goat Milk Soap Box",
    image:
      "https://images.pexels.com/photos/33894780/pexels-photo-33894780.jpeg",
    alt: "Product 5",
    section: "product-section-3",
    width: 600,
    height: 400,
  },

  // Product Section 4
  {
    id: 7,
    title: "Product 6",
    description: "Soap Design 1",
    image:
      "https://images.pexels.com/photos/33894780/pexels-photo-33894780.jpeg",
    alt: "Product 6",
    section: "product-section-4",
    width: 250,
    height: 300,
  },
  {
    id: 8,
    title: "Product 7",
    description: "Soap Design 2",
    image:
      "https://images.pexels.com/photos/33894780/pexels-photo-33894780.jpeg",
    alt: "Product 7",
    section: "product-section-4",
    width: 250,
    height: 300,
  },
  {
    id: 9,
    title: "Product 8",
    description: "Soap Design 3",
    image:
      "https://images.pexels.com/photos/33894780/pexels-photo-33894780.jpeg",
    alt: "Product 8",
    section: "product-section-4",
    width: 250,
    height: 300,
  },
];
