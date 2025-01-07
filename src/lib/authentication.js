"use server"
import {SignJWT, jwtVerify} from "jose";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SECRET_TOKEN

const key=new TextEncoder().encode(secretKey);
const timeExpiration =  30 * 60 * 1000;

// Encriptar y desencriptar la informacion de usuario
export async function encrypt(payload) {
    return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + timeExpiration))
    .sign(key);
}

export async function decrypt(input) {
    const {payload} = await jwtVerify(input, key, {
        algorithms: ["HS256"],
      });
      return payload;
}

// Sesion del usuario
export async function getSession() {
    const session = (await cookies()).get("session")?.value;
    if(!session) return null;
    return await decrypt(session);
}