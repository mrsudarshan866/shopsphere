import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../features/auth/authApi";

const RegisterPage = () => {
  const [registerUser] = useRegisterMutation();

  const { register, handleSubmit } = useForm();

  const submitHandler = async (data: any) => {
    await registerUser(data);
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-white p-8 rounded-xl shadow"
      >
        <h1 className="text-3xl font-bold mb-6">Register</h1>

        <input
          {...register("name")}
          placeholder="Name"
          className="w-full border p-3 rounded mb-4"
        />

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
          Create Account
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
