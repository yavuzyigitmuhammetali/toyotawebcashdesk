import axios from "axios";

export function getStatus(){
    return  axios.get("/api/v1/getstatus");
}

export function testLogin(){
    return  axios.get("/api/v1/test");
}