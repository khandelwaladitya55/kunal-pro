// this file will contain all the important functions
import axios from "axios";
// import { cookies } from "next/headers";
const axiosApiInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
});

function titleToSlug (title)
{
return title.toLowerCase().trim().replace(/'/g, '').replace(/\s+/g,' ').replace(/ /g, '-');
//method chaning :- kisi bhi operad per ek kai bad ek function ko call karna method chaning hoti hai
}

function timeAgo(dateString)
{
    const now = new Date();
    const inputDate = new Date(dateString);
    const diff = now - inputDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return years + ' years ago';
    } else if (months > 0) {
        return months + ' months ago';
    } else if (days > 0) {
        return days + ' days ago';
    } else if (hours > 0) {
        return hours + ' hours ago';
    } else if (minutes > 0) {
        return minutes + ' minutes ago';
    } else {
        return seconds + ' seconds ago';
    }
}
const getCookie = (name)=>
{
    if (typeof document === "undefined") {
        return console.log(null); // Prevents execution on the server
      }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if(parts.length==2) return (parts.pop().split(";").shift());    
    return null;
}
module.exports = {titleToSlug,getCookie,timeAgo,axiosApiInstance};