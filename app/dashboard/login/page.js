"use client";
import { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { useAuth } from "@context/AuthContext";
import { useMessage } from "@context/MessageContext";
import UnProtectedRoute from "@component/UnProtectedPages";
import axios from "axios";
import { Spinner } from "flowbite-react";

async function Login() {
  const { login, error, logout } = useAuth();
  const { push } = useRouter();
  const { setMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    uuid: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log(formValues.uuid, formValues.password);
    const formData = new FormData(e.target);
    const uuid = formData.get("uuid");
    const password = formData.get("password");
    // console.log(uuid, password);
    try {
      logout();
      const response = await axios.post(
        "http://rcpss-sutech.ir/django/api/token/",
        { uuid, password }
      );

      login(response);

      // if (error === null) {
      console.log("Success running!, error:", error);
      setLoading(false);
      setMessage({ message: "خوش آمدید", mesStatus: "success" });
      push("/dashboard");
      // } else if (error) {
      // }
    } catch (err) {
      console.log("Error running!, error:", err);
      setMessage({
        message: "ورود شما ناموفق بود. لطفا مجددا تلاش نمایید",
        mesStatus: "error",
      });
      setLoading(false);
      console.error(err);
      throw new Error("ورود ناموفق");
    }
  };

  return (
    <UnProtectedRoute>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 font-iranyekan">
        <main className="bg-gray-50 dark:bg-gray-900 h-screen">
          <div className="flex flex-col justify-center items-center py-8 px-6 mx-auto md:h-screen">
            <a
              className="flex justify-center items-center mb-8 text-3xl font-semibold lg:mb-10 dark:text-white"
              href="/"
            >
              <img src="/rcpss.png" className="ml-3 h-8" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">
                داشبورد انرژی
              </span>
            </a>
            <div className="justify-center items-center w-full bg-white rounded-lg shadow lg:flex md:mt-0 lg:max-w-screen-sm xl:p-0 dark:bg-gray-800">
              <div className="p-6 w-full sm:p-8 lg:p-10">
                <h1 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white">
                  ورود به داشبورد انرژی
                </h1>
                <p className="mb-3 text-gray-500 dark:text-gray-400">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز
                </p>
                <form className="mt-8" onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      کد مخصوص کنتور
                    </label>
                    <input
                      required
                      type="text"
                      name="uuid"
                      // value={formValues.uuid}
                      // onChange={handleChange}
                      placeholder="cb8956e1-235e-4651-8486-756694125987"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      defaultValue=""
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      رمز عبور
                    </label>
                    <input
                      required=""
                      name="password"
                      type="password"
                      // value={formValues.password}
                      // onChange={handleChange}
                      placeholder="رمز عبور"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        name="remember"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-50 rounded border-gray-300 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="mr-1 text-sm">
                      <label
                        htmlFor="remember"
                        className="font-medium text-gray-900 dark:text-white"
                      >
                        به خاطر بسپار
                      </label>
                    </div>
                    <a className="mr-3 text-sm text-blue-700 dark:text-blue-500 hover:underline">
                      فراموشی رمزعبور؟
                    </a>
                  </div>
                  <div className="mb-6">
                    <div>
                      <div
                        className="grecaptcha-badge"
                        data-style="none"
                        style={{
                          width: 256,
                          height: 60,
                          position: "fixed",
                          visibility: "hidden",
                        }}
                      >
                        <div className="grecaptcha-logo">
                          <iframe
                            title="reCAPTCHA"
                            width={256}
                            height={60}
                            role="presentation"
                            name="a-l1zpl66hkx9h"
                            frameBorder={0}
                            scrolling="no"
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                            src="https://www.google.com/recaptcha/api2/anchor?ar=1&k=6LcKn58eAAAAAFD-lFXQHCSkdJ9V76lq3KLyNygU&co=aHR0cHM6Ly9mbG93Yml0ZS5jb206NDQz&hl=en&type=image&v=u-xcq3POCWFlCr3x8_IPxgPu&theme=light&size=invisible&badge=bottomright&cb=z9ue6dpdpcsv"
                          />
                        </div>
                        <div className="grecaptcha-error" />
                        <textarea
                          id="g-recaptcha-response-6"
                          name="g-recaptcha-response"
                          className="g-recaptcha-response"
                          style={{
                            width: 250,
                            height: 40,
                            border: "1px solid rgb(193, 193, 193)",
                            margin: "10px 25px",
                            padding: 0,
                            resize: "none",
                            display: "none",
                          }}
                          defaultValue={""}
                        />
                      </div>
                      <iframe style={{ display: "none" }} />
                    </div>
                  </div>
                  <button
                    className={`text-white font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center mb-6 ${loading ? 'bg-blue-500' : 'bg-blue-700'}`}
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    <span className="flex justify-center items-center" >
                      وارد شدن
                      {loading && (
                        <Spinner
                          className="mr-3"
                          aria-label="Power chart loader"
                          size="sm"
                          color="purple"
                        />
                      )}
                    </span>
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    حساب نداری؟
                    <a className="mr-1 text-blue-700 hover:underline dark:text-blue-500">
                      ثبت‌نام در داشبورد انرژی
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </UnProtectedRoute>
  );
}

export default Login;
