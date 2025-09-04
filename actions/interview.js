"use server";
import {db} from "@/lib/prisma"
import {auth} from "@clerk/nextjs/server"

export async function generateQuize(){
     const {userId} = await auth();
        if (!userId) throw new Error("User not authenticated");
    
        const user = await db.user.findUnique({ 
            where:{
                clerkUserId: userId,
            },
        });

        if (!user) throw new Error("User not found")
    
  const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;
}