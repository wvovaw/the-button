import { NavigatinMenu } from "./components/NavigationMenu";
import UserMenu from "./components/UserMenu";

export default function Navigation() {
  return (
    <>
      <nav className="flex justify-between bg-slate-200 p-4">
        <NavigatinMenu />
        <UserMenu />
      </nav>
    </>
  );
}
