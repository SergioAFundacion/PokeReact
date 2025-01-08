import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Pokemon = (props) => {
    const [nivel, setNivel] = useState(1);
    const [nombre, setNombre] = useState("");
    const [imgFrontUrl, setImgFrontUrl] = useState();
    const [imgBackUrl, setImgBackUrl] = useState();
    const [baseHP, setBaseHP] = useState();
    const [baseAttack, setBaseAttack] = useState();
    const [baseDefense, setBaseDefense] = useState();
    
    const params = useParams();

    useEffect(() => {
    //La sintaxis mas moderna es async-await
        axios.get("https://pokeapi.co/api/v2/pokemon/" + ID)
            .then(response => { 
                setNombre(response.data.name)
                setImgFrontUrl(response.data.sprites.front_default)
                setImgBackUrl(response.data.sprites.back_default)
                setBaseHP(getStat("hp",(response.data.stats)))
                setBaseAttack(getStat("attack",(response.data.stats)))
                setBaseDefense(getStat("defense",(response.data.stats)))
        })
    }, []);

    const ID = params.id;

    function getStat(nombreStat, arrayStats) {
        const filteredArray = arrayStats.filter(s => s.stat.name === nombreStat)
        if (filteredArray.length === 0) {
            return -1
        }
        return filteredArray[0].base_stat
    }

    const onSubirNivel = (event) => {
        setNivel(n => n + 1)
    }

    const onBajarNivel = (event) => {
        setNivel(n => n - 1)
    }

    const calcularHP = () => {
        //toDo: usar la fórmula real, esta es inventada.
        return baseHP + (nivel * 3);
    }

    const calcularAtaque = () => {
        return baseAttack + (nivel * 2);
    }

    const calcularDefensa = () => {
        return baseDefense + (nivel * 2);
    }

    return <div>
        <h1>{nombre}</h1>
        <img src={imgFrontUrl} />
        <img src={imgBackUrl}/>
        <h2>Nivel: {nivel}</h2>
        <button onClick={onBajarNivel}>Bajar Nivel</button>
        <button onClick={onSubirNivel}>Subir Nivel</button>
        <p>HP: {calcularHP()}</p>
        <p>Ataque: {calcularAtaque()}</p>
        <p>Defensa: {calcularDefensa()}</p>
    </div>
}

export default Pokemon;