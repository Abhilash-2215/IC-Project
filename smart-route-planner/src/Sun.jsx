import UserContext from "./context.js";
import Receive from "./receive.jsx"

function Variant()
{
    return (
        <UserContext.Provider value="Bharath">
            <Receive/>
        </UserContext.Provider>
    );
}
export default Variant;