import { Schema, model } from 'mongoose';
import { User } from '../modules/user/user.interface.js';

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 2,
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
    },
    phone: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ['doctor', 'user'],
      default: 'user',
    },

    // gender: {
    //     type: String,
    //     enum: ['Male', 'Female'],
    //     required: true,
    // },

    // dateOfBirth: {
    //     type: Number,
    //     required: true,
    // },
    // bloodType: {
    //     type: String,
    //     enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    //     required: true,
    // }
  },
  { timestamps: true },
);

export const userModel = model('User', userSchema);
