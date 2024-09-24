/* eslint-disable no-unused-vars */
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    userId: string;
    name: string;
    isVerified: boolean;
    password: string;
    iat: number;
    email: string;
    type: Role;
  };
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum Role {
  SuperAdmin = 'superAdmin',
  Admin = 'admin',
  User = 'user',
  Doctor = 'doctor',
}

export const AllRoles = [Role.SuperAdmin, Role.Admin, Role.User, Role.Doctor];

export type User = {
  name: string;
  email: string;
  password: string;
  phone: string;
  type: Role;
  isActive: boolean;
  isVerified: boolean;
  gender: Gender;
  // bloodType: String,
  // dateOfBirth: number,
};

// export interface IRole {
//   superAdmin: string;
//   admin: string;
//   user: string;
//   doctor: string;
// }
