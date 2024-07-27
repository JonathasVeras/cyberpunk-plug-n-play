import React from "react";
import { useParams } from "react-router-dom"

const Character:React.FC = () => {
    const { id } = useParams()
    return(
        <>
        <h1>Character {id}</h1>
        </>
    )
}

export default Character;