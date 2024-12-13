"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import useFetchData from "../../hooks/useFetchData";
import "../../styles/globals.css";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import SkeletonCard from "@/app/component/SkeletonCard";

const CardDetail = () => {
    const { id } = useParams();    
    const { data, loading, error } = useFetchData(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const image = `https://img.pokemondb.net/artwork/${data.name}.jpg`;
    const [type, setTypes] = useState([]);
    const [stats, setStats] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [moves, setMoves] = useState([]);

    useEffect(() => {
        if (data && (data?.types?.length || data?.stats?.length)) {
            const extractedTypes = data.types?.map((item) => item.type.name);
            const extractedStats = data.stats?.map((item) => item.stat.name);
            const extractedAbilities = data.abilities?.map((item) => item.ability.name);
            const extractedMoves = data.moves?.map((item) => item.move.name);
            const someMoves = getRandomElements(extractedMoves, 5);
            setMoves(someMoves)
            setTypes(extractedTypes);
            setStats(extractedStats);
            setAbilities(extractedAbilities);
        }
    }, [data])
    
    const getRandomElements = (arr, numElements) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);      
        return shuffled.slice(0, numElements);
    };
    
    return (
        <div>
            <div className="inline-flex">
            <nav className="p-4 text-sm">
                <ol className="flex space-x-2">
                    <li>
                        <Link href="/" className="text-blue-600 hover:underline">
                            Home
                        </Link>
                    </li>                    
                    <li><ArrowRightIcon className="h-3 w-3 mt-1"/></li>
                    <li className="capitalize text-gray-500">{data?.name || "Loading..."}</li>
                </ol>
            </nav>
            </div>
            {!loading ? <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white w-full max-w-sm mx-auto shadow-md rounded-lg h-full">
                <div className="h-60 flex items-center justify-center rounded-t-lg">
                    <div className="relative w-50 h-50">
                        <Image
                            src={image}
                            alt={data.name || 'img'}
                            width={200}
                            height={200}
                            className="background-blend-multiply"
                        />
                    </div>
                </div>
                <div className="bg-gray-300 h-50 rounded-b-lg p-4">
                    <div className="flex">
                        <span>
                            <span className="font-bold">Name:</span>
                            <span className="ml-2 capitalize">{data?.name}</span>
                        </span>
                    </div>
                    <div className="flex">
                        <span>
                            <span className="font-bold">Type:</span>
                            <span className="ml-2">{type.join(', ')}</span>
                        </span>
                    </div>
                    <div className="flex">
                        <span>
                            <span className="font-bold">Stats:</span>
                            <span className="ml-2">{stats.join(', ')}</span>
                        </span>
                    </div>
                    <div className="flex align-left">
                        <span>
                            <span className="font-bold">Abilities:</span>
                            <span className="ml-2">{abilities.join(', ')}</span>
                        </span>
                    </div>
                    <div className="flex align-left">
                        <span>
                            <span className="font-bold">Some Moves:</span>
                            <span className="ml-2">{moves.join(', ')}</span>
                        </span>
                    </div>
                </div>
                </div>
            </div> : <SkeletonCard /> }
        </div>
    )
}
export default CardDetail;