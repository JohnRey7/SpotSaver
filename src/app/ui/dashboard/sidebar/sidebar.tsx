
import styles from "./sidebar.module.css";
import React from 'react';
import Image from 'next/image'; 
import MenuLink from "./menuLink/menuLink";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import UserAccountNav from "../../UserAccountNav";

const menuItems = [
    {
      title: " ",
      list: [
        {
          title: "User Management",
          path: "/dashboard/admin/userm",
        },
        {
          title: "Parking Management",
          path: "/dashboard/admin/parkm",
        },
        {
          title: "Reports and Analytics",
          path: "/dashboard/products",
        },
        {
          title: "Notifications",
          path: "/dashboard/transactions",
        },
        {
            title: "System Settings",
            path: "/dashboard/transactions",
        },
      ],
    },
];
    
const Sidebar: React.FC = async () => {
  const session = await getServerSession(authOptions);
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image src="/logo.png" alt="SpotSaver Logo" width="300" height="120"/>
            </div>
            <ul className={styles.list}>
                {menuItems.map(cat => (
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
                        {cat.list.map(item => (
                            <MenuLink item={item} key={item.title} />
                        ))}
                    </li>
                ))}
            </ul>
            {session?.user ? (
             <UserAccountNav/>
            ) : (
              <button className={styles.logoutButton}><Link href='/login'>Sign in</Link></button>
            )}
            
        </div>
    );
}

export default Sidebar;
