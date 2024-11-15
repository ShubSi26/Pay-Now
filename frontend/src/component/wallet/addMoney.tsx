import { useRecoilValue } from "recoil";
import { baseurl, userinfo } from "../../recoil/atom";
import axios from "axios";
import Razorpaylogo from "../../assets/Razorpay_logo.svg";
import { useRef } from "react";

export default function AddMoney(props: any) {
    const user: any = useRecoilValue(userinfo);
    const url = useRecoilValue(baseurl);
    const inputRef = useRef<HTMLInputElement>(null);

    function order() {
        const h = sessionStorage.getItem("token");

        if (inputRef.current) {
            const amount = inputRef.current.value;

            axios.post(url + "/payment/order", { user_id: user._id, amount }, { headers: { Authorization: h } })
                .then((res) => {
                    const options = {
                        key: res.data.key_id,
                        amount: res.data.amount,
                        currency: res.data.currency,
                        name: 'Add Money',
                        description: 'Add Money to Wallet',
                        image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg',
                        order_id: res.data.id,
                        handler: function (response: any) {
                            console.log(response);
                            axios.post(url + "/payment/verify", { _id: user._id, amount, response: response }, { headers: { Authorization: h } })
                                .then((res) => {
                                    props.f();
                                    props.updateuser();
                                    props.toggle(false);
                                    alert(res.data.message);
                                }).catch((err) => {
                                    alert(err.response.data.error);
                                });
                        },
                        prefill: {
                            name: user.name,
                            email: user.email,
                            contact: user.phone
                        },
                        theme: {
                            color: '#3399cc'
                        }
                    };
                    const rzp1 = new (window as any).Razorpay(options);
                    rzp1.open();
                }).catch((err) => {
                    console.error(err);
                    alert(err.response.data.error);
                });
        } else {
            alert("Please enter a valid amount."); // Handle the case where the input is not available
        }
    }

    return (
        <div className="w-full bg-gray-100 p-2">
            <div className="bg-white shadow-md rounded-lg p-8 w-full h-96">
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                <div className="w-full h-full flex justify-center items-center flex-col gap-5">
                    <img src={Razorpaylogo} alt="Razorpay_logo" className="w-96" />
                    <input type="text" ref={inputRef} placeholder="Enter the amount" className="rounded-xl" />
                    <button onClick={order} type="button" className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2">
                        Pay with Razorpay
                    </button>
                </div>
            </div>
        </div>
    );
}
