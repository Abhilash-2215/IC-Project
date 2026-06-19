import { useContext } from "react";
import UserContext from "./context";
function Shiro ()
{
    const sinchan = useContext(UserContext);
    return (
        <h1>{sinchan}</h1>
    );
}
export default Shiro;