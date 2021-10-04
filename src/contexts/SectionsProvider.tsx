import { Section } from "@/components/Section/types"
import { createContext, useContext, useEffect, useState, useCallback, Dispatch, SetStateAction } from "react";
import { supabase } from '@/utils/supabase'

type SectionsProviderOutput = {
    sections: Section[] | undefined
    setSections: Dispatch<SetStateAction<Section[]>>
    updateSection(updatedSection: Section): void
}

const SectionsContext = createContext<SectionsProviderOutput | undefined>(undefined)

export function useSections() {
    return {...useContext(SectionsContext)}
}

export function SectionsProvider(props: {children?: any}) {
    const [sections, setSections] = useState<Section[]>([])

    const fetchSections = useCallback(async () => {
        let { data: sections, error } = await supabase.from('sections').select('*')
        if (error) console.log('error', error)
        else setSections(sections as Section[])
        console.log(`Fetched Sections from supabaseDB`)
        console.log(sections)
    }, [setSections])

    const updateSection = useCallback(async (updatedSection: Section) => {
        setSections((prevSections: Section[]) => prevSections.map(section => {
            if (section.id !== updatedSection.id) return section
            else return updatedSection
        }))
        
        const { data, error } = await supabase.from('sections').update(updatedSection).match({ id: updatedSection.id})
        if (error) console.log('error', error)
        
    }, [setSections])

    useEffect(() => {
        fetchSections()
    }, [])

    return (
        <SectionsContext.Provider value={{sections, setSections, updateSection}}>
            {props.children}
        </SectionsContext.Provider>
    )
}