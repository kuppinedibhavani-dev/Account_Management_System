import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {

  const [balance, setBalance] = useState(0);

  useEffect(() => {

    const fetchBalance = async () => {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBalance(res.data.balance);

    };

    fetchBalance();

  }, []);

  return (
    <div>

      <h2>Dashboard</h2>

      <h3>Balance: ₹{balance}</h3>

      <Link to="/send">Send Money</Link>

      <br /><br />

      <Link to="/statement">Account Statement</Link>

    </div>
  );
}

export default Dashboard;