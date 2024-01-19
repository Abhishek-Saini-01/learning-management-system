import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

 
const f = createUploadthing();
 
const handleAuth = () => {
  const { userId } = auth();
  const isAuthorize = isTeacher(userId)

  if (!userId || !isAuthorize) throw new Error("Unauthorized");
  return { userId };
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete((data) => console.log("file", data)),
    
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete((data) => console.log("file", data)),
    
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete((data) => console.log("file", data)),
    
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;


