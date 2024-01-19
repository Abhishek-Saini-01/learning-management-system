import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT (
    req: Request,
    {params}: {params: {courseId: string}}
) {
    try {
        const { userId} = auth()

        if(!userId || !isTeacher(userId)){
            return new NextResponse("UNAUTHORIZE", {status: 400})
        }

        const { list} = await req.json()

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        })
        if(!courseOwner){
            return new NextResponse("UNAUTHORIZE", {status: 400})
        }

        for (let item of list){
            await db.chapter.update({
                where: {
                    id: item.id,
                    courseId: params.courseId
                },
                 data: { 
                    position: item.position
                 }
            })
        }

        return new NextResponse("Success" , {status: 200})
    } catch (error) {
        console.log("[REORDER]",error);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}