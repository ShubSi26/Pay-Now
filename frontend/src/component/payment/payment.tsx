import { useRecoilState, useRecoilValue } from "recoil"
import { baseurl, payment, userinfo } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Payment() {

    const [paymentData, setpayment]: any = useRecoilState(payment);
    const user: any = useRecoilValue(userinfo);
    const url = useRecoilValue(baseurl);

    const navigation = useNavigate();
    const [message, setMessage] = useState("");

    function pay(thia: any) {
        thia.preventDefault();
        const data = {
            sender: user._id,
            receiver: paymentData.id,
            senderName: user.name,
            receiverName: paymentData.name,
            amount: paymentData.amount,
            pin: thia.currentTarget.pin.value,

        }

        axios.post(url + "/payment/sendmoney", data, { headers: { Authorization: sessionStorage.getItem("token") } })
            .then(() => {
                alert("Payment Successfull");
                setpayment({});
                navigation("/home");

            }).catch((err) => {
                setMessage(err.response.data.error);
            })
    }

    return <div className="w-full h-96 flex justify-center items-center border-t-4 border-blue-700 bg-sl">
        <div className="p-5 bg-slate-200 sm:w-1/3 rounded-md m-2 mt-8">
            <div className="flex flex-col ">
                <div className="text-2xl"><span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">Reciever Name :</span>{paymentData.name}</div>
                <div className="text-2xl pt-5"><span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">Amount :</span>₹ {paymentData.amount}</div>
            </div>
            <form onSubmit={pay}>
                <div className="mb-6 flex flex-col justify-center items-center">
                    <label htmlFor="large-input" className=" m-2 text-2xl font-medium text-gray-900 dark:text-white">Enter Your PIN to Confirm Payment</label>
                    <div className=" w-full p-5">
                        <input type="password" id="large-input" name="pin" className=" w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <button type="submit" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay</button>
                        <button type="button" onClick={() => { setpayment({}); navigation("/home") }} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Cancel</button>
                    </div>
                    <div>
                        <span className="text-red-500">{message}</span>
                    </div>
                </div></form>
        </div>
    </div>
}