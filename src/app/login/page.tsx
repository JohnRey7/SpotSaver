import React from 'react';

import styles from "@/app/ui/login/login.module.css";
import Link from 'next/link';




function Home() {
    return (
        <div className={styles.Login}>
          <div className={styles.LoginBox}>
            <h5 className={styles.h5}>Spot Saver</h5>
           <div className={styles.LoginHeader}>login</div>
            <div className={styles.inputs}>
            <label className={styles.label}>Email</label>
            <input type="email" className={styles.email} placeholder='Enter email'/>
            <label  className='label'>Password</label>
            <input type="password" className={styles.password} placeholder='Enter password'/>
            </div>
            <div className={styles.RegisterRedirect}>
            Create Memories, <Link href="/register">Register here</Link>
            </div>
            <br></br>
            <br></br>
            <div>
                <button className={styles.submitbutton}>Proceed</button>
            </div>
         </div>
        </div>
    );
};

export default Home;
