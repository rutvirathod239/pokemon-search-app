import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const SearchInput = ({ searchTerm, setSearchTerm }) => {
    const [searchValue, setSearchValue] = useState(searchTerm);

    const handleClick = () => {
        setSearchTerm(searchValue)
    }

    return (
        <div className="w-full">
        <div className="flex align:left mt-2 w-full">
            <div className="flex items-center w-90">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <span className="p-2 bg-white text-gray-500">
                    <MagnifyingGlassIcon className="h-6 w-6" />
                </span>
                <input
                    type="text"
                    value={searchValue}
                    placeholder="Search"
                    className="flex-1 p-2 outline-none text-gray-700 placeholder-gray-400"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className="px-4 py-2 bg-blue-900 text-white font-medium hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900" onClick={()=>handleClick()}>
                    Search
                </button>
            </div>
            
        </div>
        </div>
        </div>
    )
}
export default SearchInput;