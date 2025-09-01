"use server"

import { auth } from "@clerk/nextjs/server";
import {db} from "@/lib/prisma";

export async function updateUser(data) {
    const {userid} = await auth();
    if (!userid) throw new Error("User not authenticated");

    const user = await db.user.findUnique({ 
        where:{
            clerkUserId: userid
        },
    });

    if (!user) throw new Error("User not found");

    try {
         const result = await db.$transaction(async () => {
              // find if the industry exits
             // if industry doesn't exits,create it with default vlaues - will replace it with ai later 
             // update the user  
         },
         {
            timeout:10000, // default:5000
         }
        );

        return result.user

    } catch (error) {
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update profile");
    }
}
