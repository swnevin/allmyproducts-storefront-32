export interface Product {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  user_id: string;
  created_at: string;
  points: Array<{
    x: number;
    y: number;
    title: string;
    link: string;
  }> | null;
}