Practico Websocket


Pre - requisitos

- Dependencias utilizadas: 
   "dependencies": {
    "cross-fetch": "^3.1.4",
    "ejs": "^3.1.6",
    "express": "^4.17.2",
    "fs-js": "^1.0.6",
    "node-fetch": "^3.1.0",
    "nodemon": "^2.0.15",
    "socket.io": "^4.4.1"
  },

  - Ejecucion:

    Path> nodemon server.js


- Funcionalidades del codigo


- Se genero variable "productos" como array de objetos para tener algunos valores precargados.
    Luego todos los producstos cargados en el form se iran a ir agregando y mostrando por el websocket

- Se uso EJS como plantillas

- El formulario se carga y envia  a  productos para actualizar la tabla

- Se genero chat con websocket


- Se guardan los mensajes en un archivo llamado "mensajes.txt" para que queden almacenados en el servidor y recuperarlos si se quisiese.




 - Index.js

 - se utiliza para ser el clado del cliente del websocket que se comunica con el servidor , se implementa tanto como para mensajes , como tambien para la tabla de productos


 - socket.on('messages', function(data) { 
  console.log(data);
  render(data);
- });

- socket.on('product', function(data) { 
-    console.log(data);
-    renderProd(data);
-  });



- Variable productos solo a moda de inicializar la tabla de productos con algo y luego se van sumando los que se vayan cargando por el form.

- let productos = [

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
- ]



- Se genera class contenedor para guardar los mensajes enviados por todos los clientes en un archivo "mensaje.txt" por si mas adelante se utilizaria.

 - class Contenedor {

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
- }