import React from 'react';
import styles from "@/app/ui/dashboard/products/userM.module.css";  // Import the specific CSS for Users

function Users() {
    return (
        <div className={styles.users}>
            <h2>Users</h2>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={styles.user}>
                    <span>Name</span>
                    <button className={styles.buttonEdit}>Edit</button>
                    <button className={styles.buttonDelete}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default Users;
