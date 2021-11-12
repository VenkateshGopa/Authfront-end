import { useState } from "react";
import axios from 'axios';
import classes from '../Rlf.module.css';
import { useHistory ,useParams } from "react-router";
import Layout from "../Layout";
const Verification = () =>{
    const [verificationdata, setdata] = useState({});
    const [status , setstatus] =useState(null);
    const [err , seterr] =useState(null);
    const params = useParams();
    const his = useHistory();
    const changeHandler= ({ target: { name, value } }) =>{
        setdata( prev =>({...prev ,  [name]:value}))
        seterr(null);
        setstatus(null);
    }
    const verificationhandler = async (event) => {
        event.preventDefault();
        try{
            await axios.post(`https://auth7799.herokuapp.com/verification`, {code:verificationdata.code , id:params.id});
            setstatus({message:"Otp verified" ,class:"verifiedmessage"})
        }
        catch(error){
            setstatus({message:"Enter Vailid Otp", class:"errormessage"})
        }
    }
    const submithandler = async (event) => {
        event.preventDefault();
        if(verificationdata.password === verificationdata.password1){
        try{
            const {data} = await axios.post(`https://auth7799.herokuapp.com/Newpassword`, {password:verificationdata.password, id:localStorage.getItem('id')});
            alert("Password changed successfully")
            his.push('/login');
            console.log(data)
        }
        catch (error){
            seterr("something went wrong")
        }
        }
        else{
            seterr("Passwords not matched")   
        }
    }
    return(
        <Layout className={classes.form}>
        <p className={classes.heading}> Change Password </p>
        <form onSubmit={submithandler}>
            <p className={classes.label}> OTP - One Time Password </p>
            <input type='text' className='form-control mb-3' onChange={changeHandler} name='code' placeholder='otp'onBlur={verificationhandler}/>
            {status && <p className={classes[status.class]}>{status.message}</p>}
            <p className={classes.label}> New Password</p>
            <input type='password' className='form-control mb-3' onChange={changeHandler} name='password' placeholder='New password' autoComplete="new-password"/>
            <p className={classes.label}> Conform New Password</p>
            <input type='password' className='form-control mb-3' onChange={changeHandler} name='password1' placeholder='New Conform password'  autoComplete="new-password"/>
            {err && <p className={classes.errormessage}>{err}</p>}
            <button className='btn btn-primary form-control mb-4' >Change Password</button>
        </form>
        </Layout>
    );
}

export default Verification;