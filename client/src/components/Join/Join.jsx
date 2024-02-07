import React, {useRef} from 'react'
import io from 'socket.io-client'

export default function Join({setChatVisibility, setSocket}) {

    const usernameRef = useRef()

    const handleSubmit = async () =>{
        const username = usernameRef.current.value
        //o trim nao ira contar os espaços
        if(!username.trim()) return
        //se conectando com o back, pela porta criada
        const socket = await io.connect('http://localhost:3001')
        //função emit serve para emitir eventos
        socket.emit('set_username', username)
        setSocket(socket)
        setChatVisibility(true)
        
    }

  return (
    <div>
        <h1>join</h1>
        <input type="text"  ref={usernameRef} placeholder='Nome do usuario' />
        <button onClick={()=>handleSubmit()}>Entrar</button>
    </div>
  )
}
