import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import ProductsByCategories, { Product } from "./pages/ProductsByCategories";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ProductView from "./pages/ProductView";
import { ProductContext } from "./context/ProductContext";
import React from "react";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import ProfileWrapper from "./components/ProfileWrapper";
import ManageAddress from "./pages/ManageAddress";

function App() {
  const [product, setProduct] = React.useState<Product[]>([
    {
      _id: "",
      name: "",
      description: "",
      price: 0,
      category: "",
      brand: "",
      screenSize: 0,
      processor: "",
      storageCapacityGB: 0,
      RAMGB: 0,
      cameraMP: 0,
      operatingSystem: "",
      color: "",
      availability: false,
      seller: "",
      reviews: [],
      images: [],
      __v: 0,
    },
  ]);

  const pushItemToArray = (item: Product) => {
    setProduct((prevArray) => [...prevArray, item]);
  };

  return (
    <>
      <ProductContext.Provider value={{ product, pushItemToArray }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category">
            <Route index element={<ProductsByCategories />} />
            <Route path="view/:id" element={<ProductView />} />
          </Route>
          <Route
            path="/profile"
            element={
              <ProfileWrapper>
                <Outlet />
              </ProfileWrapper>
            }
          >
            <Route index element={<Profile />} />
            <Route path="address" element={<ManageAddress />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </ProductContext.Provider>
      <Footer />
    </>
  );
}

export default App;
