import { useEffect, useMemo, useState } from "react"
import type { PokemonResumo } from "./types"
import { buscarTodosPokemons } from "./lib/pokeapi";
import PokemonCard from "./components/PokemonCard";
import LogoPokebola from "./components/logoPokebola";


const QUANTIDADE_PADRAO = 24;
const LIMITE_RESULTADOS = 30;

function App() {
  
  const [pokemons, setPokemons] = useState<PokemonResumo[]>([]);
  const [busca, setBusca] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  //mudança feita por mim do botão de ver mais.
  const [quantidadeExibida, setQuantidadeExibida] = useState(QUANTIDADE_PADRAO);
  //acabou alteração 

  useEffect(() => {
    buscarTodosPokemons()
    .then(setPokemons)
    .catch((e) => setErro(e instanceof Error ? e.message : "Erro desconhecido"))
    .finally(() => setCarregando(false));

  }, []);

  const termo = busca.trim().toLocaleLowerCase()

  const encontrados = useMemo(
    () => (termo ? pokemons.filter((p) => p.nome.includes(termo))
    : pokemons), [pokemons, termo]);

    const exibidos = termo ? encontrados.slice(0, LIMITE_RESULTADOS)
      : pokemons.slice(0, quantidadeExibida);   //Alteração feita no parentese de Quantidade_padrão para QuantidadeExibida

  if(carregando){
    return(
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-500 border-t-transparent">
        </div>
      </div>
    )
  }

if(erro){
  return(
    <div className="mx-auto max-w-md p-6 text-center">
      <p className="bg-red-50 p-4 text-red-600">{erro}</p>
    </div>
  );
}

  return(
    
    <div className="min-h-screen bg-neutral-50">
      
      <header className="bg-linear-to-r from-red-600
       to-red-500 px-6 py-6 text-white shadow-md  border-b-6  border-black rounded-full border-6">
          <div className=" mx-auto flex max-w-4xl
            items-center  gap-2">
            <LogoPokebola/>
              <div>
                <h1 className="text-4xl font-bold">Pokedéx</h1>
                  <p className="text-red-100">
                    Explore os pokémons usando a PokeAPI</p>
              </div>
          </div>
      </header>

      <main className="mx-auto max-w-4xl p-6">
        <input className="mb-2 w-full rounded-full border
          border-neutral-200 bg-white px-5 py-3
          shadow-sm outline-none
          focus:border-red-400 focus:ring-2
          focus:ring-red-300"
         placeholder="Busque qualquer Pokémon pelo nome..."
         value={busca}
         onChange={(e) => setBusca(e.target.value)} 
        /> 


        <div className="grid grid-cols-2 gap-6
          sm:grid-cols- md:grid-cols-4 ">
          {exibidos.map((item) => (
            <PokemonCard
              key={item.id} 
              id={item.id}
              nome={item.nome}
              imagem={item.imagem}
            />
          ))}   
          </div> 


          {exibidos.length === 0 && (
            <p className="mt-10 text-center text-1xl font-semibold text-neutral-500">
              Nenhum pokémon encontrado com esse nome.
            </p>
          )}

         <button className="flex items-center gap-2 mt-4 bg-white hover:bg-red-500 hover:text-white 
         hover:border-black shadow-lg  py-4 px-4 border rounded-full border-6-black 
         transition hover:-translate-y-2 "
         onClick = { () => setQuantidadeExibida(atual => (atual + 24))}>Ver mais</button>
      

        </main>

        <footer className="py-6 text-center text-xs 
              text-neutral-400">
                Dados fornecidos pela {" "}
            <a className="underline"
              href="https://pokeapi.co"
              target="_blank"
              rel="noreferrer"> PokeAPI
            </a>
        </footer>

      </div>
  )
}

export default App
