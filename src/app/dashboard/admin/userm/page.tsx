import React from 'react';
import styles from "@/app/ui/dashboard/products/userM.module.css";  // Import the specific CSS for Users
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { FC } from 'react';


interface userm{
    names:{
        id: string;
        firstname: string;

    };
}

async function getName(){
    const response = await db.user.findMany({
        select:{
            id: true,
            firstname: true,
        },
        
    });
    return response;
}

const Users: FC<userm> = async ({names}) => {
    const session = await getServerSession(authOptions);
    const name = await getName();
    console.log(name);
    
    if(session?.user){
       return( <div className={styles.users}>
            <h2 className={styles.h2}>Users</h2>
            {name.map((names) => (
                <div key={names.id} className={styles.user}>
                    <span className={styles.span}>{names.firstname}</span>
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
