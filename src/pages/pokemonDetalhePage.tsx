import { Link, useParams } from "react-router";
import PokemonDetalhe from "../components/PokemonDetalhe";

export default function PokemonDetalhePage(){
    const {nome} = useParams<{nome: string}>();

    if(!nome){
        return (
            <div className="mx-auto max-w-md p-6 texgt-center">
                <p className="mb-4 rounded-lg bg-red-50 text-red-600">
                Pokemon não informado na URL.
                </p>

                <Link to="/" className="font-medium text-red-600 underline">
                Voltar a tela inicial.
                </Link>
            </div>
        )
    }

    return <PokemonDetalhe nome={nome}/>

}