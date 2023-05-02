import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from '../data/monedas';
import Error from "./Error";



const Formulario = ({setMonedas}) => {
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);


    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas);
    const [monedaCripto, SelectMonedasCripto] = useSelectMonedas('Elige tu CriptoMoneda', criptos);

 

    useEffect(()=>{
        const consultaApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            const arrayCripto = resultado.Data.map(cripto => {

                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }

                //Si no ponemos el return el array nos devuelve undefined
                return objeto;
            })
            setCriptos(arrayCripto);
        }
        consultaApi();
    },[]);

    const handleSubmit = e => {
        e.preventDefault();

        if([moneda, monedaCripto].includes('')){
            setError(true)
            return 
        }
        setError(false);
        setMonedas({
            moneda, monedaCripto
        })
    }

    return (
        <>
            {error && <Error> Todos los campos son obligatorios </Error>} 
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas />

                <SelectMonedasCripto />
                
                <InputSubmit 
                    type="submit" 
                    value="Cotizar" 
                />
            </form>
        
        </>
    )
}









// ---------------STYLED COMPONENTS----------------

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    text-align: center;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
    }
`



export default Formulario

