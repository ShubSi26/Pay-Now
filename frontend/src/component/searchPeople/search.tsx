import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { baseurl, payment } from "../../recoil/atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function SearchPeople() {
    const [searchresult, setSearchresult] = useState([]);
    const url = useRecoilValue(baseurl);

    let s: NodeJS.Timeout;
    function getSearchResult(event: any) {
        event.preventDefault();
        clearInterval(s);
        const key = (document.getElementById('aad') as HTMLSelectElement).value;
        const type = (document.getElementById('type') as HTMLSelectElement).value;
        const h = sessionStorage.getItem("token");

        if(key === "" || key === null || key === undefined || key === " "){ 
            setSearchresult([]);
            return;}

        s = setTimeout(() => {
            axios.post(url + "/search", { key:key, type:type }, { headers: { Authorization: h } })
                .then(response => {
                    setSearchresult(response.data.resp);
                })
                .catch(error => {
                    setSearchresult([]);
                    console.error("There was an error searching!", error);
                });
        }, 1000);
    }

    return (
        <div className="min-h-screen h-auto bg-slate-100">
            <h1 className="p-8 font-bold text-4xl">Search People</h1>
            <div className="mb-5">
                <form className="max-w-lg mx-auto">
                    <div className="flex">
                        <select id="type" name="type" onChange={getSearchResult} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="name">Name</option>
                            <option value="number">Number</option>
                        </select>
                        <div className="relative w-full">
                            <input type="search" id="aad" name="key" onChange={getSearchResult} className="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" required />
                            <button onClick={getSearchResult} className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex justify-center">
                {(searchresult.length === 0) ? <div className="text-center text-2xl p-8">No Results Found</div> :<Condition results={searchresult} />}
            </div>
        </div>
    );
}

function Condition(props:any) {

    useEffect(() => {setFlag(true)}, [props.results]);

    const[flag, setFlag] = useState(true);
    const [value, setValue] = useState({});
    return ((flag)?<SearchResults results={props.results} value = {setValue} flag = {setFlag}/>:<Paym value = {value}/>)
}

function Paym(props:any) {
    
    const setvalue = useSetRecoilState(payment);
    const nav = useNavigate();

    function pay(){
        const data = {
            id:props.value._id,
            name:props.value.name,
            amount:(document.getElementById('ggu') as HTMLInputElement).value
        }
        setvalue(data);
        nav("/payment");
    }

    return <div className="sm:w-1/3 flex flex-col justify-center items-center bg-white p-5 shadow-md">
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl">
            Send money to {props.value.name}
            </div>
            <div className="flex text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 text-black">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <div className="ml-2">
                    {props.value.number}
                    </div>
                </div>
        </div>
        <div className="text-2xl flex">
            Amount: 
            <div className="mb-6">
                <input type="text" id="ggu" className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                <button onClick={pay} type="button" className="mt-4 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Send Money</button>
            </div>
        </div>

    </div>
}

function SearchResults(props:any) {

    function pay(item:any) {
        props.value(item);
        props.flag(false);
    }
    
    return <div className="text-2xl bg-white sm:w-2/3 rounded-md p-5 shadow-md">
            {props.results.map((item:any) => {
                return <div className="grid grid-cols-2 rounded-md border-b-2  hover:bg-blue-400 border-blue-300 group/item">
                        <div className="flex flex-col m-5 group/item ">
                            <div>
                                {item.name}
                            </div>
                            <div className="flex text-slate-400 group-hover/item:text-white hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="sm:size-8 size-5 text-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                                <div className="ml-2 text-base sm:text-xl">
                                {item.number}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <button onClick={()=>pay(item)} type="button" className="w-fit h-fit text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Send Money</button>
                        </div>

                    </div>
            })}
        </div>
    
}

