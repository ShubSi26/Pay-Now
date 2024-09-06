import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { navatom } from "../../recoil/atom";

export default function Navcomp() {
    const [index, setIndex]: any = useRecoilState(navatom);

    const css1 = " text-white shadow-[0_2px_0px_0px_rgba(0,0,0,0.3)] duration-300 ease-linear cursor-pointer w-full grid justify-items-center border-b-4 border-blue-700 ";
    const css2 = "bg-slate-100 duration-300 ease-linear w-full flex justify-evenly border-b-0 border-t-4 border-blue-700";
    const css3 = "text-white shadow-[0_2px_0px_0px_rgba(0,0,0,0.3)] duration-300 ease-linear cursor-pointer w-full grid justify-items-center border-b-4 border-r-4 border-blue-700 rounded-br-lg";
    const css4 = "text-white shadow-[0_2px_0px_0px_rgba(0,0,0,0.3)] duration-300 ease-linear cursor-pointer w-full grid justify-items-center border-b-4 border-l-4 border-blue-700 rounded-bl-lg";

    function getcss(i: number) {
        if (index === i) return css2;
        if (i == index - 1) return css3;
        if (i == index + 1) return css4;
        return css1;
    }

    return <div className="flex w-full pt-0 sm:pt-4">
        <NavItem css={getcss(0)} id={0} setIndex={setIndex} index={index} />
        <NavItem css={getcss(1)} id={1} setIndex={setIndex} index={index} url="Transaction" text={"Transaction"} d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        <NavItem css={getcss(2)} id={2} setIndex={setIndex} index={index} url="wallet" text={"Wallet"} d={"M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"} />
        <NavItem css={getcss(3)} id={3} setIndex={setIndex} index={index} url="home" text={"Home"} d={"m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"} />
        <NavItem css={getcss(4)} id={4} setIndex={setIndex} index={index} url="transfer" text={"Transfer"} d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        <NavItem css={getcss(5)} id={5} setIndex={setIndex} index={index} url="search" text={"Search"} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        <NavItem css={getcss(6)} id={6} setIndex={setIndex} index={index} />
    </div>
}

function NavItem(props: any) {
    if (props.id === 0 || props.id == 6) return <div className={props.css}></div>

    const nav = useNavigate();

    return <div className={props.css + " flex pt-2 pl-2 pr-2"} onClick={() => { if (props.id != props.index) { props.setIndex(props.id); nav("/" + props.url) } }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-max size-10 hover:scale-125 ease-in duration-300">
            <path strokeLinecap="round" strokeLinejoin="round" d={props.d} />
        </svg>
        <div className={(props.id === props.index) ? "visible w-max pl-1 pt-1 sm:text-2xl" : "hidden"}>{props.text}</div>
    </div>
}