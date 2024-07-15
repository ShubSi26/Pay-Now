import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl, logined, userinfo } from "../../recoil/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useState } from "react";

export default function Register() {

    const url = useRecoilValue(baseurl);
    const setLogined = useSetRecoilState(logined);

    const setuser = useSetRecoilState(userinfo);

    const nav = useNavigate();

    const [messange, setMessange] = useState("");

    function register(fromdata: any) {
        fromdata.preventDefault();

        const data = {
            email: fromdata.target.email.value,
            password: fromdata.target.password.value,
            name: fromdata.target.name.value,
            number: fromdata.target.number.value,
            pin: fromdata.target.pin.value
        }
        axios.post(url + "/auth/register", data)
            .then((res) => {
                sessionStorage.setItem("token", res.data.token);
                setuser(res.data.resp);
                setLogined(true);
                nav("/home");
            }).catch((err) => {
                setMessange(err.response.data.error);
            });

    }

    return <section className="bg-regbg bg-center bg-no-repeat h-screen ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            <div className="w-full sm:w-1/2 rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 bg-white opacity-80">
                <h1 className=" sm:p-11 p-5 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                </h1>

                <div className="w-auto space-y-6 sm:p-8">

                    <form onSubmit={register}>
                        <div className=" flex justify-around flex-col sm:flex-row"><div className="sm:w-1/2 m-9">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                            <div className="sm:w-1/2 ml-9 mr-9 sm:m-9">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" required />
                                </div>
                                <div>
                                    <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                    <input type="number" name="number" id="number" placeholder="00000000" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div>
                                    <label htmlFor="pin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create Wallet pin  </label>
                                    <input type="password" name="pin" id="pin" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>

                            </div></div>
                        <div className="flex text-sm m-2">
                            <div className=" h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                            </div>
                            <label htmlFor="terms" className="font-light text-black dark:text-gray-300">
                                I accept the
                                <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a>
                            </label>
                        </div>
                        <div className="flex flex-col">
                            <button type="submit" className=" self-center w-2/3 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-700 opacity-100">
                                Create an account
                            </button>
                            <div className="self-center">
                                {messange}
                            </div>
                        </div>

                    </form>
                </div>
                <p className="text-sm font-light mt-4 text-gray-500 dark:text-gray-400 pb-11 pl-8">
                    Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => { nav("/") }}>Login here</a>
                </p>
            </div>
        </div>
    </section>
}