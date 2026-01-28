import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { ROLE } from "./constants/role";


export async function proxy(request:NextRequest) {
    const Pathname = request.nextUrl.pathname;
    let isAuthenticated = false;
    let isadmin = false;
    

    const {data} =await userService.getSession();
    if(data){
        isAuthenticated = true;
        // Fixed: data.user.role instead of data.session.user.role
        isadmin = data.user.role === ROLE.ADMIN;  
      }
      console.log("Is Admin:", isadmin)
      console.log("User Data:", data)
      
      // Redirect logic user in not authenticated at all
   if(!isAuthenticated){
    return NextResponse.redirect(new URL('/login',request.url))
   }
   
   // Redirect logic based on role and pathname role ===admin
   // Admin should not access regular user dashboard
   if(isadmin && Pathname.startsWith('/user-dashboard')){
    return NextResponse.redirect(new URL('/admin-dashboar',request.url))
   }
   
   // User is authenticated and role is user
   // User can not access admin dashboard
   if(!isadmin && Pathname.startsWith('/admin-dashboar')){
    return NextResponse.redirect(new URL('/dashboard',request.url))
   }

   console.log("Pathname:", Pathname)
    return NextResponse.next();

}
export const config={
    matcher:["/dashboard/:path*", "/admin-dashboar/:path*", "/user-dashboard/:path*"]
}