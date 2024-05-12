"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import styles from "@/app/ui/login/login.module.css";


const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  });

const SignInForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = async (values: z.infer<typeof FormSchema>) =>  {
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        });
        if (signInData?.error) {
            console.error(signInData.error);
        } else {
            router.refresh();
            router.push('/dashboard/admin/userm'); 
        }
    };

    return (
        <div className={styles.Login}>
            <div className={styles.LoginBox}>
                <h5 className={styles.h5}>Spot Saver</h5>
                <div className={styles.LoginHeader}>login</div>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.inputs}>
                    <label className={styles.label}>Email</label>
                    <input type="email" {...register('email')} placeholder='Enter email' className={styles.email} />
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    
                    <label className={styles.label}>Password</label>
                    <input type="password" {...register('password')} placeholder='Enter password' className={styles.password} />
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                    
                    <button type="submit" className={styles.submitbutton}>Proceed</button>
                </form>
                <div className={styles.RegisterRedirect}>
                    Create Memories, <Link href="/register">Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
