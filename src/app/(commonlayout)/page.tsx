import { Button } from "@/components/ui/button";

import { cookies } from "next/headers";

export default async function Home() {


  const cookiesStore = await cookies()
  console.log(cookiesStore.getAll())



  const res = await fetch("http://localhost:5000/api/auth/get-session",{
    headers: {
      Cookie:cookiesStore.toString()
    },
    cache:"no-store"
  } );
  const session = await res.json();
  console.log("Session from server:", session);

  
  return (
    <div className="">
      <Button>Click me</Button>
    </div>
  );
}
