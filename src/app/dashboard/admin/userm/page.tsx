import React from 'react';
import styles from "@/app/ui/dashboard/products/userM.module.css";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import UserM from '@/app/component/UserM'




async function getName() {
    const response = await db.user.findMany({
        select: {
            id: true,
            firstname: true,
        },
    });
    return response.map(user => ({
        ...user,
        id: user.id.toString(), 
        firstname: user.firstname || ""
    }));
}

export default async function Home(){
    const session = await getServerSession(authOptions);
    const names = await getName();
    console.log(names);
    


    if(session?.user){
    return(
        <div className={styles.users}>
        <h2 className={styles.h2}>Users</h2>
        {names.map((name) =>(
            <UserM key={name.id} name={name}/>
        ))}
    </div>

        )
    }
    return <h2 className='text-2xl' style={{ color: 'black' }}>Please Login to see this admin</h2>;
};