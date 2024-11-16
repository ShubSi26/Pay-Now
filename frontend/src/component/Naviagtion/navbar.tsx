import Navcomp from './navcomponent';
import logo from '../../assets/logo/Paylogo.png';
import { useRecoilValue } from 'recoil';
import {userinfo} from '../../recoil/atom'

function Navbar() {
    const user:any = useRecoilValue(userinfo);
    return (
        <div className="sticky z-50 right-0 bottom-0 bg-white sm:left-0 sm:top-0 flex flex-col sm:h-screen overflow-hidden w-full sm:w-16 sm:hover:w-60 transition-all duration-300 ease-in-out shadow-[4px_0_10px_rgba(0,0,0,0.3)]">
            <div className="sm:flex hidden ">
                <img src={logo} alt="logo" className="h-16 w-16 bg-white rounded-sm shadow-lg" />
                <div className="text-3xl font-bold text-cyan-900 flex items-center justify-center"><p>PayNow</p></div>
            </div>
            <Navcomp />
            <div className='h-full hidden sm:flex items-end'>
                <div className='flex'>
                    <svg className='size-10 text-sky-800 ml-2' xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path></svg> 
                    <div className='text-xl font-bold pt-1 w-40 pl-4'>{user.name.split(" ")[0]}</div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
