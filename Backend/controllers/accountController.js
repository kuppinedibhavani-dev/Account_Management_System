import { supabase } from "../config/supabaseClient.js";
export const getBalance=async (req,res)=>{
    const{data}=await supabase
    .from("users")
    .select("balance")
    .eq("id",req.user)
    .single()

    res.json(data)
}
export const transferMoney=async(req,res)=>{
    const{receiverId,amount}=req.body

    const{data:sender}=await supabase
    .from("users")
    .select("*")
    .eq("id",req.user)
    .single()

    if(sender.balance<amount){
        return res.status(400).json({message:"Insufficient balance"})
    }

    const {data:receiver}=await supabase
    .from("users")
    .select("*")
    .eq("id",receiverId)
    .single()

    if(!receiver){
        return res.status(404).json({message:"Receiver not found"})
    }
    await supabase
    .from("users")
    .update({balance:sender.balance-amount})
    .eq("id",receiver.id)

    await supabase
    .from("transactions")
    .insert([{
        type:"debit",
        sender_id:sender.id,
        receiver_id:receiver.id,
        amount
    },
    {
        type:"credit",
        sender_id:sender.id,
        receiver_id:receiver.id,
        amount
    }
])
res.json({meassage:"Transfer successful"})

}
export const getStatement=async(req,res)=>{
    const{data}=await supabase
    .from("transactions")
    .select("*")
    .or(`sender_id.eq.${req.user},receiver_id eq.${req.user}`)
    .order("created_at",{ascending:false})
    res.json(data)
}