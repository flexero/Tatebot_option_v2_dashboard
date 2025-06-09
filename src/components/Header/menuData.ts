import { IconType } from "react-icons";
import {
  HiHome,
  HiChartBar,
  HiCog,
  HiDocumentText,
  HiUserGroup,
  HiAcademicCap,
  HiSupport,
} from "react-icons/hi";

interface SubMenuItem {
  title: string;
  path: string;
}

interface MenuItem {
  id: number;
  title: string;
  path?: string;
  icon?: IconType;
  submenu?: SubMenuItem[];
}

// Remove the import for react-icons/hi and create placeholder icons
const IconPlaceholder = () => null;

const menuData: MenuItem[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    icon: IconPlaceholder, // Replace HiHome with placeholder
  },
  {
    id: 2,
    title: "Trading Target",
    path: "/trading",
    icon: IconPlaceholder, // Replace HiChartBar with placeholder
    submenu: [
      {
        title: "Live Trading",
        path: "/trading/live",
      },
      {
        title: "Strategies",
        path: "/trading/strategies",
      },
      {
        title: "Performance",
        path: "/trading/performance",
      },
    ],
  },
  {
    id: 3,
    title: "Strategies",
    path: "/learn",
    icon: IconPlaceholder, // Replace HiAcademicCap with placeholder
    submenu: [
      {
        title: "Getting Started",
        path: "/learn/getting-started",
      },
      {
        title: "Strategy Guide",
        path: "/learn/strategy-guide",
      },
      {
        title: "Documentation",
        path: "/learn/docs",
      },
    ],
  },
  {
    id: 4,
    title: "About System",
    path: "/about",
    icon: IconPlaceholder, // Replace HiUserGroup with placeholder
  },
  {
    id: 5,
    title: "Support",
    path: "/support",
    icon: IconPlaceholder, // Replace HiSupport with placeholder
  },
];

export default menuData;
