function SignUp() {
  return (
    <div className="border w-1/3 rounded-lg mt-3 h-1/2 flex flex-col justify-center items-center mb-3 text-white">
      <h1 className="text-white text-center font-outfit text-4xl font-bold">
        Register
      </h1>
      <form className="flex flex-col p-5">
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          id="Name"
          name="username"
          className="border p-1 mb-2"
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          className="border p-1 mb-2"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
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
