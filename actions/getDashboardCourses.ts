import { db } from "@/lib/db"
import { Category, Chapter, Course } from "@prisma/client"
import { getProgress } from "./getProgress"

type CoursesWithProgressWithCategory = Course & {
    category: Category
    chapters: Chapter[]
    progress: number | null
}
type GetDashboardCourses = {
    completedCourses: CoursesWithProgressWithCategory[]
    coursesInProgress: CoursesWithProgressWithCategory[]
}

export const getDashboardCourses = async (userId:string):Promise<GetDashboardCourses> => {
    try {
        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true,
                            }
                        }
                    }
                }
            }
        })

        const courses = purchasedCourses.map((purchased)=> purchased.course) as CoursesWithProgressWithCategory[];
        for(let course of courses) {
            const progress = await getProgress(userId, course.id);
            course["progress"] = progress;
        }

        const completedCourses = courses.filter((course) => course.progress === 100);
        const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100);

        return {
            completedCourses,
            coursesInProgress
        }
    } catch (error) {
        console.log("[GET dashboard courses]",error);
        return {
            completedCourses: [],
            coursesInProgress: []
        }        
    }
}