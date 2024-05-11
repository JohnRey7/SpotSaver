"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from "@/app/register/reg.module.css";

function SignUpForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await response.json();
      if (response.ok) {
        router.push('/login'); // Redirect to login page on successful registration
        setMessage('');
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('Failed to connect to the server.');
    }
  };

  return (
    <div className={styles.SignUpBackground}>
      <form className={styles.SignUpBox} onSubmit={handleSubmit}>
        <h2 className={styles.SignUpHeader}>Sign Up</h2>
        <div className={styles.Form}>
          <input type="text" name="firstname" className={styles.InputField} placeholder="First Name" value={formData.firstname} onChange={handleChange} />
          <input type="text" name="lastname" className={styles.InputField} placeholder="Last Name" value={formData.lastname} onChange={handleChange} />
          <input type="email" name="email" className={styles.InputField} placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" className={styles.InputField} placeholder="Password" value={formData.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" className={styles.InputField} placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          <button type="submit" className={styles.SignUpButton}>Proceed</button>
          {message && <p className={styles.message}>{message}</p>}
          <div className={styles.LoginRedirect}>
            Already have an account? <Link href="/login">Login here</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
