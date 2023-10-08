import { Link } from "react-router-dom"; 
export function NotFoundPage() {
  return(
    <>
      <div>This page doesn't exist. Go <Link to="/"/> </div>
    </>
  );
}