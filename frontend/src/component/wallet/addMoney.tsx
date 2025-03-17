import { useRecoilValue } from "recoil";
import { baseurl, userinfo } from "../../recoil/atom";
import axios from "axios";
import Razorpaylogo from "../../assets/Razorpay_logo.svg";
import Cashfree from "../../assets/cashfree.png";
import { useRef, useState } from "react";

export default function AddMoney(props: any) {
    const user: any = useRecoilValue(userinfo);
    const url = useRecoilValue(baseurl);
    const inputRef = useRef<HTMLInputElement>(null);
    const [choice,setChoice] = useState<string>("");

    function Razorpayorder() {
        const h = sessionStorage.getItem("token");

        if (inputRef.current) {
            const amount = inputRef.current.value;

            axios.post(url + "/payment/razorpayorder", { user_id: user._id, amount }, { headers: { Authorization: h } })
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
                            axios.post(url + "/payment/razorpayverify", { _id: user._id, amount, response: response }, { headers: { Authorization: h } })
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
            alert("Please enter a valid amount.");
        }
    }

    function Cashfreeorder(){
        if(inputRef.current === null){
            alert("Please enter a valid amount");
            return;
        }

        const amount = inputRef.current.value;
        const h = sessionStorage.getItem("token");
        axios.post(url + "/payment/cashfreeorder", { user_id: user._id, amount }, { headers: { Authorization: h } })
        .then((res) => {
            const options = {
                mode:"sandbox"
            };
            const cf = new (window as any).Cashfree(options);
            let checkoutOptions = {
                paymentSessionId: res.data.response.payment_session_id,
                redirectTarget: "_modal",
            };
            
            cf.checkout(checkoutOptions)
            .then((result:any) => {
                if(result.error){
                    // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
                    console.log("User has closed the popup or there is some payment error, Check for Payment Status");
                    console.log(result.error);
                }
                if(result.redirect){
                    // This will be true when the payment redirection page couldnt be opened in the same window
                    // This is an exceptional case only when the page is opened inside an inAppBrowser
                    // In this case the customer will be redirected to return url once payment is completed
                    console.log("Payment will be redirected");
                }
                if(result.paymentDetails){
                    // This will be called whenever the payment is completed irrespective of transaction status
                    console.log("Payment has been completed, Check for Payment Status");
                    axios.post(url + "/payment/cashfreeverify", { _id: user._id, amount, order_id:res.data.response.order_id  }, { headers: { Authorization: h } })
                    .then(()=>{
                        props.f();
                                    props.updateuser();
                                    props.toggle(false);
                                    alert("Payment Successful");
                    })
                }
            });

        }).catch((err) => {
            console.error(err);
            alert(err.response.data.error);
        });
    }

    function order(){
        if(choice === "Razorpay"){
            Razorpayorder();
        }else if(choice === "CashFree"){
            Cashfreeorder();
        }
    }

    return (
        <div className="w-full bg-gray-100 p-2">
            <div className="bg-white shadow-md rounded-lg p-8 h-full w-full">
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                <div className="w-full h-full flex justify-center items-center flex-col gap-5 pb-9">
                    
                    <input type="text" ref={inputRef} placeholder="Enter the amount" className="rounded-xl text-center" />
                    <h1 className="font-bold text-2xl">Chose Payment Options</h1>
                    
                </div>
                <div className="flex justify-center flex-col sm:flex-row items-center mb-4 gap-7">
                    <img src={Razorpaylogo} onClick={()=>setChoice("Razorpay")} alt="Razorpay_logo" className="w-64 hover:cursor-pointer hover:scale-110 transition-all" />
                    <img src={Cashfree} onClick={()=>setChoice("CashFree")} alt="Cashfree_logo" className="w-64 hover:cursor-pointer hover:scale-110 transition-all" />
                </div>
                <div className="flex justify-center items-center">
                    {
                        (choice === "Razorpay") && <button onClick={order} className="font-bold bg-blue-800 text-white p-2 rounded-lg">Pay with Razorpay</button> ||
                        (choice === "CashFree") && <button onClick={order} className="font-bold bg-blue-800 text-white p-2 rounded-lg">Pay with CashFree</button>
                    }
                </div>
                
                
            </div>
        </div>
    );
}
