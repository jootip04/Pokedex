import { BrowserRouter, Routes, Route } from "react-router";
import PokemonDetalhePage from "./pages/pokemonDetalhePage";
import PokedexPage from "./pages/PokedexPage";

export default function App(){
  return(
    <BrowserRouter>
    <Routes>
        <Route path="/"  element={<PokedexPage/>} />

        <Route path="/pokemon/:nome" element={<PokemonDetalhePage/>} />
    </Routes>
    </BrowserRouter>
  )
}