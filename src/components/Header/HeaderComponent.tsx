import { Header } from "."

const HeaderComponent = (headerData: Header) => {
    return (
        <>
            <div className="mt-2 text-gray-600 flex items-baseline">
                <h1 className="text-xl font-bold">
                    {headerData.title}
                </h1>
                <p className="ml-2 text-xl">
                    {'- '}{headerData.subtitle}
                </p>
            </div>
        </>
    )
}

export default HeaderComponent
