import { Link } from "react-router-dom"

function Navbar(){

return(

<div style={{
background:"#1d3557",
padding:"15px",
display:"flex",
gap:"20px"
}}>

<Link to="/dashboard">Dashboard</Link>
<Link to="/send-money">Send Money</Link>
<Link to="/statement">Statement</Link>

</div>

)

}

export default Navbar