import Head from 'next/head'

import Header, { HeaderTypes } from '@/components/Header'
import { TasksProvider } from '@/contexts/TasksProvider'
import Board from '@/components/Board'

export default function Home() {
    const headerData: HeaderTypes = {
        title: 'Kenny Stanley',
        subtitle: 'Kanban Board',
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <Head>
                <title>Cool as a Kanban</title>
                <meta
                    name="description"
                    content="A super simple Kanban app made by Kenny Stanley Jr."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-start w-full flex-1 px-20 text-center h-screen min-h-screen">
                <Header {...headerData} />
                <section className="flex items-stretch justify-around my-6 sm:w-full gap-2 h-full">
                    <TasksProvider>
                        <Board />
                    </TasksProvider>
                </section>
            </main>
        </div>
    )
}
