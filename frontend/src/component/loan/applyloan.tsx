import { useRecoilValue } from "recoil"
import {userinfo,baseurl} from "../../recoil/atom"
import { useEffect, useRef, useState } from "react"
import {Slider,Spinner} from "@nextui-org/react";
import numWords from "num-words";
import axios from "axios";

export default function Applyloan(){

    const[step,setstep] = useState<Number>(1);
    const[amount,setamonut] = useState<number>(1000);
    const[duration,setduration] = useState<number>(1);
    const[loanpurpose,setloanpurpose] = useState<String>("");
    const[anualincome,setanualincome] = useState<Number>(0);
    
    return (
            <div className="bg-sky-700 h-full sm:h-screen flex justify-center items-center w-full p-1 sm:p-10">
                <div className="bg-white rounded-xl h-full w-full p-2 m-2 sm:m-10 ">
                    <div className=" text-3xl font-bold text-center">
                        Loan Application
                    </div>
                    {step === 1 ?<Step1 setstate = {setstep}/>:
                    step === 2 ? <Step2 setstate = {setstep} amount={amount} setamonut={setamonut} duration={duration} setduration={setduration} setloanpurpose={setloanpurpose} setanualincome={setanualincome}/>:
                    step === 3 ? <Step3 amount={amount} duration={duration} loanpurpose={loanpurpose} anualincome={anualincome}/>: ""}
                </div>
            </div>
    )
}

