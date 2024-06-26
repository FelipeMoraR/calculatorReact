import { useState, useEffect } from 'react'
import '../styles/App.css'
import '../styles/Modal.css'
import { Boton } from './Boton.jsx'
import { Pantalla } from './Pantalla.jsx'
import { Modal } from './Modal.jsx'


function Calculator() {
  const [valorTotal, setValorTotal] = useState([]) // useState es asincrono
  const [bloquearOperador, setBloquearOperador] = useState(true)
  const [bloquearNegativo, setBloquearNegativo] = useState(false)
  const [bloquearParentesisIzq, setbloquearParentesisIzq] = useState(false)
  const [bloquearParentesisDer, setbloquearParentesisDer] = useState(false)
  let contadorParentesisIzq = 0; //Cuando un useState se ejecuta se re-renderiza el componente.
  const [contadorParentesisDer, setContadorParentesisDer] = useState(0)
 

  const [ propiedadesModal, setPropiedadesModal] = useState({
    titulo: '',
    texto: ''
  })
  const [ mostrarModal, setMostrarModal] = useState(false)

  const cerrarModal = () => {
    setMostrarModal(false)
  }

  const resultado = (valores) => {
    
    try {
      let expresion = valores.join('');
      let resultadoParcial = new Function('return ' + expresion)(); //Crea una funcion que retorna la expresion creada 
      
      setValorTotal([resultadoParcial])
      setContadorParentesisDer(0) //Reseteamos el contador cuando le da a ver resultado
    } catch (error) {
      
      mensajeErrorResultado(valores)
      setContadorParentesisDer(0)
      limpiar()
    }
  }

  const mensajeErrorResultado = (resultado) => {
    let resultadoUnido = resultado.join('')
    if( resultadoUnido.includes('()') ) {
      setPropiedadesModal({
        titulo: 'Error',
        texto: 'No pueden haber parentesis vacios'
      })
    } else {
      setPropiedadesModal({
        titulo: 'Error',
        texto: 'No pueden haber parentesis sin cerrar'
      })
    }
    setMostrarModal(true)
  }

  const actualizarValor = (valor) => {
    setValorTotal(prev => [...prev,valor]) //Declaras una variable que contiene todos los valores previos
    //del array y le agregas el nuevo valor.
  }

  const borrarUltimoValor = (valorTotal) => {
    let ultimoValor = valorTotal[valorTotal.length - 1]
    if(ultimoValor == ')'){
      setContadorParentesisDer(contadorParentesisDer - 1)
    }
    let nuevoArray = valorTotal.slice(0, -1);
    setValorTotal(nuevoArray)
  }

  const clickParentesisDer = (valor) => {
    setValorTotal(prev => [...prev,valor])
    setContadorParentesisDer(contadorParentesisDer + 1)
  }

  const habilitarParentesisDer = (valorTotal) => {
    valorTotal.forEach((valor) => {
      if(valor === '('){
        contadorParentesisIzq = contadorParentesisIzq + 1;
      }
    })

    if(contadorParentesisIzq != contadorParentesisDer){
      setbloquearParentesisDer(false)
    } else {
      setbloquearParentesisDer(true)
    }
    
  }

  const verificarUltimoValor = (valoresPeticion) => {
    let ultimoValor = valoresPeticion[valoresPeticion.length - 1] //Sacamos el ultimo valor del array, pues es el unico valor que nos interesa para validar el tema de los operadores
   
    if(esUnOperador(ultimoValor)){ //Si es un operador
      setBloquearOperador(true)
      setbloquearParentesisIzq(false)
    } else { // Si el ultimo valor del array no es un operador hay que dejar los operadores habilitados
      setBloquearOperador(false)
      setBloquearNegativo(false) //Este useState está apartado al resto pues se comporta de manera distinta
      setbloquearParentesisIzq(true)
    } 
  } 

  const esUnOperador = (valor)  => {
    switch(valor){
      case '+':
        setBloquearNegativo(false) 
        return true
      
      case '*':
        setBloquearNegativo(false)
        return true
      
      case '/':
        setBloquearNegativo(false)
        return true
  
      case '-':
        setBloquearNegativo(true)
        return true
      case '(': //Controlo que si el ultimo valor es un ( los operadores se bloquean para evitar esta configuracion (*2-2)
        setBloquearNegativo(false)
        return true

      default:
        return false
    }
  }

  const limpiar = () => {
    setValorTotal([])
  }

  useEffect(() => {
    if (valorTotal.length == 0){
      setBloquearOperador(true)
      setBloquearNegativo(false) 
      setContadorParentesisDer(0) //Reseteamos el contador si borra todo 
      setbloquearParentesisIzq(false)
    } else {
      verificarUltimoValor(valorTotal)
    } 

    habilitarParentesisDer(valorTotal) //Esto se ejecuta independientemente de si hay o no elementos en la pantalla
    

  }, [valorTotal]);


  return (
    <>
      { mostrarModal && ( //Si mostralModal es true renderiza el modal, si no, no.
        <Modal 
          titulo = {propiedadesModal.titulo}
          texto = {propiedadesModal.texto}
          onClose = {cerrarModal}
        >
          
        </Modal>
      )}

      <div className='calculadora'>
        <Pantalla valores={valorTotal}></Pantalla>

        <div className='tablero-calculadora'>
          <div className='numeros-calculadora'>
            <Boton valor = {1} trabajo = {actualizarValor} ></Boton>
            <Boton valor = {2} trabajo = {actualizarValor} ></Boton>
            <Boton valor = {3} trabajo = {actualizarValor} ></Boton>
            <Boton valor = {4} trabajo = {actualizarValor} ></Boton>
            <Boton valor = {5} trabajo = {actualizarValor} ></Boton>
            <Boton valor = {6} trabajo = {actualizarValor} ></Boton>
            <Boton valor = {7} trabajo = {actualizarValor} ></Boton>
            <Boton valor = {8} trabajo = {actualizarValor} ></Boton>
            <Boton valor = {9} trabajo = {actualizarValor} ></Boton>
            <Boton valor = {0} trabajo = {actualizarValor} ></Boton>
          </div>

          <div className='panel-operaciones-calculadora'>
            <div className='operaciones-calculadora'>
              <Boton valor={'+'} trabajo = {actualizarValor} desactivado = {bloquearOperador} ></Boton>
              <Boton valor={'*'} trabajo = {actualizarValor} desactivado = {bloquearOperador} ></Boton>
              <Boton valor={'-'} trabajo = {actualizarValor} desactivado = {bloquearNegativo} ></Boton>
              <Boton valor={'/'} trabajo = {actualizarValor} desactivado = {bloquearOperador} ></Boton>
              <Boton valor={'('} trabajo = {actualizarValor} desactivado = {bloquearParentesisIzq} ></Boton>
              <Boton valor={')'} trabajo = {clickParentesisDer} desactivado = {bloquearParentesisDer} ></Boton>
            </div>

            <div className='operaciones-especiales-calculadora'>
              <Boton valor={'='} trabajo = {resultado} valores = {valorTotal} desactivado = {bloquearOperador} ></Boton>
              <Boton valor={'C'} trabajo = {limpiar} valores = {valorTotal}></Boton>
              <Boton valor={'⌫'} trabajo = {borrarUltimoValor} valores = {valorTotal}> </Boton>
            </div>
          </div>
        </div>

      </div>
      
    </>
  )
}

export default Calculator
