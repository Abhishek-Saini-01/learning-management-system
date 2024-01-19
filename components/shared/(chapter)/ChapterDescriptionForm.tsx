"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Chapter } from "@prisma/client"
import axios from "axios"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import Editor from "../Editor"
import Preview from "../Preview"

interface ChapterDescriptionFormProps  {
    courseId: string
    initialData: Chapter
    chapterId: string

}

const formSchema = z.object({
    description: z.string().min(1)
})


const ChapterDescriptionForm = ({
    initialData,
    courseId,
    chapterId
}:ChapterDescriptionFormProps) => {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || "",
        }
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Successfully Updated - Chapter")
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Chapter description
            <Button onClick={toggleEdit} variant="ghost">
                {isEditing ? (
                    <>Cancel</>
                ):(
                    <>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit description
                    </>
                )}            
            </Button>
        </div>

        {
            !isEditing && (
                <div 
                    className={cn(
                        "text-sm mt-2", 
                        !initialData.description && "text-slate-500 italic"
                    )}
                >
                    {!initialData.description && "No description"}
                    {initialData.description && (
                        <Preview
                            value={initialData.description}
                        />
                    )}
                </div>
            )
        }
        {
            isEditing && (
                <Form {...form} >
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Editor 
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )
        }
    </div>
  )
}

export default ChapterDescriptionForm