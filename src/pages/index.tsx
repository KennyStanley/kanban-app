import Head from 'next/head'

import { Header, HeaderComponent } from '@/components/Header'
import { TasksProvider } from '@/contexts/TasksProvider'
import Board from '@/components/Board'
import DarkModeToggle from '@/components/DarkModeToggle'
import useLocalStorage from '@/hooks/useLocalStorage'
import useLoaded from '@/hooks/useLoaded'
import { SectionsProvider } from '@/contexts/SectionsProvider'

export default function Home() {
    const headerData: Header = {
        title: 'Kenny Stanley',
        subtitle: 'Kanban Board',
    }

    const [darkMode, setDarkMode] = useLocalStorage('dark-mode')

    const loaded = useLoaded()

    return (
        <>
            {loaded && <div className={`${darkMode || false ? 'dark': ''} flex flex-col items-center justify-center`}>
                <Head>
                    <title>Cool as a Kanban</title>
                    <meta
                        name="description"
                        content="A super simple Kanban app made by Kenny Stanley Jr."
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="relative bg-gray-300 dark:bg-gray-900 flex flex-col items-center justify-start w-full flex-1 md:px-20 text-center h-screen min-h-screen">
                    <HeaderComponent {...headerData} />
                    
                    <div className="absolute top-12 sm:top-4 right-4">
                        <DarkModeToggle darkMode={darkMode || false} setDarkMode={setDarkMode} />
                    </div>
                    
                    <section className="flex flex-col md:flex-row items-stretch justify-around my-8 sm:w-full gap-2 h-full">
                        <SectionsProvider>
                            <TasksProvider>
                                <Board />
                            </TasksProvider>
                        </SectionsProvider>
                    </section>
                </main>
            </div>}
        </>
    )
}
