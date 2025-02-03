import {atom} from 'recoil';


export const logined = atom({
    key:"logined",
    default:false
})

export const baseurl = atom({
    key:"baseurl",
    default:""
})

export const navatom = atom({
    key:"navatom",
    default:3
})

export const userinfo = atom({
    key:"userinfo",
    default:{}
})

export const payment = atom({
    key:"payment",
    default:{}
})

export const request = atom({
    key:"request",
    default:[]
})