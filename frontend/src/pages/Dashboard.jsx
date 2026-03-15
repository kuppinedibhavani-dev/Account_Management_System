import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard(){

const [balance,setBalance] = useState(0)

useEffect(()=>{
    const token = localStorage.getItem("token")

    axios.get("http://localhost:5000/api/account/balance",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then(res=>{
        setBalance(res.data.balance)
    })
},[])

return(

<div style={{padding:"40px"}}>

<h2>Account Dashboard</h2>

<div style={{
background:"white",
padding:"30px",
width:"300px",
borderRadius:"10px",
boxShadow:"0 5px 20px rgba(0,0,0,0.2)"
}}>

<h3>Current Balance</h3>

<h1 style={{color:"green"}}>₹{balance}</h1>

</div>

</div>

)

}

export default Dashboard