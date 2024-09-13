import { Link } from "react-router-dom";
import "./NavMenu.css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// eslint-disable-next-line react/prop-types
const NavMenu = ({ text, to, icon }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            to={to}
            className="nav-menu my-1 w-[40px] h-[40px] flex justify-center items-center flex-col hover:bg-slate-200 rounded-sm p-2"
          >
            <div className="icon-container h-8 w-8">{icon}</div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <div className="logo-text text-xs text-center font-medium">
            {text}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavMenu;
