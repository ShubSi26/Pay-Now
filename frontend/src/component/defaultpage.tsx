import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { baseurl, logined, userinfo } from "../recoil/atom";
import axios from "axios";
import { useEffect, useState } from "react";
import Navtop from './Naviagtion/navtop';

import ph1 from "../assets/ph1.png"
import ph2 from "../assets/ph2.png"
import ph3 from "../assets/ph3.png"
import './styles.css';
import Footr from "./footr/footr.tsx"



export default function defaultpage(){
    return<div className={"bg-bg1 bg-center bg-no-repeat sm:bg-stretch h-full  "}>
      <Navtop/> 
    <div className={"flex justify-around flex-col-reverse sm:flex-row bg-gradient-to-t from-white/5 "} >
        <div className="sm:w-1/3 flex flex-col justify-center item-center m-4 sm:border-0 bg-cyan-900 border-2 sm:bg-transparent border-slate-300 rounded-2xl">
            <div className="h-1/6 flex items-center justify-center item-center mt-8 pb-8">
                <div className="text-white text-5xl font-bold text-center p-4  rounded-lg shadow-lg">
                    Create Your Account Without Incurring Any Charges!
                </div>
            </div>            
        <LoginBox/>

        </div>
        <div className="flex flex-col justify-center max-w-fit ">
            <RightBox/>
        </div>

    </div>
    <Footr/>
    </div>
}

function LoginBox(){

    const navigate = useNavigate()

    const url = useRecoilValue(baseurl);

    const setuser = useSetRecoilState(userinfo);

    const setLogined = useSetRecoilState(logined);

    const [message,setMessage] = useState("");

    const [isloading,setloading] = useState(true);

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
            setloading(true);
        })
    }
    
    return <div className="w-full p-4 bg-white opacity-90 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ">
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
        <Buton isloading = {isloading}/>
        <div className="self-center">
                        {message}
                    </div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500" onClick={()=>{navigate("/register")}}>Create account</a>
        </div>
    </form>
</div>
}

function Buton({isloading}: {isloading: boolean}){
     

    return <button type="submit" className=" flex justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {isloading ? <span className="px-2.5 py-2.5">Login to your account</span> : 
        <svg className="h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
        }
        </button>
}


function RightBox() {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Loop through 3 boxes
      }, 2000);
  
      return () => clearInterval(interval); // Cleanup on component unmount
    }, []);
  
    return (
      <div className="container flex justify-center items-center sm:h-screen h-64 relative">
        <div className="flex justify-center items-center w-full h-full relative">
          {/* Box 1 */}
          <div
            className={`box text-white flex justify-center items-center w-36 h-36 transition-all duration-1000
            ${currentIndex === 0
              ? 'z-10 absolute top-1/2 left-1/2  translate-x-3/4 sm:-translate-x-2/3 -translate-y-1/2 scale-200 sm:h-80 sm:w-80 scale-150'
              : 'absolute translate-x-4 top-1/3 blur-sm opacity-70 scale-75 ' }`}
          >
            <img src={ph1} alt="" />
          </div>
  
          {/* Box 2 */}
          <div
            className={`box text-white flex justify-center items-center w-36 h-36 transition-all duration-1000
            ${currentIndex === 1
              ? 'z-20 absolute top-1/2 left-1/2  translate-x-3/4 sm:-translate-x-2/3 -translate-y-1/2 scale-200 sm:h-80 sm:w-80 scale-150'
              : 'absolute translate-x-4 top-1/3 blur-sm opacity-70 scale-75 '}`} 
          >
            <img src={ph2} alt="" />
          </div>
  
          {/* Box 3 */}
          <div
            className={`box text-white flex justify-center items-center w-36 h-36 transition-all duration-1000
            ${currentIndex === 2
              ? 'z-20 absolute top-1/2 left-1/2 translate-x-3/4 sm:-translate-x-2/3 -translate-y-1/2 sm:h-80 sm:w-80 scale-150'
              : 'absolute translate-x-4 top-1/3 blur-sm opacity-70 scale-75 '}`} 
          >
            <img src={ph3} alt="" />
          </div>
        </div>
      </div>
    );
  }
