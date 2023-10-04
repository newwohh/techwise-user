import NavBar from "../components/NavBar";
import banner from "../assets/banner.jpg";
import BannerSearch from "../components/BannerSearch";
import { Typography } from "@mui/material";
import CategoriesBar from "../components/CategoriesBar";
import Featured from "../components/Featured";

function Home() {
  return (
    <div style={{ padding: "50px" }}>
      <header>
        <nav>
          <NavBar />
        </nav>
        <section>
          <img
            src={banner}
            alt="banner"
            style={{
              width: "100%",
              height: "900px",
              borderRadius: "50px",
              marginTop: "60px",
            }}
          />
        </section>
        <section
          style={{
            position: "absolute",
            marginTop: "-550px",
            marginLeft: "100px",
          }}
        >
          <BannerSearch />
        </section>
      </header>
      <main>
        <section style={{ padding: 20, marginTop: "50px" }}>
          <div>
            <Typography variant="h5">Categories</Typography>
          </div>
          <div style={{ marginTop: "50px" }}>
            <CategoriesBar />
          </div>
        </section>
        <section style={{ padding: 20, marginTop: "50px" }}>
          <div>
            <Typography variant="h5">Featured Topics</Typography>
          </div>
          <div style={{ marginTop: "50px" }}>
            <Featured />
          </div>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default Home;
