import { useEffect, useState } from 'react'

const PREFIX = 'user-prefs-'

export default function useLocalStorage(key: string, initialValue?: any) {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {
        if (typeof window !== 'undefined') {
            const jsonValue = localStorage.getItem(prefixedKey)
            if (jsonValue) {
                try {
                    return JSON.parse(jsonValue)
                } catch (error) {
                    // console.log(error)
                }
            }
            if (typeof initialValue === 'function') {
                return initialValue()
            } else {
                return initialValue
            }
        }
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(prefixedKey, JSON.stringify(value))
        }
    }, [prefixedKey, value])

    return [value, setValue]
}