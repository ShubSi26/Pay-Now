import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { userinfo,payment, baseurl,request } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Rightcomp(){

    const user:any = useRecoilValue(userinfo);
    const [req,setRequest]:any = useRecoilState(request);
    const url = useRecoilValue(baseurl);

    const f = ()=>{
        axios.post(url + "/payment/getRequests",{_id:user._id},{headers:{Authorization:sessionStorage.getItem("token")}})
        .then((res)=>{
            setRequest(res.data.resp);
        }).catch((err)=>{
            console.log(err);
        })
    }

    return <div className="m-4 p-4 bg-white rounded-xl shadow-lg sm:w-1/3 h-auto">
        <div>
            <span className=" bg-indigo-100 text-indigo-800 text-2xl font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">Pending Request</span>
        </div>
        <div className="flex justify-center mt-3">
        <button onClick={f} type="button" className="w-fit text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </button>
        </div>
        <div className="pt-5">
        {(req.length === 0)? <div className="flex flex-col items-center justify-center text-center text-2xl font-bold text-gray-500">No Payment Request

        </div>:<Request r = {user} request = {req} fnc = {f}/>}
        </div>
        
        </div>
}

function Request(props:any){

    const paymentdata = useSetRecoilState(payment);
    const navigate = useNavigate();
    const url = useRecoilValue(baseurl);

    function remove(data:any){
        axios.post(url + "/payment/removeRequest",{_id:data._id},{headers:{Authorization:sessionStorage.getItem("token")}})
        .then(()=>{
            props.fnc();
        }).catch((err)=>{
            console.log(err);
        })
    }

    function pay(data:any){
        const data2 = {
            id: data.sender,
            amount:data.amount,
            name:data.senderName,
        }
        paymentdata(data2);
        navigate("/payment");
    }

    return <div>
        {props.request.map((data:any)=>{
            return <div className="flex justify-between items-center bg-gray-100 p-2 m-2 rounded-lg">
                <div className="">
                    <div className="text-xl font-semibold">{data.senderName}</div>
                    <div className="text-4xl font-bold text-center">₹ {data.amount}</div>
                </div>
                <div>
                    <button onClick={()=>{remove(data);pay(data)}} className="bg-green-500 text-white p-2 rounded-lg mr-2">Pay</button>
                    <button onClick={()=>remove(data)} className="bg-red-500 text-white p-2 rounded-lg">Decline</button>
                </div>
            </div>
        })}
    </div>
}