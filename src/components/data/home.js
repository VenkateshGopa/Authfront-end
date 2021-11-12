import axios from "axios";
import { useState , useEffect} from "react";
import { useHistory } from "react-router";
import Nav from "../Nav";
import classes from "./Home.module.css";
const Home = () => {
    const [data , setdata] = useState({});
    const his = useHistory()
    useEffect(()=>{
        const getdata = async()=>{
            try{
            const text = await axios.get(`https://auth7799.herokuapp.com/note`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('loggedin')}`
              }})
            setdata(text.data);
            }
            catch{
                his.push('/login')
            }
        }
        getdata();
    },[his]);

    const changehandler = ({ target: { value } }) =>{
        setdata(prev =>({...prev , note:value}));
    }

    const handler = async (event) =>{
        // event.preventDefault();
        try{
        await axios.post(`https://auth7799.herokuapp.com/note`,{email:data.email , note:data.note},{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('loggedin')}`
            }})
        }
        catch{
            localStorage.removeItem("loggedin");
            his.push('/login');
        }            
    }

  return (
    <>
      <Nav onsave={handler}/>
      <div className={classes.home} >
        <p className={classes.welcome}>Welcome Back {data.firstname} {data.lastname} !!</p>
        <p className={classes.quote}>Start taking your notes</p>
        <form onSubmit={handler} className={classes.form}>
          <textarea id="textfield" name="textfield" className={classes.input} onChange={changehandler} value={data.note}>
          </textarea>
          <button className={classes.button}>Save</button>
        </form>
      </div>
    </>
  );
};
export default Home;
