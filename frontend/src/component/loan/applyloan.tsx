import { useRecoilValue } from "recoil"
import {userinfo} from "../../recoil/atom"
import { useRef, useState } from "react"

export default function Applyloan(){

    
    return (
            <div className="bg-sky-700 h-screen flex justify-center items-center w-full p-10">
                <div className="bg-white rounded-xl h-full w-full p-2 m-10 ">
                    <div className=" text-3xl font-bold text-center">
                        Loan Application
                    </div>
                    <Step1/>
                </div>
            </div>
    )
}

function Step1(){
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

    return (<>
    <div className="flex flex-row justify-center items-center">
                        <div className="flex flex-col justify-center items-end translate-y-2">
                            <div className=" border-2 border-blue-700 rounded-3xl w-fit pl-2 pr-2 text-2xl font-bold text-blue-700">
                                1
                            </div>
                            <div className="text-blue-700">Personal Detail</div>
                        </div>
                        <div>
                            <hr  className="border-2 w-96 border-blue-700"/>
                        </div>
                        <div className=" border-2 border-grey-200 rounded-3xl pl-2 pr-2 text-2xl font-bold text-gray-200">
                             2
                        </div>
                    </div>
        <div className="grid grid-cols-4 gap-4">
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

                    <div className="flex ">
                        <input type="checkbox" className="h-5 w-5 mr-4"  />
                        <div className="text-xl">
                            The information provided above is true and accurate to the best of my knowledge. If any information is found to be false, I understand that my loan application will be rejected.
                        </div>
                    </div>
                    <div className="flex">
                        <input type="checkbox" className="h-5 w-5 mr-4"  />
                        <div className="text-2xl">
                            I agree to the terms and conditions of the loan.
                        </div>
                    </div>
                    <div className="flex flex-row-reverse ">
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Next
                        </span>
                    </button>
                    </div>

    </>)
}