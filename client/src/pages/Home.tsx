import NavBar from "../components/NavBar";
import banner from "../assets/banner.jpg";
import BannerSearch from "../components/BannerSearch";
import { Button, Typography } from "@mui/material";
import CategoriesBar from "../components/CategoriesBar";
import Featured from "../components/Featured";
import FooterSections from "../components/FooterSections";

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
              height: "800px",
              borderRadius: "50px",
              marginTop: "60px",
              objectFit: "cover",
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
      <footer>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            style={{ marginTop: "80px", padding: "30px", textAlign: "center" }}
          >
            <Typography variant="h3">Why trust</Typography>
            <Typography variant="h3" sx={{ fontWeight: 1000 }}>
              Techwise ?
            </Typography>
            <Button
              style={{
                padding: "15px",
                borderRadius: "30px",
                backgroundColor: "black",
                color: "white",
              }}
            >
              Contact us
            </Button>
          </div>
          <FooterSections />
        </div>
      </footer>
    </div>
  );
}

export default Home;
