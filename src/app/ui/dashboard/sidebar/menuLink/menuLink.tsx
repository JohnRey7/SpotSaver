
"use client";

import Link from 'next/link';
import styles from './menuLink.module.css';
import React from 'react';
import { usePathname } from 'next/navigation';

interface MenuLinkProps {
    item: {
        path: string;
        title: string;
    };
}

const MenuLink: React.FC<MenuLinkProps> = ({ item }) => {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
            {item.title}
        </Link>
    );
}

export default MenuLink;
