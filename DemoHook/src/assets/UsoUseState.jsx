import { useState } from "react";
export default function Demo(){
    const [nombre, setNombre] = useState("Luis");
    return(
        <div>
            <h2>{nombre}</h2>
            <button onClick={()=>setNombre("Arturo")}>
                Click me 
            </button>
        </div>
    );
}