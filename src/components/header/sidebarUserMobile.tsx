import { useNavigate } from "react-router-dom";
import {
  LifeBuoy,
  LogOut,
  Package,
  Folders,
  FilePenLine,
  ImagePlay,
  MonitorPlay,
  Cctv,
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarUserMobileProps {
  visible?: boolean;
}

export default function SidebarUserMobile({
  visible = true,
}: SidebarUserMobileProps) {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: Package,
      path: "/dashboard/createProject",
      tooltip: "Crear Proyecto",
      color: "#E65100",
    },
    {
      icon: Folders,
      path: "/dashboard/projects",
      tooltip: "Proyectos",
      color: "#26C6DA",
    },
    {
      icon: FilePenLine,
      path: "/dashboard/tareas",
      tooltip: "Tareas",
      color: "#eab217",
    },
    {
      icon: ImagePlay,
      path: "/dashboard/capacitacion",
      tooltip: "Capacitación",
      color: "#3ce086",
    },
    {
      icon: MonitorPlay,
      path: "/dashboard/tutoriales",
      tooltip: "Tutoriales",
      color: "#23499b",
    },
    {
      icon: Cctv,
      path: "/dashboard/monitoreo",
      tooltip: "Monitoreo",
      color: "#f179f7",
    },
    {
      icon: LifeBuoy,
      path: "/dashboard/support",
      tooltip: "Soporte",
      color: "#66BB6A",
    },
    {
      icon: LogOut,
      path: "/login",
      tooltip: "Cerrar sesión",
      color: "#EF5350",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 20,
      }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed bottom-0 left-0 right-0 h-16 bg-[#F6EEEE] border-t border-gray-200 flex justify-around items-center shadow-md z-40"
    >
      {menuItems.map((item, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(item.path)}
          className="relative p-4 group"
          title={item.tooltip}
        >
          <motion.div
            className="relative z-10"
            initial={{ color: "#9CA3AF" }}
            whileHover={{ color: item.color }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <item.icon className="h-6 w-6" />
          </motion.div>

          <motion.div
            className="absolute inset-0 rounded-full opacity-0"
            style={{ backgroundColor: item.color }}
            initial={{ scale: 0.8 }}
            whileHover={{
              opacity: 0.2,
              scale: 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.button>
      ))}
    </motion.div>
  );
}
