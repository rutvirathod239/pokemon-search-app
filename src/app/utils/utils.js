import axios from "axios"
export const fetchPokemonList =  async (url) => {
    let filteredDetails = []
    try {
        const response = await axios.get(url);
        const result = response.data;
        let detail = { count: result.count, next: result.next, previous: result.previous } 

        if (result.results?.length) {
            const pokemonlist = result.results
            const detailsList = await Promise.all(
                pokemonlist.map(async (pokemon) => {
                    if (pokemon?.url) {
                        const detailResponse = await axios.get(pokemon.url);
                        const detailResult = detailResponse.data;
                        const image = `https://img.pokemondb.net/artwork/${pokemon.name}.jpg`;

                        return { ...detail, pokemon, detail: detailResult, image };
                    }
                    return null;
                })
            );
            filteredDetails = detailsList.filter((item) => item !== null);
            
        }
    } catch (err) {
        console.log("🚀 ~ fetchPokemonList ~ err:", err)
    }
    return filteredDetails
}