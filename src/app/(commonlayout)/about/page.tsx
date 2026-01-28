
"use client";
import { getBLogs } from "@/services/blog.action";
import { blogsservice } from "@/services/blog.service";
import { get } from "http";
import { useEffect, useState } from "react";

export default  function AboutPage(){
    const [data,setData] =useState(null);
    console.log(data)
    useEffect(()=>{
(async ()=>{
    const {data} = await getBLogs()
    setData(data);
})()
    },[])
    
    return (
        <div>
            About Page
        </div>
    );
}