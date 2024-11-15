
import { useRecoilValue } from "recoil";
import Leftcomp from "./leftcomp";
import Middlecomp from "./middlecomp";
import Rightcomp from "./rightcomp";
import { userinfo } from "../../recoil/atom";

export default function home() {

    const user: any = useRecoilValue(userinfo);
    const firstName = user.name.split(" ")[0];
    const date = new Date();

    return <div className="bg-sky-700">
        <div className="flex justify-between">
            <h1 className="sm:text-4xl text-2xl font-semibold p-3 text-white"> Welcome back {firstName}</h1>
            <h1 className="sm:text-4xl text-2xl text-center p-3 font-semibold text-white">{date.toDateString()}</h1>
        </div>

        <div className="h-full flex justify-around flex-col sm:flex-row">
            <Leftcomp />
            <Middlecomp />
            <Rightcomp />
        </div>
    </div>

}