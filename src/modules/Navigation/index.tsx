import { NavigatinMenu } from "./components/NavigationMenu";
import UserMenu from "./components/UserMenu";

export default function () {
  return (
    <>
      <nav className="bg-slate-200 p-4 flex justify-between">
        <NavigatinMenu />
        <UserMenu />
      </nav>
    </>
  );
}
