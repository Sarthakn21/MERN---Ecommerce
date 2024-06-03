import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "user",
    },
    name: {
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "name cannot be more than 30 characters"],
        minLength: [4, "name cannot be less than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Enter your email"],
        unique: [true, "Email is already in use"],
        validate: [validator.isEmail, "Enter valid email"],
    },
    password: {
        type: String,
        required: [true, "Enter your password"],
        select: false,
        minLength: [8, "Password cannot be less than 8 characters"],
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
