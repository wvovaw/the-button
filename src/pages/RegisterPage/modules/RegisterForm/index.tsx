import { FormEvent } from 'react';
import { signUp } from '@/api/services/signup';
import { useNavigate } from 'react-router-dom';

export default function () {
  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = event.target as HTMLFormElement;
    const email = formData.email.value;
    const name = formData.nick.value;
    const password = formData.password.value;
    const confirmPassword = formData.confirmPassword.value;

    if (password === confirmPassword)
      try {
        const signUpData = await signUp({ email, name, password });
        navigate('/login');
      } catch (e: unknown) {
        alert('Somthing went wrong');
        console.log(e);
      }
    else alert("Password and cofirm didn't match");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <label>
          email: <input name="email" type="email" />
        </label>
        <label>
          name: <input name="nick" type="text" />
        </label>
        <label>
          password: <input name="password" type="password" />
        </label>
        <label>
          confirm password: <input name="confirmPassword" type="password" />
        </label>
        <button type="submit" className="border border-black p-1">
          Submit
        </button>
      </div>
    </form>
  );
}
