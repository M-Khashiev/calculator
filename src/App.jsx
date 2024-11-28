import { useEffect, useReducer } from "react";
import {store} from "./components/store.js";

export default function App() {
  const [,forceUpdate]=useReducer(x=>x+1,0)


  useEffect(() =>{
   const unsubscribe=store.subscribe(()=>{
     forceUpdate()
   })
   return unsubscribe;
  },[])
  return (
    <>
    counter{store.getState().counter}
      <button onClick={()=>store.dispatch({type:"increment"})}>increment</button>
      <button onClick={()=>store.dispatch({type:"decrement"})}>decrement</button>
    </>
  );
}
