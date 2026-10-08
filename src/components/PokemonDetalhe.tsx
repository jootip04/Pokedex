import {useState, useEffect} from "react"
import {buscarDetalhe, type PokemonDetalhe } from "../lib/pokeapi";
import { Carregando } from "./carregando";
import { Link } from "react-router";
import {CoresTipos} from "../lib/tipos";


export function PokemonDetalhe({nome}: {nome: string}){
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
        <>
        </>
    )
}
