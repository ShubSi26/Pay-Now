import { useRecoilValue } from "recoil";
import {logined} from "../../recoil/atom";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

export default function Auth(Props:React.PropsWithChildren){
    const login:boolean = useRecoilValue(logined);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!login) navigate("/");
    },[login]);
    
    return (login)?Props.children : <div></div>;

}