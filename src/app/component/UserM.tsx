import { FC } from "react";
import styles from "@/app/ui/dashboard/products/userM.module.css";

interface UserNameProps{
    name:{
        id: string;
        firstname: string | null; 
    };
}


const UserName: FC<UserNameProps> = ({name}) => {
    const {firstname} = name;
   
   

       return(
       <div key={name.id} className={styles.user}>
        <span className={styles.span}>{firstname}</span>
        <button className={styles.buttonEdit}>Edit</button>
        <button className={styles.buttonDelete}>Delete</button>
        </div>
     );
    
    
};

export default UserName;