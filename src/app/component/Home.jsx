"use client"
import { useState } from "react";
import CardList from "./CardList"
import SearchInput from "./SearchInput"
import Select from "./Select"

const PokemonHome = () => {
    const [selectedType, setSelectedType] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    return (<>
        <Select selectedType={selectedType} setSelectedType={setSelectedType} />
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CardList selectedType={selectedType} searchTerm={searchTerm}/>
    </>)
}
export default PokemonHome