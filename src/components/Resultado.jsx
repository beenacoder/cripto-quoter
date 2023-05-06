import styled from '@emotion/styled';

const Resultado = ({resultado}) => {

    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultado; 


    return (
        <div> 
           <p>El precio es de: <span>{PRICE}</span></p>
           <p>El precio mas alto del día: <span>{HIGHDAY}</span></p>
           <p>El precio mas bajo del día: <span>{LOWDAY}</span></p>
           <p>Variación de las últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></p>
           <p>Última actualización: <span>{LASTUPDATE}</span></p>

        </div>
    )
}

export default Resultado;