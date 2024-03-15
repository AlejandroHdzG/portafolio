const readline = require('readline');

const url = "http://jsonplaceholder.typicode.com/todos";

/* Recordatorio: Declarar las variables fuera del switch para que tengan más alcance y no generen errores molestos. */
let todosResueltos;
let todosNoResueltos;

fetch(url)
  .then(response => response.json())
  .then(response => {
    todosResueltos = response.filter(todo => todo.completed);
    todosNoResueltos = response.filter(todo => !todo.completed);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log("Menú:");
    console.log("1. Lista de todos los pendientes (solo IDs)");
    console.log("2. Lista de todos los pendientes (IDs y Títulos)");
    console.log("3. Lista de todos los pendientes sin resolver (ID y Título)");
    console.log("4. Lista de todos los pendientes resueltos (ID y Título)");
    console.log("5. Lista de todos los pendientes (IDs y userID)");
    console.log("6. Lista de todos los pendientes resueltos (ID y userID)");
    console.log("7. Lista de todos los pendientes sin resolver (ID y userID)");
    console.log("0. Salir");

    //Nota: Se utiliza rl.question para mostrar un mensaje al usuario y esperar que responda. 
    rl.question("Ingresa el número de la opción que deseas ver: ", (eleccion) => {
      switch (eleccion) {
        case "1":
          console.log("Lista de todos los pendientes (solo IDs):");
          response.forEach(elemento => {
            console.log(elemento.id);
          });
          break;

        case "2":
          console.log("Lista de todos los pendientes (IDs y Títulos):");
          response.forEach(elemento => {
            console.log(`${elemento.id}: ${elemento.title}`);
          });
          break;

        case "3":
          console.log("\nLista de todos los pendientes sin resolver (ID y Título):");
          todosNoResueltos.forEach(elemento => {
            console.log(`${elemento.id}: ${elemento.title}`);
          });
          break;

        case "4":
          console.log("\nLista de todos los pendientes resueltos (ID y Título):");
          todosResueltos.forEach(elemento => {
            console.log(`${elemento.id}: ${elemento.title}`);
          });
          break;

        case "5":
          console.log("Lista de todos los pendientes (IDs y userID):");
          response.forEach(elemento => {
            console.log(`${elemento.id}: ${elemento.userId}`);
          });
          break;

        case "6":
          console.log("\nLista de todos los pendientes resueltos (ID y userID):");
          todosResueltos.forEach(elemento => {
            console.log(`${elemento.id}: ${elemento.userId}`);
          });
          break;

        case "7":
          console.log("\nLista de todos los pendientes sin resolver (ID y userID):");
          todosNoResueltos.forEach(elemento => {
            console.log(`${elemento.id}: ${elemento.userId}`);
          });
          break;

        case "0":
          rl.close();
          break;

        default:
          console.log("Opción no válida");
          break;
      }

      rl.close();
    });
  })
  .catch(error => {
    console.error("Error al obtener la lista de pendientes:", error);
  });
