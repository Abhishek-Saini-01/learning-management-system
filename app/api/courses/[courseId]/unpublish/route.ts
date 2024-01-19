import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}: {params: {courseId: string}}
){
    try {
        const { userId } = auth();
        if(!userId ){
            return new NextResponse("UNAUTHORZIE", {status: 400})
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        })
        if(!courseOwner){
            return new NextResponse("Not found", {status: 404})
        }

        const unPublishedCourse = await db.course.update({
            where: {
                id: params.courseId,
                userId,
            },
            data: {
                isPublished: false,
            }
        })
        return NextResponse.json(unPublishedCourse)
        
    } catch (error) {
        console.log("[COURSE UN-PUBLISH]", error);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}