import Link from "next/link";
import MainComponent from "./Components/MainConponent";


export default function FileExplorer() {

    return (
        <div className="flex">
            <Link href={'../'} className="bg-gray-600 rounded px-5 py-2 m-2 text-white hover:bg-gray-400 h-fit">{"Back"}</Link>
            <div className="min-h-screen p-4 md:p-8 flex flex-col items-center bg-gray-50 border-4 border-double ">
                <header className="text-4xl semi-bold my-10">
                    File Explorer
                </header>
                <MainComponent />
            </div>
        </div>
    )
}