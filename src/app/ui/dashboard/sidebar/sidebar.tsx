import styles from "./sidebar.module.css";
import React from 'react';
import Image from 'next/image'; // Ensure you are importing Image from 'next/image'
import MenuLink from "./menuLink/menuLink";

const menuItems = [
    {
      title: " ",
      list: [
        {
          title: "User Management",
          path: "/dashboard/userm",
        },
        {
          title: "Parking Management",
          path: "/dashboard/parkm",
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
    
const Sidebar: React.FC = () => {
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
            <button className={styles.logoutButton}>Log out</button>
        </div>
    );
}

export default Sidebar;
