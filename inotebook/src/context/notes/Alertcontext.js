import { createContext, useState } from "react";

export const Alertcontext = createContext();
export default function  UseAlert(props){
    const [alert, setAlert] = useState({msg: "This is amazing App", type: "alert-primary" })
const showAlert= (message ,type)=>{
    
setAlert({
    msg: message,
    type: type
})
}
return(
<Alertcontext.Provider value={{showAlert, alert}}>
      {props.children}
    </Alertcontext.Provider>
)
}


