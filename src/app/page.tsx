import React from 'react';

import "./page.css";
import Link from 'next/link';




function Home() {
    return (
        <div className="Login">
         homepage
         <button><Link href="./login">Sign in </Link></button>
        </div>
    );
};

export default Home;
