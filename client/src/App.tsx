import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductsByCategories from "./pages/ProductsByCategories";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ProductView from "./pages/ProductView";
import { ProductContext } from "./context/ProductContext";
import React from "react";

function App() {
  const [product, setProduct] = React.useState<string>("");

  return (
    <>
      <NavBar />
      <ProductContext.Provider value={{ product, setProduct }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category">
            <Route index element={<ProductsByCategories />} />
            <Route path="view/:id" element={<ProductView />} />
          </Route>
        </Routes>
      </ProductContext.Provider>
      <Footer />
    </>
  );
}

export default App;
