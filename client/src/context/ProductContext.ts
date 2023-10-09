import { createContext } from "react";
import { Product } from "../pages/ProductsByCategories";

interface ProductContextType {
  product: Product[] | undefined | null;
  pushItemToArray: (item: Product) => void;
}
export const ProductContext = createContext<ProductContextType>({
  product: [],
  pushItemToArray: () => {},
});
