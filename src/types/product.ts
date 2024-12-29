export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  user_id: string;
  created_at: string;
  points: Array<{
    x: number;
    y: number;
    title: string;
    link: string;
  }>;
}