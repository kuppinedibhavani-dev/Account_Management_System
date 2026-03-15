import bcrypt from "bcryptjs";
import {supabase}from "../config/supabaseClient.js";
import { generateToken } from "../utils/generateToken.js";

export const signup=async(req,res)=>{
    const{name,email,password}=req.body

    const hashedPassword=await bcrypt.hash(password,10)
    const {data,error}=await supabase 
    .from("users")
    .insert([{name,email,password:hashedPassword}])
    .select()

    if(error)return res.status(400).json({error})

        res.json({
            user:data[0],
            token:generateToken(data[0].id)
        })
}
export const login=async(req,res)=>{
    const {email,password}=req.body

    const {data:user}=await supabase
    .from("users")
    .select("*")
    .eq("email",email)
    .single()

    if(!user){
        return res.status(400).json({message:"User not found"})
    }
    const validPassword=await bcrypt.compare(password,user.password)

    if(!validPassword){
        return res.status(400).json({message:"Invalid password"})
    }
    res.json({
        user,
        token:generateToken(user.id)
    })
}