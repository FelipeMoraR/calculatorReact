import PropTypes from 'prop-types';

export function Boton({ valor, trabajo, valores, desactivado }) {

    switch (valor){
      case '=':
        return (
          <>
            <button onClick={() => trabajo(valores)} disabled = {desactivado}> {valor} </button>       
          </>
        )
        case '⌫':
          return (
            <>
              <button onClick={() => trabajo(valores)} > {valor} </button>       
            </>
          )
        case 'C':
          return (
            <>
              <button onClick={() => trabajo()}> {valor} </button>       
            </>
          )

        case '+':
          return (
            <>
              <button onClick={() => trabajo(valor)} disabled = {desactivado}> {valor} </button>       
            </>
          )

        case '-':
          return (
            <>
              <button onClick={() => trabajo(valor)} disabled = {desactivado}> {valor} </button>       
            </>
          )

        case '*':
          return (
            <>
              <button onClick={() => trabajo(valor)} disabled = {desactivado}> {valor} </button>       
            </>
          )

        case '/':
          return (
            <>
              <button onClick={() => trabajo(valor)} disabled = {desactivado}> {valor} </button>       
            </>
          )

        case '(':
          return (
            <>
              <button onClick={() => trabajo(valor)} disabled = {desactivado}> {valor} </button>       
            </>
          )

        case ')':
          return (
            <>
              <button onClick={() => trabajo(valor)} disabled = {desactivado}> {valor} </button>       
            </>
          )
          
        default:
          return (
            <>
              <button onClick={() => trabajo(valor)}> {valor} </button>       
            </>
          )
          
    }
  
}

Boton.propTypes = {
    valor: PropTypes.any.isRequired,
    trabajo: PropTypes.func,
    valores: PropTypes.any,
    desactivado: PropTypes.bool
}