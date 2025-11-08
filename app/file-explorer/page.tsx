import MainComponent from "./Components/MainConponent";


export default function FileExplorer() {

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col items-center bg-gray-50 border-4 border-double ">
            <header className="text-4xl semi-bold my-10">
                File Explorer
            </header>
            <MainComponent />
        </div>
    )
}