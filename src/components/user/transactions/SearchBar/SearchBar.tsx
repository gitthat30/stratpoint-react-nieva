import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}

export function SearchBar( { searchTerm, setSearchTerm }: SearchBarProps ) {
    return (
        <div className="flex items-center bg-white shadow rounded-lg p-2">
            <Search className="text-gray-400 mr-2" size={20} />
            <input
            type="text"
            placeholder="Search transactions..."
            className="flex-grow outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}