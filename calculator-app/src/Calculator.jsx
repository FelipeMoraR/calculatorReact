import { useState, useEffect } from 'react'
import './App.css'
import { Boton } from './Boton.jsx'
import { Pantalla } from './Pantalla.jsx'

function Calculator() {
  const [valorTotal, setValorTotal] = useState([]) // useState es asincrono
  const [bloquearOperador, setBloquearOperador] = useState(true)
  const [bloquearNegativo, setBloquearNegativo] = useState(false)
  const [bloquearParentesis, setbloquearParentesis] = useState(false)

  const actualizarValor = (valor) => {
    setValorTotal(prev => [...prev,valor]) //Declaras una variable que contiene todos los valores previos
    //del array y le agregas el nuevo valor.
  }

  const resultado = (valores) => {
    try {
      let resultadoParcial = eval(valores.join('')); //El eval hace que el array quede como si lo hayas escrito a mano 
      setValorTotal([resultadoParcial])
    } catch (error) {
      console.error('Ocurrio un error ', error)
    }
  }

  const verificarParentesis = (ultimoValor) => {
    
  }

  const verificarUltimoValor = (valoresPeticion) => {
    let ultimoValor = valoresPeticion[valoresPeticion.length - 1] //Sacamos el ultimo valor del array, pues es el unico valor que nos interesa para validar el tema de los operadores
    verificarParentesis(ultimoValor)
    
    if(esUnOperador(ultimoValor)){
      setBloquearOperador(true)
    } else { // Si el ultimo valor del array no es un operador hay que dejar los operadores habilitados
      setBloquearOperador(false)
      setBloquearNegativo(false) 
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
    } else {
      verificarUltimoValor(valorTotal)
    } 
  }, [valorTotal]);

  

  return (
    <>
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

          <div className='operaciones-calculadora'>
            <Boton valor={'+'} trabajo = {actualizarValor} desactivado = {bloquearOperador} ></Boton>
            <Boton valor={'*'} trabajo = {actualizarValor} desactivado = {bloquearOperador} ></Boton>
            <Boton valor={'-'} trabajo = {actualizarValor} desactivado = {bloquearNegativo} ></Boton>
            <Boton valor={'/'} trabajo = {actualizarValor} desactivado = {bloquearOperador} ></Boton>
            <Boton valor={'('} trabajo = {actualizarValor} desactivado = {bloquearParentesis} ></Boton>
            <Boton valor={')'} trabajo = {actualizarValor} desactivado = {bloquearParentesis} ></Boton>
            <Boton valor={'='} trabajo = {resultado} valores = {valorTotal} desactivado = {bloquearOperador} ></Boton>
            <Boton valor={'C'} trabajo = {limpiar} valores = {valorTotal}></Boton>
          </div>
          
        </div>

      </div>
      
    </>
  )
}

export default Calculator
