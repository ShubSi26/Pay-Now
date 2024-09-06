import { useState } from 'react';
import {logined, userinfo} from '../../recoil/atom';
import { useRecoilValue } from 'recoil';

import paylogo from '../../assets/Mainlogo.png';
import github from '../../assets/github.png';
import { useLocation } from 'react-router-dom';


export default function Navtop(){

    const text = useRecoilValue(logined); 

    const location = useLocation();

    const username:any = useRecoilValue(userinfo);

    return <><div className={'flex flex-row justify-center ' + ((location.pathname !== "/")? "sm:absolute sm:top-0 sm:left-0 sm:z-20 block" : " ")}>
      <div className='flex flex-row justify-between w-full'>
          <div className='flex flex-row sm:justify-center'>
            <img src={paylogo} className='h-12 ml-14 bg-white rounded-sm shadow-lg' />
          </div>
          <div className='flex flex-col items-center justify-center mr-10 ml-10'>
            {(!text)? "Login/Signup":<User name = {username.name}/>}
          </div>
        </div>
    </div>
    <div onClick={()=>window.location.href = "https://github.com/ShubSi26/Pay-Now"} className="hidden hover:-translate-x-2 hover:translate-y-2 transition-all sm:block cursor-pointer absolute top-0 right-0 z-10">
      <img src={github} width={60} alt="github" />
    </div>
    </>

}

function User(name:any ) {
    const [flag, setFlag] = useState(true);
  
    return (
      <div className="flex flex-col items-center justify-center pt-3 text-white">
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