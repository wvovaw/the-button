import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/NavigationMenu";
import { NavbarLink } from "./components/Link";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { ChevronDown, LogOut, SettingsIcon } from "lucide-react";

export default function Navbar() {
  return (
    <NavigationMenu className="max-w-full justify-between border-b border-border px-4 py-1">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavbarLink to="/">Home</NavbarLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavbarLink to="/leaderboard">Leaderboard</NavbarLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavbarLink to="/play">Play</NavbarLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <UsernameOrLogin className="" />
    </NavigationMenu>
  );
}

function UsernameOrLogin({ className }: { className: string }) {
  const authCtx = useAuth();
  const navigate = useNavigate();
  if (authCtx?.user?.accessToken)
    return (
      <NavigationMenuList className={className}>
        <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="group my-2 flex items-center text-foreground">
              <span className="text-base font-normal">{authCtx?.user?.name}</span>
              <ChevronDown
                className="relative top-[1px] ml-1 h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem disabled className="cursor-pointer">
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => authCtx.signOut(() => navigate("/", { replace: true }))}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <NavigationMenuContent></NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    );
  else
    return (
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavbarLink className="text-foreground" to="/login">
            Sign in
          </NavbarLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavbarLink className="text-primary" to="/register">
            Sign up
          </NavbarLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    );
}
