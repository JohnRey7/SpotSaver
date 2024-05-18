// components/ParkingReservation.js
import React from 'react';
import styles from "@/app/ui/dashboard/parkres/parkres.module.css";
import Head from 'next/head';

const ParkingReservation = () => {
    return (
      <div className={styles.container}>
        <Head>
          <title>Parking Reservation</title>
          <meta name="description" content="Parking reservation form using Next.js and plain CSS" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <h2 className={styles.heading}>Parking Reservation</h2>
        <button className={styles.vehicleButton}>Choose Vehicle</button>
        <form className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.header}>Available Parking Spots</div>
            <div className={styles.header}>Location</div>
            <div className={styles.header}>Php</div>
            <div className={styles.header}>Date & Time</div>
            
            {[
              { slot: 'Slot 1', location: 'B1', price: 50, dateTime: '24/04/24 01:30 PM' },
              { slot: 'Slot 6', location: 'B1', price: 50, dateTime: '' },
              { slot: 'Slot 15', location: 'B2', price: 50, dateTime: '' },
              { slot: 'Slot 55', location: 'B5', price: 50, dateTime: '' },
            ].map((slot, index) => (
              <React.Fragment key={index}>
                <div className={styles.cell}>{slot.slot}</div>
                <div className={styles.cell}>{slot.location}</div>
                <div className={styles.cell}>{slot.price}</div>
                <input type="text" placeholder="DD/MM/YY --:-- AM/PM" value={slot.dateTime} className={styles.input} />
              </React.Fragment>
            ))}
          </div>
          <button type="submit" className={styles.reserveButton}>Reserve</button>
        </form>
      </div>
    );
  };
  
  export default ParkingReservation;