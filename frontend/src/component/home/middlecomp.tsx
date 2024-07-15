import send from '../../assets/send.png';
import recive from '../../assets/recive.png';
import { useNavigate } from 'react-router-dom';

export default function Middlecomp() {

    const nav = useNavigate();

    return <div className=' sm:w-1/3 m-4 p-4 bg-white rounded-xl shadow-lg transition-all	'>

        <div onClick={() => { nav("/transfer") }} className='transition-all	 m-4 flex flex-col items-center justify-center bg-cyan-200 rounded-lg shadow-md group ransition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 cursor-pointer	'>
            <img src={send} alt="" width={100} />
            <div className='font-mono text-2xl  group-hover:block '>
                <span className="bg-purple-100 text-purple-800 text-2lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">Send Money</span>

            </div>
        </div>
        <div onClick={() => { nav("/transfer") }} className='m-4 flex flex-col items-center justify-center bg-cyan-200 rounded-lg shadow-md group ransition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 cursor-pointer	'>
            <img src={recive} alt="" width={100} />
            <div className='font-mono text-2xl  group-hover:block '>
                <span className="bg-purple-100 text-purple-800 text-2lg font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-purple-300">Request Money</span>

            </div>
        </div>
        <div>
            <span className="bg-blue-100 text-blue-800 text-2xl font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Pay Bills</span>
            <div className='flex flex-wrap justify-evenly '>
                <Service text={"Recharge"} d={"M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"}></Service>
                <Service text={"Card"} d={"M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"}></Service>
                <Service text={"Broadband"} d={"M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"}></Service>
                <Service text={"Insurance"} d={"M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"}></Service>
                <Service text={"Electricty"} d={"m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"}></Service>
                <Service text={"GiftCard"} d={"M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"}></Service>
                <Service text={"Invest"} d={"M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}></Service>
                <Service text={"Shopping"} d={"M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"}></Service>
            </div>
        </div>
    </div>
}

function Service(prop: React.PropsWithRef<{ text: string, d: string }>) {
    return <div className='w-20 m-4 flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-md hover:scale-110 hover:bg-indigo-200 duration-300 cursor-pointer rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12 ">
            <path strokeLinecap="round" strokeLinejoin="round" d={prop.d} />
        </svg>
        <span>
            {prop.text}
        </span>

    </div>
}