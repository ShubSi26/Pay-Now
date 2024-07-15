
import { useState } from "react";
import AddMoney from "./addMoney";
import WalletTransc from "./walletTransc";

export default function RightComp(prop:any){

    const [button,setButton] = useState(false);

    return <div className="bg-white  rounded-lg sm:w-2/3 m-7 min-h-full shadow-md">
            <div className="flex justify-around h-20">
                <div onClick={()=>setButton(false)} className={ ((!button)? "bg-cyan-300 rounded-lg " : " ")+ "  text-center w-full flex flex-col items-center justify-center font-semibold text-xl hover:text-2xl transition-all cursor-pointer " }>
                    <div>Wallet Credit History</div>
                </div>
                <div onClick={()=>setButton(true)} className={ ((button)? "bg-cyan-300 rounded-lg " : " ")+ "  w-full flex flex-col items-center justify-center font-semibold text-xl hover:text-2xl transition-all cursor-pointer " }>
                    <div>Add Money</div>
                </div>
            </div>
            {(!button)? <WalletTransc trx = {prop.trx} f = {prop.f}/>: <AddMoney f = {prop.f} updateuser = {prop.updateuser} toggle = {setButton}/>}

    </div>
}