import Link from "next/link";
import Pagination from "./Components/pagination-component";


export default function PaginationHome() {

    return (
        <>
            <Link href={'../'} className="bg-gray-600 rounded px-5 py-2 m-2 text-white hover:bg-gray-400 h-full">{"Back"}</Link>
            <Pagination />
        </>
    )

}