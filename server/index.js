const { text } = require('express')
const { Socket } = require('socket.io')

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server,{cors:{origin: 'http://localhost:5173'}})

//porta 
const PORT = 3001

//fazendo uma conexão com o front
io.on('connection', socket =>{
    console.log('usuario conectado', socket.id);

        //evento disconnect é um evento reservado para saber o motivo da desconexão
        socket.on('disconnect', reason =>{
            console.log('usuario desconectado', socket.id)
        })
        //"on" estara "escutando" o que vem do front
        socket.on('set_username', username => {
        //data é uma propriedade so socket que consegue armazenar qualquer informação
        socket.data.username = username      
    })
        socket.on('message', text => {
            io.emit('receive_message', {
            text,
            authorId: socket.id,
            author: socket.data.username
                })
    })
})

server.listen(PORT, () => console.log('server running...'))