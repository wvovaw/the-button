import { Outlet } from "react-router-dom";
import Navbar from "../modules/Navbar";

export function BaseLayout() {
  return (
    <>
      <Navbar />
      <main className="container mt-4">
        <Outlet />
      </main>
    </>
  );
}
