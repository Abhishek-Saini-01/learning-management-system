import { LucideIcon } from "lucide-react"
import IconBadge from "../IconBadge"

interface InfoCardProps {
    icon: LucideIcon
    label: string
    numberofItems: number
    variant?: "default" | "success"
}
const InfoCard = ({
    icon:Icon,
    label,
    numberofItems,
    variant
}: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
        <IconBadge 
            variant={variant}
            icon={Icon}
        />
        <div>
            <p className="font-medium">{label}</p>
            <p className="text-gray-500 text-sm"> 
                {numberofItems} {numberofItems === 1 ? "Course" : "Courses" }
            </p>
        </div>
    </div>
  )
}

export default InfoCard