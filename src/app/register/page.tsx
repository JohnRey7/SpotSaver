"use client";
import styles from "@/app/register/reg.module.css";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';


const FormSchema = z
  .object({
    firstname: z.string().min(1, 'Firstname is required').max(100),
    lastname: z.string().min(1, 'Lastname is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });
  const SignUpForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    });
  
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      });
      if (response.ok) {
        router.push('./login');
      } else {
        console.error('Registration failed!');
      }
    };
  
    return (
      <div className={styles.SignUpBackground}>
        <form className={styles.SignUpBox} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.SignUpHeader}>Sign Up</h2>
          <div className={styles.Form}>
            <input type="text" {...register('firstname')} className={styles.InputField} placeholder="First Name" />
            {errors.firstname && <p className={styles.message}>{errors.firstname.message}</p>}
            <input type="text" {...register('lastname')} className={styles.InputField} placeholder="Last Name" />
            {errors.lastname && <p className={styles.message}>{errors.lastname.message}</p>}
            <input type="email" {...register('email')} className={styles.InputField} placeholder="Email" />
            {errors.email && <p className={styles.message}>{errors.email.message}</p>}
            <input type="password" {...register('password')} className={styles.InputField} placeholder="Password" />
            {errors.password && <p className={styles.message}>{errors.password.message}</p>}
            <input type="password" {...register('confirmPassword')} className={styles.InputField} placeholder="Confirm Password" />
            {errors.confirmPassword && <p className={styles.message}>{errors.confirmPassword.message}</p>}
            <button type="submit" className={styles.SignUpButton}>Sign Up</button>
            <div className={styles.LoginRedirect}>
              Already have an account? <Link href="./login">Login here</Link>
            </div>
          </div>
        </form>
      </div>
    );
  };

export default SignUpForm;
