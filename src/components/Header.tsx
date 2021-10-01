export type HeaderTypes = {
    title: string
    subtitle: string
}

const Header = (headerData: HeaderTypes) => {
    return (
        <>
            <div className="flex items-baseline">
                <h1 className="text-3xl font-bold">
                    {headerData.title}
                </h1>
                <p className="ml-2 text-xl">
                    {'- '}{headerData.subtitle}
                </p>
            </div>
        </>
    )
}

export default Header
