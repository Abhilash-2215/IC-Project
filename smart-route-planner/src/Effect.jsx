import {useEffect} from "react";
function Data()
{
    useEffect(
        ()=>{
            console.log("Good Morning");
        },[]
    );
    return (
        <h1>Good Morning</h1>
    );
}
export default Data;
