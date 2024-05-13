import React from 'react';

import "./page.css";
import Link from 'next/link';




function Home() {
    return (
        <div className="Login">
         homepage
         <button><Link href="">Sign in </Link></button>
         <button><Link href="./login">Sign in to Admin </Link></button>
        </div>
    );
};

export default Home;
