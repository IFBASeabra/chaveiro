import { NavLink } from "react-router";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { HomeIcon, LayoutList, LogIn, LogOut, User2Icon } from "lucide-react";

const Menu = () => {
  const { session, logout } = useAuth();

  return (
    <nav className="flex items-center flex-col lg:justify-end lg:flex-row gap-6 px-8 h-full mt-8">
      <NavLink to="/home" className="w-full lg:w-auto">
        <Button variant={"outline"} className="w-full lg:w-auto">
          <HomeIcon size={18} /> Home
        </Button>
      </NavLink>
      {session ? (
        <>
          <NavLink to="/admin/rooms" className="w-full lg:w-auto">
            <Button variant="outline" className="w-full lg:w-auto">
              <LayoutList /> Salas
            </Button>
          </NavLink>
          <NavLink to="/admin/users" className="w-full lg:w-auto">
            <Button variant="outline" className="w-full lg:w-auto">
              <LayoutList /> Salas
            </Button>
          </NavLink>
          <div className="flex gap-2 justify-between items-center w-full">
            <div className="flex gap-2 items-center">
              <User2Icon />
              {session.user.email}
            </div>
            <Button onClick={logout} variant="destructive">
              <LogOut />
              Sair
            </Button>
          </div>
        </>
      ) : (
        <NavLink to="login" className="flex gap-2 items-center">
          <LogIn size={18} /> Login
        </NavLink>
      )}
    </nav>
  );
};

export default Menu;
