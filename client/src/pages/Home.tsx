import NavBar from "../components/NavBar";
import banner from "../assets/banner.jpg";
import BannerSearch from "../components/BannerSearch";
import { Typography } from "@mui/material";

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
        <section style={{ padding: 20 }}>
          <div>
            <Typography variant="h5">Categories</Typography>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
