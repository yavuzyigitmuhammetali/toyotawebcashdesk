import axios from "axios";

export function getStatus(){
    return  axios.get("api/v1/getstatus");
}