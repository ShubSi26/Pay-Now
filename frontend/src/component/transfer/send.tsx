import { useRecoilValue, useSetRecoilState } from "recoil";
import uid from "../../assets/uid.svg";
import { baseurl, payment, userinfo } from "../../recoil/atom";
import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";

export default function Send(props:React.PropsWithChildren<any>){

    const [message,setMessage] = useState("");
    const setpayment = useSetRecoilState(payment);
    const navigate = useNavigate();

    const user:any = useRecoilValue(userinfo);
    const url = useRecoilValue(baseurl);

    function verify(form:React.FormEvent<HTMLFormElement>){
        form.preventDefault();
        const data = {
            type: form.currentTarget.type.value,
            amount: form.currentTarget.amount.value,
            receiver: form.currentTarget.receiver.value,
            _id : user._id
        }

        const h = sessionStorage.getItem("token");
        axios.post(url + `/payment/verifyDetails`,data,{headers:{Authorization:h}})
        .then((res)=>{
            const data2 = {
                id: res.data._id,
                amount: data.amount,
                receiver: res.data._id,
                name:res.data.resp
            }
            setpayment(data2);
            navigate("/payment");
        }).catch((err)=>{
            setMessage(err.response.data.error);
        })
    }

    function sendRequest(form:React.FormEvent<HTMLFormElement>){
        form.preventDefault();
        const data = {
            type: form.currentTarget.type.value,
            amount: form.currentTarget.amount.value,
            receiver: form.currentTarget.receiver.value,
            _id : user._id
        }

        const h = sessionStorage.getItem("token");
        axios.post(url + `/payment/verifyDetails`,data,{headers:{Authorization:h}})
        .then((res)=>{
            const data2 = {
                sender:user._id,
                receiver:res.data._id,
                senderName:user.name,
                receiverName:res.data.resp,
                amount:data.amount,
            }
            axios.post(url + "/payment/sendRequest",data2,{headers:{Authorization:h}})
            .then(()=>{
                setMessage("Request Sent");
            }).catch((err)=>{
                setMessage(err.response.data.error);
            })
        }).catch((err)=>{
            setMessage(err.response.data.error);
        });

    }

    return <div className="">
            <div className=" pt-8 h-full w-full bg-white rounded-lg shadow-md">
            <div>
                <form onSubmit={(props.text === "Send")? verify : sendRequest}>
                <ul className="flex justify-around flex-col sm:flex-row ">
                    <li className="m-3 sm:m-0">
                        <input type="radio" id="uid" name="type" value="uid" className="hidden peer " required />
                        <label htmlFor="uid" className="flex  justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                            <div className="w-full sm:w-60 flex justify-center">
                                <img src={uid} alt="" width={30} />
                                <div className="pl-2 text-2xl font-semibold">UID</div>
                            </div>
                        </label>
                    </li>
                    <li className="m-3 sm:m-0">
                        <input type="radio" id="email" name="type" value="email" className="hidden peer" />
                        <label htmlFor="email" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="w-full sm:w-60 flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-9">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            <div className="pl-2 text-2xl font-semibold">E-Mail</div>
                            </div>
                        </label>
                    </li>
                    <li className="m-3 sm:m-0">
                        <input type="radio" id="number" name="type" value="number" className="hidden peer" required />
                        <label htmlFor="number" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                            <div className="w-full sm:w-60 flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-9">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                                <div className="pl-2 text-2xl font-semibold">Number</div>
                            </div>
                        </label>
                    </li>
                </ul>
                <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3 flex flex-col items-center justify-center">
                        <div className="font-bold text-6xl" >₹ {user.balance}</div>
                        <div className="m-5 bg-blue-100 text-blue-800 text-2xl font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"> Account Balance</div>

                    </div>
                    <div className="sm:w-2/3">
                    <div className=" sm:m-16 m-5">
                    <label htmlFor="input-group-1" className="block mb-8 text-2xl font-medium text-gray-900 dark:text-white">Enter UID / E-Mail / Number</label>

                    <div className="relative">

                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                        <input type="text" id="input-group-1" name="receiver" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                    </div>
                    <div className=" sm:m-16 m-5">
                    <label htmlFor="input-group-1" className="block mb-8 text-2xl font-medium text-gray-900 dark:text-white">Enter Amount</label>

                    <div className="relative">

                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        </div>
                        <input type="number" id="input-group-1" name="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div>{message}</div>
                        <button type="submit" className=" text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-2xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{props.text}</button>
                    </div></div>
                </div>
                </form>
            </div>
        </div>
    </div>
}