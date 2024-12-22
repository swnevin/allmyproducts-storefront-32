export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  points: Array<{
    x: number;
    y: number;
    title: string;
    link: string;
  }>;
}