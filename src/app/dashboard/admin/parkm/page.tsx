import React from 'react';
import styles from "@/app/ui/dashboard/parkm/parkm.module.css";  // Import the specific CSS for Users
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';


async function ParkingManagement () {
    const session = await getServerSession(authOptions);
    const totalSlots = 100;
    const takenSlots = 5;
    const availableSlots = totalSlots - takenSlots;
  
    return (
      <div className={styles.parkingmanagement}>
        <div className={styles.statistics}>
          <div className={styles.stat}>
            <h2>Available Parking Lot</h2>
            <p>95%</p>
            <p>Available Slots: {availableSlots}</p>
            <p>Recently Updated: 23/04/2024 1:05 AM</p>
          </div>
          <div className={styles.stat}>
            <h2>Taken Parking Lot</h2>
            <p>5%</p>
            <p>Taken Slots: {takenSlots}</p>
            <p>Recently Updated: 23/04/2024 1:05 AM</p>
          </div>
        </div>
        <div className={styles.parkinglot}>
          {Array.from({ length: totalSlots }).map((_, index) => (
            <div
              key={index}
              className={`slot ${index < takenSlots ? 'taken' : ''}`}
            ></div>
          ))}
        </div>
      </div>
    );
  }
  
  export default ParkingManagement;
