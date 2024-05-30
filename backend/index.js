import dbConnection from "./src/db/dbConnection.js";
import { v2 as cloudinary } from 'cloudinary';
import app from "./app.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Temporary storage for OTPs
let otpStore = {};

// Mock database of users
const users = [
    { email: 'user@example.com', password: 'password123' },
    // Add more users as needed
];

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Send OTP route
app.post("/send_recovery_email", (req, res) => {
    const { email } = req.body;
    const user = users.find((user) => user.email === email);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending OTP' });
        }
        res.json({ message: 'OTP sent to your email' });
    });
});

// Verify OTP and reset password route
app.post("/verify_otp", (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (otpStore[email] !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    const user = users.find((user) => user.email === email);
    if (user) {
        user.password = newPassword;
        delete otpStore[email];
        return res.json({ message: 'Password reset successful' });
    }

    res.status(404).json({ message: 'User not found' });
});

// Database connection configuration
dbConnection()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });
