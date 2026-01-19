
"use client";

import { useEffect } from "react";

export default function AboutError({error ,reset } :{error: Error; reset: () => void}) {
    useEffect(()=>{
        // we can Pass this error to a logger
        console.log(error)
    }, [error]);
    return(
        <div>
            <h1>Failed to load the about page.</h1>
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}