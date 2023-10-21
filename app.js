//modulos a exportar
require('colors');
const fs = require('fs');

//definimos una constante datos archivos que va a exportar la carpeta de datos JSON
const datosArchivo =require('./datos.json');
/*definimos una funcion asincronica esto nos sirve para ejecutar funciones de manera asíncrona
 Esto permite que la función no bloquee la ejecución del código principal y, por lo tanto, el buen 
 funcionamiento 
*/
async function main() {
  console.clear();
  console.log('***************************'.blue);
  console.log('*'.blue+'       PROYECTO CLASES   *'.blue);
  console.log('****************************\n'.blue);

//Definimos la clase producto
  class Producto {
    #codigoProducto;
    #nombreProducto;
    #inventarioProducto;
    #precioProducto;
//utilizamos el metodo constructor
    constructor() {
      this.#codigoProducto = '';
      this.#nombreProducto = '';
      this.#inventarioProducto = 0;
      this.#precioProducto = 0;
    }
//definimos metodos setter y getter
    set setCodigoProducto(value) {
      this.#codigoProducto = value;

    }

    get getCodigoProducto() {
      return this.#codigoProducto;
    }

    set setNombreProducto(value) {
      this.#nombreProducto = value;
    }

    get getNombreProducto() {
      return this.#nombreProducto;
    }

    set setInventarioProducto(value) {
      this.#inventarioProducto = value;
    }

    get getInventarioProducto() {
      return this.#inventarioProducto;
    }

    set setPrecioProducto(value) {
      this.#precioProducto = value;
    }

    get getPrecioProducto() {
      return this.#precioProducto;
    }
  }
//definimos la clase productos tienda
  class ProductosTienda{
    #listaProductos;
//utilizamos el metodo constructor
    constructor() {
      this.#listaProductos = [];
    }
//metodos setter y getter
    get getListaProductos(){
      return this.#listaProductos;
    }
//definimos el metodo que es de productos tienda llamado cargar archivos productos
     cargaArchivosProductos(){
//utilizamos un contador
      let contador = 0;
      //usamos el if-else para determinar si el ciclo se cumple
      if (datosArchivo.length > 0) {
        datosArchivo.forEach(objeto => {
          contador++;
          let producto = new Producto;
          producto.setCodigoProducto = objeto.codigoProducto;
          producto.setNombreProducto = objeto.nombreProducto;
          producto.setInventarioProducto = objeto.invetarioProducto;
          producto.setPrecioProducto = objeto.precioProducto;
          this.#listaProductos.push(producto);
        });

      } else {
        console.log(`error, el archivo datos.json no contiene datos\n`.green);
      }
      console.log(`Total de productos cargados ==> `.blue + `${contador}`.red);
    }
//usamos el metodo graba archivos productos
    grabaArchivosProductos(){
/*Esta parte del código se utiliza para crear múltiples instancias de una clase en base 
      a un conjunto de datos (en este caso, los productos)*/
      const instanciaClaseAObjetos = this.getListaProductos.map(producto => {
        return {
          codigoProducto: producto.getCodigoProducto,
          nombreProducto: producto.getnombreProducto,
          inventarioProducto: producto.getInventarioProducto,
          precioProducto: producto.getPrecioProducto
        };
      });
// convertir de array a cadena JSON
      const cadenaJson = JSON.stringify(instanciaClaseAObjetos, null, 2);
//variable con el nombre del archivo
      const nombreArchivo = 'datos.json';
//grabar la cadena JSON en el archivo
      fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');
//mensaje que se muestra en la consola
      console.log(`DATOS GUARDADOS EN ${nombreArchivo}`.violet);

    }

    mostrarProductos() {
      this.getListaProductos.forEach(producto => {
        console.log(`|   ` + producto.getCodigoProducto + `   |` +
                    `   ` + producto.getNombreProducto + `   |` + 
                    `   ` + producto.getInventarioProducto + `   |` + 
                    `   ` + producto.getPrecioProducto + `   |`);
      })
    }

  }

  /*Esta parte del código crea una nueva instancia de la clase ProductosTienda y
   la almacena en la variable productosTienda. */
  let productosTienda = new ProductosTienda;

  productosTienda.cargaArchivosProductos();

  console.log(`Datos apertura tienda`.violet);
  
  productosTienda.mostrarProductos();

  productosTienda.getListaProductos.forEach(producto => {
    producto.setInventarioProducto = Math.floor(Math.random() * (20 - 1) + 1);
  });

  console.log(`Datos de cierre de tienda`.green);
  productosTienda.mostrarProductos();

  productosTienda.grabaArchivosProductos();

}

main();