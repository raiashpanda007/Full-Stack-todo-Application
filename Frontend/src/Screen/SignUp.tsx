import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
function SignUp() {
  interface RegisterUser {
    name: string;
    email: string;
    password: string;
  }

  const { register, handleSubmit } = useForm<RegisterUser>();
  const onhandleSubmit: SubmitHandler<RegisterUser> = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3000/user/register", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      }
    );
  };

  return (
    <div className="border w-1/3 rounded-lg mt-3 h-1/2 flex flex-col justify-center items-center mb-3 text-white">
      <h1 className="text-white text-center font-outfit text-4xl font-bold">
        Register
      </h1>
      <form onSubmit={handleSubmit(onhandleSubmit)} className="flex flex-col p-5">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="border p-1 mb-2"
          {...register("name")}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className="border p-1 mb-2 text-black"
          {...register("email")}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password")}
          className="border p-1 mb-2"
        />
        <button className="border p-1 bg-blue-500 text-white" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp;
