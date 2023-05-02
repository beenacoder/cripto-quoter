import { useState, useEffect } from "react";
import styled from "@emotion/styled"; 
import ImagenCripto from './assets/img/imagen-criptos.png'
import Formulario from "./components/Formulario";




function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});

  useEffect(() => {
    //Prevenimos la primera ejecucion con un if Object.keys...
    if(Object.keys(monedas).length > 0) {
      const cotizarCripto = async () =>{
        const {moneda, monedaCripto} = monedas;

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${monedaCripto}&tsyms=${moneda}`
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado.DISPLAY[monedaCripto][moneda]);
      }

      cotizarCripto();

    }
    },[monedas])

  return (
    <Contenedor>
      <Imagen 
        src={ImagenCripto}
        alt="Imagen Cripto Monedas"
      />

      <div>
        <Heading>
          Cotiza Criptomonedas al instante
        </Heading>
        <Formulario 
          setMonedas={setMonedas}
        />
      </div>
    </Contenedor>
  )
}




//--------------STYLED COMPONENTS--------------

const Contenedor = styled.div`
  max-width:900px;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight:700;
  margin-top:80px;
  margin-bottom: 50px;
  font-size:34px;

  &::after {
    content:  '';
    width: 120px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`

export default App
