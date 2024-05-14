
import styles from "@/app/ui/dashboard/profile/profile.module.css";


const Dashboard = () => {
  return (
    <div className={styles.container}>
      <form >
        <div className={styles.section}>
          <h2>Personal Information</h2>
          <input type="text" name="firstName" placeholder="First Name" />
          <input type="text" name="lastName" placeholder="Last Name" />
          <input type="text" name="middleInitial" placeholder="M.I." />
          <input type="date" name="dateOfBirth" placeholder="Date of Birth" />
          <input type="text" name="address" placeholder="Address" />
          <input type="text" name="mobileNumber" placeholder="Mobile No."  />
          <input type="text" name="city" placeholder="City"  />
          <input type="text" name="postalCode" placeholder="Postal Code"/>
        </div>
        <div className={styles.section}>
          <h2>Account</h2>
          <input type="email" name="email" placeholder="Email"/>
          <input type="text" name="currentPassword" placeholder="Current password"  />
          <input type="text" name="username" placeholder="Username" />
        </div>
        <button type="submit" className={styles.saveButton}>Save</button>
      </form>
    </div>
   
  );
};

export default Dashboard;
