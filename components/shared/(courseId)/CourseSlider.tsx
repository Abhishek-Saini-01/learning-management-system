import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { Chapter, Course, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation"
import CourseProgress from "../CourseProgress"
import CourseSlidebarItem from "./CourseSlidebarItem"


interface CourseSliderProps {
    course: Course & {
        chapters:(Chapter & {
            userProgress: UserProgress[] | null
        })[]
    }
    progressCount: number
}
const CourseSlider = async ({
    course,
    progressCount
}: CourseSliderProps) => {
    const {userId} = auth()
    if(!userId) {
        return redirect("/")
    }

    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId: course.id
            }
        }
    })

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
            <h1 className="font-semibold">
                {course.title}
            </h1>

            {/* check purchase & add progress  */}
            {purchase && (
                <div className="mt-10">
                    <CourseProgress 
                        varient="success"
                        value={progressCount}
                    />
                </div>
            )}
        </div>
        <div className="flex flex-col w-full">
            {course.chapters.map((chapter) => (
                <CourseSlidebarItem 
                    key={chapter.id}
                    id={chapter.id}
                    label={chapter.title}
                    isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                    courseId={course.id}
                    isLoacked={!chapter.isFree && !purchase}
                />
            ))}
        </div>
    </div>
  )
}

export default CourseSlider