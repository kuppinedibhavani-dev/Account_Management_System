import { useState } from "react";
import axios from "axios";

function SendMoney() {

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {

    const token = localStorage.getItem("token");

    try {

      await axios.post(
        "http://localhost:5000/api/account/transfer",
        {
          receiverEmail: email,
          amount: Number(amount)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Transfer Successful");

    } catch (error) {

      alert("Transfer Failed");

    }

  };

  return (
    <div>

      <h2>Send Money</h2>

      <input
        placeholder="Receiver Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleTransfer}>Send</button>

    </div>
  );
}

export default SendMoney;