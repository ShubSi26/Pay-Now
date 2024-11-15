
import { useEffect, useState } from "react";

import moment from "moment-timezone";

export default function WalletTransc(props: React.PropsWithRef<any>) {

    const [n, setN] = useState(0);

    const transc = props.trx;
    useEffect(() => {
        if (transc.length === 0 && n === 0) {
            setN(1);
            props.f();
        }
    }, [transc])

    return <div className="h-auto">
        {(transc.length === 0) ? <div className="text-center text-2xl font-bold text-gray-500">No Transactions
        </div> : <Show data={transc} />}
    </div>
}

function Show(prop: React.PropsWithRef<any>) {
    return <div className="p-3 h-full">
        <div className="hidden sm:flex justify-around w-full border-b border-gray-300">
            <div className="p-2 font-bold">Transaction ID</div>
            <div className="p-2 font-bold">Amount</div>
            <div className="p-2 font-bold">Date & Time</div>
        </div>
        <div className="h-96 overflow-y-scroll">{prop.data.map((item: any) => {
            return <Tranx data={item} />
        })}</div>
    </div>
}

function Tranx(prop: React.PropsWithRef<any>) {

    function convertUTCDateToIST(date: Date) {
        return moment(date).tz(moment.tz.guess()).format('YYYY-MM-DD hh:mm:ss A (z)');
    }


    return <div className="sm:grid sm:grid-cols-3 w-full border-b border-gray-300">
        <div className="p-2"><span className="sm:hidden">TxiD: </span>{prop.data.id}</div>
        <div className="pl-2 sm:p-2  text-green-600">+ ₹{prop.data.amount}</div>
        <div className="p-2">{convertUTCDateToIST(new Date(prop.data.date))}</div>
    </div>
}

