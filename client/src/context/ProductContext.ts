import { createContext } from "react";

interface ProductContextType {
  product: string;
  setProduct: React.Dispatch<React.SetStateAction<string>>;
}
export const ProductContext = createContext<ProductContextType | null>(null);
