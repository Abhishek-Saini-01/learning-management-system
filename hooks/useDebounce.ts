import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?:number):T{
    const [debounceValue, setDebounceValue] = useState<T>(value)
    useEffect(()=>{
        const timer = setTimeout(() => {
            setDebounceValue(value)
        },delay || 5000)

        return () => {
            clearTimeout(timer);
        }
    },[value, delay])

    return debounceValue;
}