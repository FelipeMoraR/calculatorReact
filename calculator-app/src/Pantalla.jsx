import PropTypes from 'prop-types';

export function Pantalla({valores}){
    
    if(valores.length !== 0){
        return <div className='pantalla-calculadora'>{valores}</div>
    } else {
        return <div className='pantalla-calculadora'>---</div>
    }
}

Pantalla.propTypes = {
    valores: PropTypes.any,
    
}


