import { useContext } from "react";
import { AuthContext } from "@/HOC/AuthProvider";

export function userAuth() {
  return useContext(AuthContext);
}