"use client"






const Logout = () => {
    return (
        <button onClick={async () => {
            await fetch('http://127.0.0.1:4000/api/auth/logout', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            })

            window.location.reload()

        }}>Log out</button>
    )
}

export default Logout