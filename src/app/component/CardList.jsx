import { useEffect, useState } from "react";
import Image from "next/image";
import useFetchDetailData from "../hooks/useFetchDetailData";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import SkeletonCard from "./SkeletonCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchPokemonList } from "../utils/utils";

const CardList = ({ selectedType, searchTerm }) => {
    const { data, error, loading } = useFetchDetailData('https://pokeapi.co/api/v2/pokemon');
    const router = useRouter();
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (selectedType && data?.length) {
            const filterCards = data.filter((item) => 
                item?.detail?.types?.some((type) => type?.type?.name?.toLowerCase() == selectedType.toLowerCase()) 
            );
            setFilteredData(filterCards);
        } else {
            setFilteredData(data || []);
        }
    }, [selectedType, data])

    useEffect(() => {
        if (searchTerm && data?.length) {
            const filterCards = data.filter((item) => 
                item?.pokemon?.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filterCards);
        } else {
            setFilteredData(data || []);
        }
    }, [searchTerm, data])

    const handleNavigate = (item) => {
        const pokemonId = item?.pokemon?.url?.split("/").filter(Boolean).pop();
        router.push(`/detail/${pokemonId}`);
    }

    const fetchData = async () => {
        if (filteredData?.[0]?.next) {
            const data = await fetchPokemonList(filteredData?.[0]?.next)
            setFilteredData([...filteredData, ...data])
        }
    }

    return (
        <div className="w-full mt-10">
            <InfiniteScroll
                dataLength={filteredData.length} 
                next={fetchData}
                hasMore={filteredData?.[0]?.next}
                loader={searchTerm || selectedType ? <h4>Loading...</h4> : null}
                endMessage={
                    <div>
                    {!filteredData?.[0]?.next ? 
                    <div>
                        <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                        </p>
                    </div> : null}
                    </div>
                }                
            >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredData.length || !loading ? filteredData?.map((item, index) => (
                <div key={index} className="bg-white w-full max-w-sm mx-auto shadow-md rounded-lg h-full">
                    <div className="h-60 flex items-center justify-center max-h-60 overflow-hidden">
                        <Image src={item.image} width={150} height={150} alt={item.pokemon.name} className="object-contain max-h-full max-w-full"/>
                    </div>
                    <div className="bg-gray-100 h-40 rounded-b-lg">
                        <h6 className="align:left text-xl font-bold pt-3 ml-5 capitalize">{item.pokemon.name}</h6>
                        <p className="text-blue-900 ml-5 mt-20 inline-flex items-center cursor-pointer" onClick={()=>handleNavigate(item)}>
                            Detail<ArrowRightIcon className="h-4 w-4 ml-1"/>
                        </p>
                    </div>
                </div>
            )) : Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
            </InfiniteScroll>
        </div>
    )
}
export default CardList;