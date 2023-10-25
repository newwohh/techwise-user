import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LaptopIcon from "@mui/icons-material/Laptop";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CategoriesBox from "./CategoriesBox";
import { useMediaQuery } from "@mui/material";

const allCategories = [
  {
    icon: <PhoneAndroidIcon />,
    title: "Smartphone",
  },
  {
    icon: <LaptopIcon />,
    title: "Laptop",
  },
  {
    icon: <TabletMacIcon />,
    title: "Tablet",
  },
  {
    icon: <DesktopWindowsIcon />,
    title: "Desktop",
  },
  {
    icon: <CameraAltIcon />,
    title: "Camera",
  },
];

function CategoriesBar() {
  const isMatch: boolean = useMediaQuery("(min-width: 600px)");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMatch ? "space-evenly" : "center",
        flexDirection: isMatch ? "row" : "column",
      }}
    >
      {allCategories.map((el, i) => {
        return <CategoriesBox key={i} icon={el.icon} title={el.title} />;
      })}
    </div>
  );
}

export default CategoriesBar;
