import { NavigationLink } from "./NavigationLink";

export function NavigatinMenu() {
  return (
    <>
      <ul className="flex flex-row gap-3">
        <li>
          <NavigationLink to="/">Home</NavigationLink>
        </li>
        <li>
          <NavigationLink to="/leaderboard"> Leaderboard </NavigationLink>
        </li>
        <li>
          <NavigationLink to="/play"> Play </NavigationLink>
        </li>
      </ul>
    </>
  );
}
