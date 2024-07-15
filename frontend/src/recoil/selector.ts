import axios from "axios";
import { selector } from "recoil";


const userselector = selector<any>({
    key: "userdetails",
    get: async() => {
        const data = await axios.get("https://jsonplaceholder.typicode.com/users");
        return data.data;
    },
});

export default userselector;