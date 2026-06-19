import {useRef} from "react";
function Refer()
{
    const inputref = useRef();
    const uber = ()=>{
        inputref.current.focus();
    };
    return (
        <div><label/>Name:
            <input ref={inputref} type="text"/>
            <button onClick={uber}>Submit</button>
        </div>
    );
}
export default Refer;