import { useState } from 'react';
import paylogo from '../../assets/logo/Paylogo.png';
import github from '../../assets/github.png';
import {logined, userinfo} from '../../recoil/atom';
import { useRecoilValue } from 'recoil';

export default function Navtop(){

    const text = useRecoilValue(logined); 

    const username:any = useRecoilValue(userinfo);

    return <><div className='grid grid-cols-2 pl-5 pr-5 ml-10 mr-10	'>
        <div className='flex flex-row item-center sm:justify-center'><img src={paylogo} className='sm:w-24 sm:h-24 w-14 h-14' />
        <div className='flex flex-col items-center sm:text-4xl text-sm'>
            <div className='text-blue-700 pt-5 sm:text-4xl'>PAY NOW</div>
            <div className='text-blue-800 sm:text-2xl text-xs'>PAY HASSLE-FREE</div>
        </div> </div>
        <div className='flex flex-col items-center justify-center'>{(!text)? "Login/Signup":<User name = {username.name}/>}</div>
    </div>
    <div onClick={()=>window.location.href = "https://github.com/ShubSi26/Pay-Now"} className="hidden hover:-translate-x-2 hover:translate-y-2 transition-all sm:block cursor-pointer absolute top-0 right-0 z-10">
      <img src={github} width={100} alt="github" />
    </div>
    </>

}

function User(name:any ) {
    const [flag, setFlag] = useState(true);
  
    return (
      <div className="flex flex-col items-center justify-center pt-3">
        <button
          onMouseEnter={() => setFlag(!flag)} onMouseLeave={() => setFlag(!flag)} onClick={() => { sessionStorage.clear(); window.location.reload();}}
          className="w-fit border-b-4 border-blue-600 font-medium sm:text-xl  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          {(!flag)?"LogOut":name.name}
        </button>

      </div>
    );
  }