function Step1(props:any){
    const user:any = useRecoilValue(userinfo);
    const dob = useRef<HTMLInputElement>(null);
    const [panflag,setpanflag] = useState<Boolean>(false);   
    const credits = useRef<HTMLInputElement>(null);

    console.log(user);
    
    const [dobflag,setdobflag] = useState<Number>(0);
    const [creditflag,setcreditflag] = useState<Number>(0);

    function dobcheck(){
        const value = dob.current?.value as string;
        const dobDate = new Date(value);
        const today = new Date();
        console.log(value);
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDifference = today.getMonth() - dobDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        if (age >= 21) {
            setdobflag(1);
        } else {
            setdobflag(-1)
        }

    }

    function creditcheck(){
        const value = Number(credits.current?.value as unknown);

        if(value < 450){
            setcreditflag(-1);
        }else{
            setcreditflag(1);
        }
        
    }

    return (<div className="h-full">
    <div className="flex flex-row justify-center items-center">
                        <div className="flex flex-col justify-center items-end translate-y-2">
                            <div className=" border-2 border-blue-700 rounded-3xl w-fit pl-2 pr-2 text-2xl font-bold text-blue-700">
                                1
                            </div>
                            <div className="text-blue-700">Personal Detail</div>
                        </div>
                        <div>
                            <hr  className="border-2 w-10 sm:w-96 border-blue-700"/>
                        </div>
                        <div className=" border-2 border-grey-200 rounded-3xl pl-2 pr-2 text-2xl font-bold text-gray-200">
                             2
                        </div>
                    </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="col-span-2 text-xl font-semibold p-2">
                            <div className="text-sky-900">Name: </div>
                            <div className="border-2 rounded-md p-2 flex justify-between">
                                {user.name}                            
                                <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="green"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M9 12l2 2l4 -4"></path> </svg> 
                            </div>
                        </div>
                        <div className="col-span-2 text-xl font-semibold p-2">
                            <div className="text-sky-900">Email: </div>
                            <div className="border-2 rounded-md p-2 flex justify-between">
                                {user.email}
                                <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="green"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M9 12l2 2l4 -4"></path> </svg> 
                            </div>
                        </div>
                        <div className="col-span-2 text-xl font-semibold p-2">
                            <div className="text-sky-900">Number: </div>
                            <div className="border-2 rounded-md p-2 flex justify-between">
                                {user.number}
                                <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="green"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M9 12l2 2l4 -4"></path> </svg> 
                            </div>
                        </div>
                        <div className="col-span-2 text-xl font-semibold p-2">
                            <div className="text-sky-900">UID: </div>
                            <div className="border-2 rounded-md p-2 flex justify-between">
                                {user.uid}
                                <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="green"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M9 12l2 2l4 -4"></path> </svg> 
                            </div>
                        </div>
                        <div className="col-span-2 text-xl font-semibold p-2">
                            <div className="text-sky-900">Date of Birth: </div>
                            <div className="border-2 rounded-md p-2 flex justify-between">
                                <input ref={dob} onChange={dobcheck}  type="date" alt='date' className="h-7 rounded-xl border-none text-sky-800 cursor-pointer" />
                                {(dobflag == 1)? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M9 12l2 2l4 -4"></path> </svg> :
                                (dobflag == -1)?<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="red"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M10 10l4 4m0 -4l-4 4"></path> <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path> </svg>:""
                                } 
                            </div>
                        </div>
                        <div className="col-span-2 text-xl font-semibold p-2 text-left w-full">
                            <div >
                            Applicants must be over 21 years of age to proceed with the loan request.
                            </div>
                        </div>
                        <div className="col-span-2 text-xl font-semibold p-2">
                            <div className="text-sky-900">PAN Number: </div>
                            <div className="border-2 rounded-md p-2 flex justify-between">
                                <input onChange={e=>{if(e.target.value) setpanflag(true)}} type="text" alt='PanNumber' className="w-full h-7 rounded-s border-none text-sky-800 cursor-pointer" />
                                {(panflag)? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M9 12l2 2l4 -4"></path> </svg> :""
                                } 
                            </div>
                        </div>
                        <div className="col-span-2 text-xl font-semibold p-2">
                            <div className="text-sky-900">Credit Score:  </div>
                            <div className="border-2 rounded-md p-2 flex justify-between">
                                <input onChange={creditcheck} ref={credits} type="number" alt='creditScore' className="w-full h-7 rounded-s border-none text-sky-800 cursor-pointer" />
                                {(creditflag == 1)? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M9 12l2 2l4 -4"></path> </svg> :
                                (creditflag == -1)?<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="red"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M10 10l4 4m0 -4l-4 4"></path> <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path> </svg>:""
                                } 
                            </div>
                            <div>
                                {creditflag == -1 && "Credit Score must be above 450 to proceed with the loan request."}
                            </div>
                        </div>
                    </div>

                    <div className="flex h-fit">
                        <input type="checkbox" className="h-5 w-5 mr-4"  />
                        <div className="text-xl">
                            The information provided above is true and accurate to the best of my knowledge. If any information is found to be false, I understand that my loan application will be rejected.
                        </div>
                    </div>
                    <div className="flex h-fit">
                        <input type="checkbox" className="h-5 w-5 mr-4"  />
                        <div className="text-2xl">
                            I agree to the terms and conditions of the loan.
                        </div>
                    </div>
                    <div className="flex flex-row-reverse h-fit">
                    <button onClick={()=>props.setstate(2)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Next
                        </span>
                    </button>
                    </div>

    </div>)
}

function Step2(props:any){
    const amount = props.amount
    const setamonut = props.setamonut
    const duration = props.duration
    const setduration = props.setduration
    const setloanpurpose = props.setloanpurpose
    function EMICalculator(){
        const r = 0.08/12;
        const n = duration*12;
        const emi = (amount*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
        return Math.round(emi);
    }
    function calculateTotalAmount() {
        const emi = EMICalculator();
        const totalMonths = duration * 12;
        return emi * totalMonths;
    }
    return(<>
        <div className="flex flex-row justify-center items-center">
            <div className="flex flex-col justify-center items-end translate-y-2">
                            <div className=" border-2 border-blue-700 rounded-3xl w-fit p-2 text-2xl font-bold text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M9 12l2 2l4 -4"></path> </svg>  
                            </div>
                            <div className="text-blue-700">Personal Detail</div>
                        </div>
                        <div>
                            <hr  className="border-2 w-10 sm:w-96 border-blue-700"/>
                        </div>
                        <div className="flex flex-col justify-center items-start translate-y-2">
                            <div className=" border-2 border-blue-700 rounded-3xl w-fit pl-2 pr-2 text-2xl font-bold text-blue-700">
                                2
                            </div>
                            <div className="text-blue-700">Loan Detail</div>
                        </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="col-span-2 text-xl font-semibold p-2">
                <div className="text-sky-900">Annual Income: </div>
                    <div className="border-2 rounded-md p-2 flex justify-between">
                        <input onChange={e=> props.setanualincome(e.target.value)} type="number" alt='PanNumber' className="w-full h-7 rounded-s border-none text-sky-800 cursor-pointer" />
                        {<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M9 12l2 2l4 -4"></path> </svg> } 
                    </div>
            </div>
            <div className="col-span-2 text-xl font-semibold p-2">
                <div className="text-sky-900">Loan Purpose: </div>
                    <div className="border-2 rounded-md p-2 flex justify-between">
                        <input onChange={e=>setloanpurpose(e.target.value)} type="text" alt='PanNumber' className="w-full h-7 rounded-s border-none text-sky-800 cursor-pointer" />
                        {<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M9 12l2 2l4 -4"></path> </svg> } 
                    </div>
            </div>
            <div className="col-span-2 text-xl font-semibold p-2">
                <div className="text-sky-900">Loan Amount: </div>
                    <div className="border-2 rounded-md p-2 flex justify-between">
                        <input value={amount} onChange={e=>setamonut(Number(e.target.value))} type="number" alt='PanNumber' className="w-full h-7 rounded-s border-none text-sky-800 cursor-pointer" />
                        {<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M9 12l2 2l4 -4"></path> </svg> } 
                    </div>
            </div>
            <div className="col-span-2 text-xl font-semibold p-2">
                <div className="text-sky-900">Loan Duration: </div>
                    <div className="border-2 rounded-md p-2 flex justify-between">
                        <input value={duration} onChange={e=>{setduration(Number(e.target.value))}} type="number" alt='PanNumber' className="w-full h-7 rounded-s border-none text-sky-800 cursor-pointer" />
                        {<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="green"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M9 12l2 2l4 -4"></path> </svg> } 
                    </div>
            </div>
            <div className="col-span-2 text-xl font-semibold p-2">
                <Slider 
                    label="Loan Amount" 
                    showTooltip={true}
                    formatOptions={{style: 'currency', currency: 'INR'}}
                    tooltipValueFormatOptions={{style: 'currency', currency: 'INR'}}
                    defaultValue={amount}
                    value={amount}
                    onChange={(value:any) => setamonut(value)}
                    className="w-full"
                    maxValue={1000000}
                    />
            </div> 
            <div className="col-span-2 text-xl font-semibold p-2">
                <Slider   
                    size="sm"
                    step={0.5}
                    color="primary"
                    label="Duration: Years"
                    showSteps={true} 
                    maxValue={10} 
                    value={duration}
                    onChange={(value:any) => setduration(value)}
                    minValue={0} 
                    defaultValue={0.2}
                    className="w-full " 
                />
            </div>  
            <div className="col-span-2 text-xl font-semibold p-2 ">
                <div  className="flex flex-row">
                    <div className="text-gray-500">Monthly EMI : </div>
                    <div className=""> INR {EMICalculator() | 0}</div>
                </div>
                <div className="flex flex-row">
                    <div className="text-gray-500">Intrest Rate : </div>
                    <div className=""> 8%</div>
                </div>
                <div className="flex flex-row">
                    <div className="text-gray-500">Total Intrest To Pay : </div>
                    <div className=""> {(calculateTotalAmount() - amount) | 0}</div>
                </div>
                
            </div>
            <div className="col-span-2 text-xl font-semibold p-2 ">
                <div className="text-sky-800">Total Amount To Pay:</div>
                <div className="border-2 rounded-md p-2 flex">
                <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={30} height={24}  strokeWidth={2}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M15 8h-6h1a3 3 0 0 1 0 6h-1l3 3"></path> <path d="M9 11h6"></path> </svg> 
                    {calculateTotalAmount() | 0}</div>
                    <div>
                        {numWords(calculateTotalAmount() | 0)}
                    </div>

            </div>
        </div>
        <div className="flex">
            <input type="checkbox" className="h-5 w-5 mr-4"  />
                <div className="text-2xl">
                    I agree to the terms and conditions of the loan.
                </div>
        </div>
        <div className="flex">
            <input type="checkbox" className="h-5 w-5 mr-4"  />
                <div className="text-2xl">
                I understand that late payments may incur additional fees or penalties as specified in the loan agreement.
                </div>
        </div>
        <div className="flex flex-row justify-between ">
            <button onClick={()=> props.setstate(1)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Previous
                </span>
            </button>
            <button onClick={()=> props.setstate(3)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Apply
                </span>
            </button>
        </div>
        
    </>)
}
function Step3(props:any){
    const user:any = useRecoilValue(userinfo);
    const url = useRecoilValue(baseurl)
    const amount = props.amount
    const duration = props.duration
    const loanpurpose = props.loanpurpose
    const anualincome = props.anualincome
    const [flag,setflag] = useState<Boolean>(false)
    function EMICalculator(){
        const r = 0.08/12;
        const n = duration*12;
        const emi = (amount*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
        return Math.round(emi);
    }
    function calculateTotalAmount() {
        const emi = EMICalculator();
        const totalMonths = duration * 12;
        return emi * totalMonths;
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            const data = {
                amount: props.amount,
                duration: props.duration,
                loanpurpose: props.loanpurpose,
                anualincome: props.anualincome
            };
            const h = sessionStorage.getItem("token");
            axios.post(url + "/loan", data, { headers: { Authorization: h } })
                .then(() => {
                    setflag(true);
                })
                .catch(() => {
                    // Handle error
                });
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (<div className="h-full">
        <div className="w-full text-center text-xl font-bold">Application Filled</div>
        <div className="flex flex-col justify-center items-center text-left text-xl font-bold border-2 rounded-xl mt-4 p-2">
            <div className="grid sm:grid-cols-2 gap-4 row-span-2 ">
                <div>Name: {user.name}</div>
                <div>Email: {user.email}</div>
                <div>Number: {user.number}</div>
                <div>UID: {user.uid}</div>
                <div>Amount: {amount}</div>
                <div>Duration: {duration} years</div>
                <div>Loan Purpose: {loanpurpose}</div>
                <div>Annual Income: {anualincome}</div>
                <div>Monthly EMI: {EMICalculator()}</div>
                <div>Total Amount to pay: {calculateTotalAmount()}</div>
                <div>Interest Rate: 8%</div>
                <div>Rs. {numWords(calculateTotalAmount() | 0)}</div>
            </div>
        </div>
        <div className="mt-5 flex justify-center items-center ">
        {!flag ?<Spinner size="lg" /> : <div className="flex flex-col justify-center items-center text-lime-600">
            <svg className="w-96 h-56 text-lime-600" xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={24} height={40}  strokeWidth={2}> <path d="M5 12l5 5l10 -10"></path> </svg> 
            <span className="font-bold text-xl">Loan Approved Successfuly</span>
            <span className="text-sky-900">Amoutn will credit to your wallet shortly</span>
            </div>}
        </div>
    </div>)
}