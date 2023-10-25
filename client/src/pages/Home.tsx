import banner from "../assets/banner.jpg";
import BannerSearch from "../components/BannerSearch";
import { Typography, useMediaQuery } from "@mui/material";
import CategoriesBar from "../components/CategoriesBar";
import Featured from "../components/Featured";
import { useScrollToTop } from "./ProductsByCategories";

function Home() {
  const isMatch: boolean = useMediaQuery("(min-width: 600px)");

  useScrollToTop();

  return (
    <div style={{ paddingLeft: "40px", paddingRight: "40px" }}>
      <header>
        <section>
          <img
            src={banner}
            alt="banner"
            style={{
              width: isMatch ? "100%" : 300,
              height: isMatch ? "800px" : "700px",
              borderRadius: "50px",
              marginTop: "50px",
              objectFit: "cover",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </section>
        <section
          style={{
            position: "absolute",
            marginTop: isMatch ? "-550px" : "-500px",
            marginLeft: isMatch ? "100px" : "20px",
          }}
        >
          <BannerSearch />
        </section>
      </header>
      <main>
        <section style={{ padding: 20, marginTop: "50px" }}>
          <div
            style={{
              textAlign: isMatch ? "match-parent" : "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Categories
            </Typography>
          </div>
          <div style={{ marginTop: "50px" }}>
            <CategoriesBar />
          </div>
        </section>
        <section style={{ padding: 20, marginTop: "50px" }}>
          <div>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Featured Topics
            </Typography>
          </div>
          <div style={{ marginTop: "50px" }}>
            <Featured />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
