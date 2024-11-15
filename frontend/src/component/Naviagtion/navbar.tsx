import Navcomp from './navcomponent';
import logo from '../../assets/logo/Paylogo.png';

function Navbar() {
    return (
        <div className="sticky left-0 top-0 flex flex-col h-screen overflow-hidden w-16 hover:w-60 transition-all duration-300 ease-in-out shadow-[4px_0_10px_rgba(0,0,0,0.3)] z-0">
            <div className="flex">
                <img src={logo} alt="logo" className="h-16 w-16 bg-white rounded-sm shadow-lg" />
                <div className="text-3xl font-bold text-cyan-900 flex items-center justify-center"><p>PayNow</p></div>
            </div>
            <Navcomp />
        </div>
    );
}

export default Navbar;
