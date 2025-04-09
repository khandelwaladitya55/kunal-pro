// import axios from "axios";
import { NextResponse } from "next/server";


export function middleware(req)
{
    const admin_token = req.cookies.get("admin_token");
    // console.log(admin_id.value);

    if(req.nextUrl.pathname.startsWith('/admin') && !admin_token)
    {
        return NextResponse.redirect(new URL('/admin-login', req.url));
    }
    else
    {
        return NextResponse.next();

    }
}
export const config = 
{
    matcher:'/admin/:path*',
};