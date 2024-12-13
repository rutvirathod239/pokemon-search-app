import PokemonHome from "./component/Home";

export default function Home() {  
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Pokemon Search App</h1>
      </div>
      <PokemonHome />

    </div>
  );
}
