import { useRecoilValue } from "recoil";
import { baseurl, userinfo } from "../../recoil/atom";
import axios from "axios";


export default function AddMoney(props:any){

    const user:any = useRecoilValue(userinfo);
    const url = useRecoilValue(baseurl);

    function sbmt(form:React.FormEvent<HTMLFormElement>){
        form.preventDefault();
        const data = {
            amount: form.currentTarget.amount.value,
            _id : user._id,
        }
        const h = sessionStorage.getItem("token");
        axios.post(url + "/payment/addmoney", data,{headers:{Authorization:h}})
        .then(()=>{
            props.f();
            props.updateuser();
            props.toggle(false);
            alert("Added Susscessfully");
        }).catch((err)=>{
            alert(err.response.data.error);
        })
    }

    return <div className=" w-full bg-gray-100 p-2">
      <div className=" bg-white shadow-md rounded-lg p-8 w-full">
        <div className="w-full">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <form  className="space-y-6" onSubmit={sbmt}>
            <div className="flex flex-col sm:flex-row justify-between w-full ">
            <div className="w-full sm:m-5">
                
                <div>
                <p className="mb-2">Cardholder Name</p>
                <input type="text" className="inputbox w-full p-2 border border-gray-300 rounded-md" name="name" required/>
                </div>
                <div>
                <p className="mb-2">Card Number</p>
                <input type="number" className="inputbox w-full p-2 border border-gray-300 rounded-md" name="card_number" required />
                </div>
                <div>
                <p className="mb-2">Card Type</p>
                <select className="inputbox w-full p-2 border border-gray-300 rounded-md" name="card_type" required>
                    <option value="">--Select a Card Type--</option>
                    <option value="Visa">Visa</option>
                    <option value="RuPay">RuPay</option>
                    <option value="MasterCard">MasterCard</option>
                </select>
                </div>
            </div>
            <div className="w-full sm:m-5">
                <div className="flex space-x-4">
                <div>
                    <p className="mb-2">Expiry</p>
                    <input
                    type="date"
                    className="inputbox w-full p-2 border border-gray-300 rounded-md"
                    name="exp_date"
                    required
                    />
                </div>
                
                </div>
                <div>
                    <p className="mb-2">CVV</p>
                    <input
                    type="text"
                    className="inputbox w-full p-2 border border-gray-300 rounded-md"
                    name="cvv"
                    required
                    />
                </div>
                <div>
                <p className="mb-2">Enter Amount</p>
                <input
                    type="number"
                    className="inputbox w-full p-2 border border-gray-300 rounded-md"
                    name="amount"

                />
                </div>
            </div></div>
            <button type="submit" className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay</button>
          </form>
        </div>

      </div>
    </div>
}
