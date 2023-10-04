import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LaptopIcon from "@mui/icons-material/Laptop";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CategoriesBox from "./CategoriesBox";

const allCategories = [
  {
    icon: <PhoneAndroidIcon />,
    title: "Smartphones",
  },
  {
    icon: <LaptopIcon />,
    title: "Laptops",
  },
  {
    icon: <TabletMacIcon />,
    title: "Tablets",
  },
  {
    icon: <DesktopWindowsIcon />,
    title: "Desktops",
  },
  {
    icon: <CameraAltIcon />,
    title: "Cameras",
  },
];

function CategoriesBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {allCategories.map((el, i) => {
        return <CategoriesBox key={i} icon={el.icon} title={el.title} />;
      })}
    </div>
  );
}

export default CategoriesBar;
