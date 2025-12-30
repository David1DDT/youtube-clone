import Link from "next/link";
import UploadButton from "./UploadButton";
import { cookies } from "next/headers";
import Logout from "./LogoutButton";

export default async function Header() {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const currentUserRes = await fetch("http://localhost:4000/api/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": cookieHeader,
        },
    })
    console.log(currentUserRes)
    return (
        <header className="header">
            <div className="logo"><Link href="/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png" alt="" width="150px" /></Link></div>
            <div className="header-buttons">
                {currentUserRes.status === 403 ? <Link href="/login"><button>Login</button></Link> : <section><UploadButton /><Logout /></section>}
            </div>
        </header>
    );
}
