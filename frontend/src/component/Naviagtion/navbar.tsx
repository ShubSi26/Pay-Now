import Navcomp from './navcomponent';

function Navbar(){
    return <>
    <div className="sm:grid sm:grid-cols-3">
        <div className="border-b-4 hidden sm:block border-blue-700 shadow-[0_2px_0px_0px_rgba(0,0,0,0.3)]"></div>
        <Navcomp />
        <div className="border-b-4 hidden sm:block border-blue-700 shadow-[0_2px_0px_0px_rgba(0,0,0,0.3)]"></div>
    </div></>
}

export default Navbar;