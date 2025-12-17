import LayerOne from "./Layouts/LayerOne";
import LayerTwo from "./Layouts/LayerTwo";
import LayoutFive from "./Layouts/LayoutFive";
import LayoutFour from "./Layouts/LayoutFour";
import LayoutThree from "./Layouts/LayoutThree";

export type PortfolioLayoutProps = {
  title: string;
  description: string;
  content: string;
  images: string[];
  websiteUrl?: string | null;
};

export const PortfolioLayouts: Record<
  number,
  React.ComponentType<PortfolioLayoutProps>
> = {
  1: LayerOne,
  2: LayerTwo,
  3: LayoutThree,
  4: LayoutFour,
  5: LayoutFive,
};
