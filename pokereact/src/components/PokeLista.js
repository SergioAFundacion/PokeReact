import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PokeLista = (props) => {
    
    const [pokemons, setPokemons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon")
        .then(response => {
            setPokemons(response.data.results);
        });
    }, []);


    
    const funcionNavegarASnivy = () => {
        navigate("/pokemon/195")
    }

    const funcionNavegar = () => {
        //navigate("/pokemon/" + p)
        navigate(`/pokemon/${p}`)
    }

    return <div>
        <button onClick={funcionNavegarASnivy}>Navegar A Snivy</button>
        <Link to="/pokemon/25">Ir a Pikachu</Link>
        <h1>Lista</h1>
        { pokemons.map(p => {
            return <>
                <p>Este pokemon es {p.name}</p>
                <div onClick={() => {navigate(`/pokemon/${p.name}`)}}>Navegar</div>
                <Link to= {"pokemon/"+p.name}>Navegar</Link>
            </>
        }
        )}
    </div>
}

export default PokeLista;