import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface CourseProgressProps {
    varient?: "default" | "success"
    value: number
    size?: "default" | "sm"
}

const colorByVarient = {
    default: "text-sky-700",
    success: "text-emerald-700",
}
const sizeByVarient = {
    default: "text-sm",
    sm: "text-xs",
}

const CourseProgress = ({
    value,
    varient,
    size
}:CourseProgressProps) => {
  return (
    <div>
        <Progress 
            varient={varient}
           className="h-2"
           value={value} 
        />
        <p className={cn(
            "font-medium mt-2 text-sky-700",
            colorByVarient[varient || "default"],
            sizeByVarient[size || "default"]
        )}>
            {Math.round(value)}% complete
        </p>
    </div>
  )
}

export default CourseProgress