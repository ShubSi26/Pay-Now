import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { baseurl, navatom, userinfo } from "../../recoil/atom";
import LeftComp from "./leftcomp";
import RightComp from "./rightcomp";
import { useState } from "react";
import axios from "axios";

export default function Wallet(){

    const [user, setUser] = useRecoilState<any>(userinfo);
    const url = useRecoilValue(baseurl);
    const [transc,setTransc] = useState([]);
    const set = useSetRecoilState(navatom);
    set(2);

    const f = ()=>{const id = user._id;
        const h = sessionStorage.getItem("token");
        axios.post(url + "/wallet",{id:id},{headers:{Authorization:h}})
        .then((res)=>{
            setTransc(res.data);
        }).catch((err)=>{
            console.log(err);
        });}
    
        function updateuser(){
            const id = sessionStorage.getItem("token");
            axios.post(url + "/user", {id: user._id}, {headers:{Authorization:id}})
            .then((res)=>{
                setUser(res.data.resp);
            }).catch((err)=>{
                console.log(err.response.data.error);
            })
        }

    return <div className="sm:p-10 flex h-full sm:h-screen justify-center sm:flex-row flex-col bg-sky-700">
        <LeftComp func = {f} user = {user} updateuser = {updateuser}/>
        <RightComp trx = {transc} f = {f} updateuser = {updateuser}/>
    </div>
}