"use server"

import { auth } from "@clerk/nextjs/server";
import {db} from "@/lib/prisma";


export async function updateUser(data) {
    const {userId} = await auth();
    if (!userId) throw new Error("User not authenticated");

    const user = await db.user.findUnique({ 
        where:{
            clerkUserId: userId,
        },
    });

    if (!user) throw new Error("User not found");

    try {
         const result = await db.$transaction(
            async (tx) => {
              // find if the industry exits
              let industryInsight = await tx.industryInsight.findUnique({
                where:{
                    industry:data.industry
                },
              })
             // if industry doesn't exits,create it with default vlaues - will replace it with ai later 
             if (!industryInsight){
                industryInsight = await tx.industryInsight.create({
                    data: {
                        industry:data.industry,
                        salaryRanges:[], // default value
                        growthRange:0, // default value
                        demandLevel:"Medium", // Default value
                        topSkill:[], // Default empty Array
                        marketOutLook:"Neutral", // Default value
                        keyTreands:[],
                        recommendedSkills:[],
                        nextUpdate:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now

                    }
                })
             }
             // update the user  
             const updatedUser =  await tx.user.update({
                where: {
                    id:user.id,
                },
                data: {
                    industry:data.industry,
                    experience:data.experience,
                    bio:data.bio,
                    skills:data.skills
                },
             })

             return {updateUser,industryInsight}
         },
         {
            timeout:10000, // default:5000
         }
        );

        return result.user

    } catch (error) {
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update profile" + error.message);
    }
}

export async function getUserOnboardingStatus(){
    const {userId} = await auth();
    if (!userId) throw new Error("User not authenticated");

    const user = await db.user.findUnique({ 
        where:{
            clerkUserId: userId,
        },
    });

    if (!user) throw new Error("User not found");

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId:userId,
            },
            select: {
                industry:true
            },
        });
        return {
            isOnboarding:!!user?.industry
        }
    } catch (error){
        console.erorr("Error checking onboarding status:", error.message)
        throw new Error("Failed to check onboarding status")

    }
}
