"use client";
import { signOut } from "next-auth/react";
import styles from "@/app/ui/dashboard/sidebar/sidebar.module.css";
const UserAccountNav = () =>{
    return (
    <button onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/login`
    })} className={styles.logoutButton}>Log out</button>
    );
};

export default UserAccountNav;