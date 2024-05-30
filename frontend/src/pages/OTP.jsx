// src/components/OTP.jsx
import React, { useState } from 'react';
import axios from 'axios';

const OTP = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('/send_recovery_email', { email });
      setOtpSent(true);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('/verify_otp', { email, otp, newPassword });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {message && <p>{message}</p>}
      {!otpSent ? (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP and Reset Password</button>
        </div>
      )}
    </div>
  );
};

export default OTP;
