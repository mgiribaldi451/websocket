const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const bp = require('body-parser')
const fs = require('fs')
const app = express()

const httpServer=new HttpServer(app)
const io = new IOServer(httpServer);
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.static('public'));
let messages = [
];

let productos = [

    {
        "id": 1,
        "Nombre": "inter",
        "Url": "https://i.ibb.co/dgjzjvK/images-q-tbn-ANd9-Gc-TUtrjy-hxo-S7itymm994-PWb1-o-SLUZMo38-Fg-usqp-CAU.jpg",
        "Precio": 2000
    },
    {
        "id": 2,
        "Nombre": "defensa y justicia",
        "Url": "https://i.ibb.co/WBzHNLv/images-q-tbn-ANd9-Gc-Rxu-I5t-AXdtt-Izamd-RH9-AMzkt-WTbk-Opk-TRk-Jg-usqp-CAU.jpg",
        "Precio": 1500

    },
    {
        "id": 3,
        "Nombre": "atletico madrid",
        "Url": "https://i.ibb.co/Z2zDQ6y/images-q-tbn-ANd9-Gc-Re-FPQu-FEjev-D6-YS2-NTIug-Fx-X-fsjkr-Jucp-BQ-usqp-CAU.jpg",
        "Precio": 2500
    }
]

/* ----------------------EJS-------------------------------- */

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index' , {productos})
})


io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages); // emitir todos los mensajes a un cliente nuevo 

    socket.on('new-message', function(data) {
        messages.push(data); // agregar mensajes a array 
        io.sockets.emit('messages', messages); //emitir a todos los clientes
        console.log(data);
        arch.save(data)
    });

    
    socket.emit('product', productos); // emitir todos los mensajes a un cliente nuevo 

    socket.on('new-product', function(data) {
        productos.push(data); // agregar productos a array 
        io.sockets.emit('product', productos); //emitir a todos los clientes
        console.log(data);
        console.log(productos);
       // arch.save(data)
    });
    
});

class Contenedor {

    constructor(file) {

        this.archivo = file;
    }

    async save(obj) {
        try {

            const contenido = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')
                let archivo = JSON.parse(contenido)
                archivo = [...archivo, obj];
                try {
                    archivo = JSON.stringify(archivo);
                    await fs.promises.writeFile(`./${this.archivo}`, archivo);
                }
                catch (err) {
                    console.log(`Error: ${err}`);
                }
            }
        catch (err) {
            console.log(`Error: ${err}`);
        }

    }
}

const arch = new Contenedor("mensajes.txt");

httpServer.listen(3000, ()=>console.log('Server ON'))


