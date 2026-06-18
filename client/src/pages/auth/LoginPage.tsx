import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../features/auth/authApi";

const LoginPage = () => {
  const [login] = useLoginMutation();

  const { register, handleSubmit } = useForm();

  const submitHandler = async (data: any) => {
    await login(data);
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-white p-8 rounded-xl shadow"
      >
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
        />

        <button className="w-full bg-black text-white py-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
