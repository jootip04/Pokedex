import {useState, useEffect} from "react"
import {buscarDetalhe, type PokemonDetalhe } from "../lib/pokeapi";
import { Carregando } from "./Carregando";
import { Link } from "react-router";
import {CoresTipos} from "../lib/tipos";


export default function PokemonDetalhe({nome}: {nome: string}){
    const [pokemon, setPokemon] = useState<PokemonDetalhe | null>(null);

    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        buscarDetalhe(nome)
        .then(setPokemon)
        .catch((e) =>  setErro(e instanceof Error ? e.message : "Erro Desconhecido!"))
        .finally(() => setCarregando(false));
    }, [nome] )

    if(carregando){
        return(
        <Carregando/>
        );
    }

    if(erro || !pokemon){
        return(
            <div className="mx-auto max-w-md p-6 text-center">
                <p className="mb-4 rounded-lg bg-red-50 text-red-600">
                    {erro ?? "Pokemon não encontrado"}
                </p>
                <Link to="/" 
                className="font-medium text-red-600 underline">
                    Voltar para a Pokédex
                </Link>
            </div>
        )
    }

    const corPrincipal = CoresTipos[pokemon.tipos [0]] ?? "bg-neutral-400";

    return(
        <div className=" min-h-screen bg-neutral-50">
            <header className={`${corPrincipal} px-6 py-8 text-white shadow-md`}>
            </header>

            <div className=" flex items-center gap-6">
                <img src={pokemon.imagem}
                    alt={pokemon.nome}
                    className="h-28 w-28 drop-shadow-lg sm:h-32 sm:w-32"/>

            </div>
        </div>
    )
}
