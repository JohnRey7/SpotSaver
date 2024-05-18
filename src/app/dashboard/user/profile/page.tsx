"use client";
import styles from "@/app/ui/dashboard/profile/profile.module.css";
import { FC, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';



const ProfileForm = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.heading}>Personal Information</h2>
        <div className={styles.grid}>
          <div className={styles.flex}>
            <input type="text" placeholder="First Name" className={styles.input} />
            <input type="text" placeholder="Last Name" className={styles.input} />
          </div>
          <div className={styles.flex}>
            <input type="text" placeholder="M.I." className={styles.inputShort} />
            <input type="date" placeholder="Date of Birth" className={styles.inputLong} />
          </div>
          <input type="text" placeholder="Address" className={styles.input} />
          <div className={styles.flex}>
            <input type="text" placeholder="Mobile No." className={styles.input} />
            <input type="text" placeholder="City" className={styles.input} />
            <input type="text" placeholder="Postal Code" className={styles.input} />
          </div>
        </div>
        <h2 className={styles.heading}>Account</h2>
        <div className={styles.grid}>
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="text" placeholder="Username" className={styles.input} />
          <input type="password" placeholder="Current password" className={styles.input} />
          <input type="password" placeholder="Change password" className={styles.input} />
        </div>
        <div className={styles.buttons}>
          <button type="submit" className={styles.saveButton}>Save</button>
          <button type="button" className={styles.deleteButton}>Delete</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;