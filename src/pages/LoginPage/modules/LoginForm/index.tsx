import { type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signIn } from "@/api/services/signin";
import { useAuth } from "@/hooks/useAuth";
import jwtDecode from "jwt-decode";
import { UserProfile } from "../../../../api/types";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const authCtx = useAuth();
  const fromPage = location.state?.from?.pathname || "/";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = event.target as HTMLFormElement;
    const email = formData.email.value;
    const password = formData.password.value;

    try {
      const signInData = await signIn({
        email,
        password,
      });

      if (signInData.accessToken) {
        const payload: Omit<UserProfile, "accessToken"> = jwtDecode(signInData.accessToken);
        authCtx?.signIn(
          {
            accessToken: signInData.accessToken,
            id: payload.id,
            name: payload.name,
            email: payload.email,
          },
          () => navigate(fromPage, { replace: true }),
        );
      } else {
        alert("logn failed");
      }
    } catch (e: unknown) {
      alert("logn failed");
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <label>
          email: <input type="email" name="email"></input>
        </label>
        <label>
          password: <input type="password" name="password"></input>
        </label>
      </div>
      <button type="submit" className="border border-black p-1">
        Login
      </button>
    </form>
  );
}
