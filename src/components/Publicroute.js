import { Redirect } from "react-router";

const Publicroute = (props) =>{
    const token = localStorage.getItem('loggedin');
    if(token){
        return <Redirect to='/login'/>
    }
    else{
        return props.children
    }
}
export default Publicroute;