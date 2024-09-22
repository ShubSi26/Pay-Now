import { useRecoilValue } from "recoil";
import {logined} from "../../recoil/atom";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Auth(){
    const login:boolean = useRecoilValue(logined);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!login) navigate("/");
    },[login]);
    
    return (login)? <Outlet/> : <div></div>;

}