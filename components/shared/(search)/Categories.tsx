"use client"

import { Category } from '@prisma/client';
import { IconType } from 'react-icons';
import { CiMedicalCase } from "react-icons/ci";
import {
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcSportsMode
} from "react-icons/fc";
import { GoLaw } from "react-icons/go";
import { LuPalmtree } from "react-icons/lu";
import CategoryItem from './CategoryItem';


interface CategoriesProps {
    items: Category[]
}

const iconMap: Record<Category["name"], IconType>={
    "Computer Science" :FcMultipleDevices,
    "Music":FcMusic,
    "Fitness":FcSportsMode,
    "Photography": FcOldTimeCamera,
    "Accounting":FcSalesPerformance,
    "Engineering":FcEngineering,
    "Filming":FcFilmReel,
    "Law": GoLaw,
    "Medical":CiMedicalCase,
    "Farming":LuPalmtree,
}
const Categories = ({items}: CategoriesProps) => {
  return ( 
    <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
        {items.map((item)=>(
            <CategoryItem 
                key={item.id}
                label={item.name}
                icon={iconMap[item.name]}
                value={item.id}
            />
        ))}
    </div>
  )
}

export default Categories