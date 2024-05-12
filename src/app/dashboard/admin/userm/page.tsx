import React from 'react';
import styles from "@/app/ui/dashboard/products/userM.module.css";  // Import the specific CSS for Users
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
const Users = async () => {
    const session = await getServerSession(authOptions);
    console.log(session);
    if(session?.user){
       return( <div className={styles.users}>
            <h2 className={styles.h2}>Users</h2>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={styles.user}>
                    <span className={styles.span}>{session?.user.email}</span>
                    <button className={styles.buttonEdit}>Edit</button>
                    <button className={styles.buttonDelete}>Delete</button>
                </div>
            ))}
        </div>
       );
    }
    return <h2 className='text-2xl' style={{ color: 'black' }}>Please Login to see this admin</h2>;
    
};

export default Users;
