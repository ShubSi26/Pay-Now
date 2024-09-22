import { useState } from 'react';
import {logined, userinfo} from '../../recoil/atom';
import { useRecoilValue } from 'recoil';

import paylogo from '../../assets/Mainlogo.png';

import { useLocation, useNavigate } from 'react-router-dom';


export default function Navtop(){

    const text = useRecoilValue(logined); 

    const location = useLocation();

    const username:any = useRecoilValue(userinfo);

    const navigate = useNavigate();

    return <><div className={'flex flex-row justify-center ' + ((location.pathname !== "/")? "sm:absolute sm:top-0 sm:left-0 sm:z-20 block" : " ")}>
      <div className='flex flex-row justify-between w-full'>
          <div className='flex flex-row sm:justify-center'>
            <img src={paylogo} className='h-12 ml-14 bg-white rounded-sm shadow-lg' />
          </div>
          <div className='flex justify-center items-center mr-10 ml-10'>
            {(!text)? <button onClick={()=>navigate("/register")} type="button" className=" text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 ">Signup</button>:<User name = {username.name}/>}
          </div>
        </div>
    </div>
    </>

}

function User(name:any ) {
    const [flag, setFlag] = useState(true);
  
    return (
      <div className="flex flex-col items-center justify-center pt-3 text-blue-800">
        <button
          onMouseEnter={() => setFlag(!flag)} onMouseLeave={() => setFlag(!flag)} onClick={() => { sessionStorage.clear(); window.location.reload();}}
          className="w-fit border-b-4 border-blue-600 font-medium sm:text-xl  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          {(!flag)?"LogOut":name.name.split(" ")[0]}
        </button>

      </div>
    );
  }