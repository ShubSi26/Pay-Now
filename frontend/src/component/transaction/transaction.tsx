import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil";
import { baseurl, userinfo } from "../../recoil/atom";
import axios from "axios";
import moment from "moment-timezone";

export default function Transaction(){

    const [transc,setTransc]:any = useState([]);
    const url = useRecoilValue(baseurl);
    const user:any = useRecoilValue(userinfo);

    const f = ()=>{
        if(transc.length === 0){
            const h = sessionStorage.getItem("token");
        axios.post(url + "/transaction/get", { _id:user._id }, { headers: { Authorization: h } })
        .then((res)=>{
            setTransc(res.data.resp);
        }).catch((err)=>{
            console.log(err.response.data.error);
        })}}
    
   useEffect(f,[]);

    return <div className="bg-sky-700 min-h-screen w-full overflow-auto">
        <h1 className="font-semibold text-4xl p-5 pl-10 text-white">Transaction History</h1>
        <div className="flex justify-center w-full">
            {(transc.length === 0) ? <div className="text-center text-2xl">No Transactions Yet</div> : <TransactionHistory transc = {transc}/>}
        </div>
    </div>
}

function TransactionHistory(props:any){

    const user:any = useRecoilValue(userinfo);

    function convertUTCDateToIST(date: Date) {
        return moment(date).tz(moment.tz.guess()).format('YYYY-MM-DD hh:mm:ss A (z)');
    }

    return <div className="bg-white w-full m-2 sm:m-10 rounded-md shadow-md sm:p-5">
        <div className="hidden sm:grid grid-cols-4 gap-4 text-2xl font-semibold border-b-2 border-gray-300">
            <div className="w-fit">Transaction ID</div>
            <div>Sender & Receiver</div>
            <div>Amount</div>
            <div>Date & Time</div>
        </div>
            {props.transc.map((item:any)=>{
                return <div className="sm:grid grid-cols-4 gap-4 rounded-sm hover:bg-slate-100 p-5 border-b-2 border-gray-300 w-full">
                    <div className="w-fit bg-blue-100 text-blue-800 text-2xl font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        <span className="relative sm:hidden">TxID:</span>{item.id}
                    </div>
                    <div className="flex text-xl">
                        {(item.sender === user._id)?"You" : item.senderName}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 ml-2 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                        {(item.receiver === user._id)?"You" : item.receiverName}
                    </div>
                    <div className={((item.sender === user._id)?"text-red-700":"text-green-700") + " text-xl"}>
                        {(item.sender === user._id)?"-":"+"} ₹ {item.amount}
                    </div>
                    <div className="text-xl font-medium">
                        <div className="block sm:hidden">Date & Time-</div>
                        {convertUTCDateToIST(item.date)}
                    </div>
                </div>
            })}
    </div>
}