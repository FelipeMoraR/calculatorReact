import PropTypes from 'prop-types';

export function Pantalla({valores}){
    
    return <div>Numero en Pantalla {valores}</div>
       
}

Pantalla.propTypes = {
    valores: PropTypes.any,
    
}


