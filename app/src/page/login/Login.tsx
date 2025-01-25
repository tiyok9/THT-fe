import { useState } from "react";
import LoginIMG from "../../../public/Frame 98699.png";
import { useMutation } from "@tanstack/react-query";
import ApiLogin from "../../service/ApiLogin";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/Auth";
import { NavLink } from "react-router";
type Props = {
  email: string;
  password: string;
};

const submitMessage = async (params: Props) => {
  const formData = new FormData();
  formData.append("email", params.email);
  formData.append("password", params.password);

  return await ApiLogin.loginToken(formData);
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrmessage] = useState<any>();
  const { authContext } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const mutation = useMutation({
    mutationFn: submitMessage,

    onSettled: async (data: any, error: any) => {
      if (data) {
        setLoading(false);

        authContext.signIn(data);
      } else {
        setErrmessage(error.message);
        setLoading(false);
      }
    },
    onError: async (error: any) => {
      setLoading(false);
      setErrmessage(error.message);
    },
  });
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    mode: "onChange",
  });

  const onSubmit = async (params: Props) => {
    setLoading(true);
    await mutation.mutate(params);
  };
  return (
    <div className="grid h-screen items-center  grid-cols-1 md:grid-cols-2">
      <div className="bg-white p-6 rounded-lg  w-[70%] h-fit place-self-center">
        <div className="flex flex-col gap-6 text-center">
          <div className="flex flex-row gap-2 justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 text-red-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <h1 className="text-xl font-bold">SIMS Web App</h1>
          </div>
          <h3 className="md:text-2xl font-semibold text-xl w-full md:w-[70%] place-self-center">
            Masuk atau buat
            <NavLink to={"/register"} className="text-red-500">
              {" "}
              akun{" "}
            </NavLink>
            untuk memulai
          </h3>
          {errMessage && (
            <span className="text-red-500 font-semibold text-md">
              Error Gagal Register
            </span>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative w-full">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-4 text-gray-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>
                </span>
                <input
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Format email tidak valid",
                    },
                  })}
                  type="email"
                  placeholder="Masukan Email Anda"
                  className=" text-sm block border border-gray-100 bg-blueDark w-full rounded-md py-2 pl-10 shadow-sm focus:outline-none"
                />
              </div>
              {errors?.email && (
                <p className="peer-invalid:mt-2 text-start peer-invalid:flex text-pink-600 text-sm">
                  {errors.email.message || "This field is required."}
                </p>
              )}

              {errMessage?.email?.[0] && (
                <p className="peer-invalid:mt-2 text-start peer-invalid:flex text-pink-600 text-sm">
                  {errMessage?.email?.[0]}
                </p>
              )}
              <div className="relative mt-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-4 text-gray-400"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </span>
                <input
                  {...register("password", { required: true })}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Masukan Password Anda"
                  className=" text-sm block border border-gray-100 bg-blueDark w-full rounded-md py-2 pl-10 shadow-sm focus:outline-none"
                />

                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {!passwordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4 text-gray-400"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4 text-gray-400"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors?.password && (
                <p className="peer-invalid:mt-2 text-start peer-invalid:flex text-pink-600 text-sm">
                  {errors.password.message || "This field is required."}
                </p>
              )}

              {errMessage?.password?.[0] && (
                <p className="peer-invalid:mt-2 text-start peer-invalid:flex text-pink-600 text-sm">
                  {errMessage?.password?.[0]}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-red-500 hover:bg-red-400 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded w-full mt-5"
            >
              {loading ? (
                <div className="flex flex-row items-center gap-4 justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                    >
                      <animateTransform
                        attributeName="transform"
                        dur="0.75s"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 12 12;360 12 12"
                      />
                    </path>
                  </svg>
                  Process
                </div>
              ) : (
                "Masuk"
              )}
            </button>
          </form>
        </div>
      </div>
      <div
        className="w-full h-screen bg-cover bg-center  items-center justify-center hidden md:flex"
        style={{ backgroundImage: `url(${LoginIMG})` }}
      ></div>
    </div>
  );
};

export default Login;
