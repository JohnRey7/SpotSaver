import Link from 'next/link';
import React from 'react';
import './reg.css';

function register() {
  return (
    <div className="SignUpBackground">
      <div className="SignUpBox">
        <h2 className="SignUpHeader">Sign Up</h2>
        <div className="Form">
          <input type="text" className="InputField Half" placeholder="First Name" />
          <input type="text" className="InputField Half" placeholder="Last Name" />
          <input type="email" className="InputField" placeholder="Email" />
          <input type="password" className="InputField" placeholder="Password" />
          <input type="password" className="InputField" placeholder="Confirm Password" />
          <button className="SignUpButton">Sign Up</button>
          <div className="LoginRedirect">
            Already have an account? <Link href="/">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default register;
