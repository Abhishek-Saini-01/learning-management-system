import { getCourse } from "@/actions/getCourses"
import Categories from "@/components/shared/(search)/Categories"
import CoursesList from "@/components/shared/CoursesList"
import SearchInput from "@/components/shared/SearchInput"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface SearchPageProps {
  searchParams: {
    title: string
    categoryId: string
  }
}
const SearchPage = async ({
  searchParams
}:SearchPageProps) => {
  const {userId} = auth()
  if (!userId) {
    return redirect("/")
  }


  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })
  const courses = await getCourse({
    userId,
    categoryId: searchParams.categoryId,
    title: searchParams.title
  })    

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories
          items={categories}
        />

        <CoursesList 
          items={courses}
        />
      </div>
    </>
  )
}

export default SearchPage