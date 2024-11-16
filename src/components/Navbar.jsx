import { useContext } from "react"
import { AuthContext } from "./context.js"

export default function Navbar() {
    const {auth, setAuth}=useContext(AuthContext)

    return ( 
        <nav>
           <button onClick={()=>setAuth(false)}>Выйти</button>
        </nav>
     )
}