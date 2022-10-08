import { getUser } from "./services/authen";
import {Route,Redirect} from "react-router-dom";

const CheckLogin=({component:Component,...rest})=>(
    <Route
        {...rest}
        render = {props=>
            //ถ้า login ให้แสดง component
            getUser() ? 
            (<Component {...props}/>) : 
            (<Redirect> to={{pathname:"/",state:{from:props.location}}} </Redirect>)
        }
    />
);

export default CheckLogin;