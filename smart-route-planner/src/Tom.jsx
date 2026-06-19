import {useReducer} from "react";
function Jerry(state , action)
{
    switch (action.type) {
        case "increment":
        return {
            count:state.count+1
        };
    case "decrement":
        return {
            count:state.count-1
        };
   default:
        return state;
    }
}
function Spike()
{
    const [state , dispatch]= useReducer(Jerry,{count:0} );
    return (
        <div>
            <h1>{state.count}</h1>
            <button onClick={
                ()=>dispatch(
                    {
                        type:"increment"
                    }
                )}>
                incerement
            </button>
            <button onClick={
                ()=>dispatch(
                    {
                        type:"decrement"
                    }
                )}>
                decrement
            </button>
        </div>
    );
}
export default Spike;