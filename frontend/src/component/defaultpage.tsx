import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/PAY NOW.png"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { baseurl, logined, userinfo } from "../recoil/atom";
import axios from "axios";
import { useState } from "react";

let isloading : boolean;
let setloading : any;


export default function defaultpage(){

    const ar:string[] = ["bg-backg1 ","bg-backg2 ","bg-backg3 "];
    
    const random = Math.floor((Math.random() * (ar.length)) );

    const navigate = useNavigate()

    const url = useRecoilValue(baseurl);

    const setuser = useSetRecoilState(userinfo);

    const setLogined = useSetRecoilState(logined);

    const [message,setMessage] = useState("");

    function login(fromdata: any){
        setloading(false);
        fromdata.preventDefault();
        const data = {
            email:fromdata.target.email.value,
            password:fromdata.target.password.value,
        }
        axios.post(url + "/auth/login",data)
        .then((res)=>{
            sessionStorage.setItem("token", res.data.token);
            setuser(res.data.resp);
            setLogined(true);
            navigate("/home")
        }).catch((err)=>{
            setMessage(err.response.data.error);
        })
    }

    return<div className={ar[random]  + " bg-center bg-no-repeat h-fit sm:bg-stretch sm:ml-7 sm:mr-7 sm:rounded-2xl"}> 
    <div className={"flex justify-around flex-col sm:flex-row"} >
        <div className="flex flex-col justify-center">
        <div className=" bg-white opacity-80 rounded-3xl mt-2 flex flex-col w-full ">
            <img src={logo} alt="" />
        </div>
    </div>

        <div className="sm:w-1/3 flex flex-col justify-center item-center">
        <div className="h-1/6 flex items-center justify-center item-center mt-8 pb-8">
        <div className="text-white text-5xl font-bold text-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
            Create Your Account With Zero Charges
        </div>
    </div>            

<div className="w-full p-4 bg-white opacity-90 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form className="space-y-6" onSubmit={login}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
        <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
        </div>
        <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div className="flex items-start">
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree to Terms and Conditions</label>
            </div>
        </div>
        <Buton/>
        <div className="self-center">
                        {message}
                    </div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500" onClick={()=>{navigate("/register")}}>Create account</a>
        </div>
    </form>
</div>

        </div>
    </div>
    <div className="flex flex-col items-center justify-center text-center">
        <div className="shadow-lg">
            <h1 className="text-5xl font-bold text-white">
                World's Best Payment Gateway
            </h1>
        </div>
    </div>
    </div>
}

function Buton(){
     [isloading,setloading] = useState(true);

    return <button type="submit" className=" flex justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {isloading ? <span className="px-2.5 py-2.5">Login to your account</span> : 
        <svg className="h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        }
        </button>
}