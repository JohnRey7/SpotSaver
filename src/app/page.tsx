import React from 'react';
import logo from "./logo.svg";
import "./page.css";
import Link from 'next/link';




function Home() {
    return (
        <div className="Login">
          <div className="LoginBox">
            <h5>Spot Saver</h5>
           <div className="LoginHeader">login</div>
            <div className="inputs">
            <label className='label'>Email</label>
            <input type="email" className="email" placeholder='Enter email'/>
            <label  className='label'>Password</label>
            <input type="password" className="password" placeholder='Enter password'/>
            </div>
            <div className="RegisterRedirect">
            Create Memories, <Link href="/register">Register here</Link>
            </div>
            <br></br>
            <br></br>
            <div>
                <button className='submitbutton'>Proceed</button>
            </div>
         </div>
        </div>
    );
};

export default Home;
