/* ANALOGIA DE LISTA ENLAZADA

IMAGINEN QUE TENEMOS 1 ELEMENTO EN UNA LISTA, LA DIRECCION EN LA QUE LA FLECHA SIEMPRE VA A APUNTAR ES HACIA LA DERECHA
 ---  
| 1 | ---> COMO NO HAY NADA, ESTA FLECHA APUNTA A NULL
 ---  

EN EL MOMENTO QUE LE INGRESAMOS UN NUEVO NODO A LA LISTA
ESTE ULTIMO NODO VA A SER EL QUE APUNTE A NULL, PUES LOS NODOS SE AGREGAN EN LA PARTE DERECHA DE LA LISTA ES DECIR EN LA POSICION LISTA.LENGTH
 ---        ---     
| 1 |----> | 3 | ----> NULL
 ---        ---     

EL PRIMER ELEMENTO QUE SE HAYA INGRESADO VA A SER EL HEAD DE LA LISTA ES DECIR EL LISTA[0] (como tal no vamos a poder acceder a un elemento de esta forma por que en si no es un array es una linkedList, pero es para dar a entender el sistema de indices)

*/

class Nodo { // Creamos la clase Nodo
    constructor(value, next = null) {  // En el constructor, es decir los argumentos de la clase, le vamos a pedir que por cada objeto creado con la clase Nodo se necesitara un valor y un next, le ponemos un valor predeterminado al next = null para poder usarlo en el head. Es decir para el primer nodo. 
        this.value = value; // Valor
        this.next = next; // Pointer
    }
}

class ListaEnlazada { // Creamos la clase Lista Enlazada
    constructor() { // El constructor no tendra parametros
        this.head = null;  // El head inicial sera null pues la lista se crea como una lista vacia
        this.size = 0; // Y su tamaño inicial sera 0 por la misma razon
    }

    push(element) { // Agregar un nodo a la lista
        const newNode = new Nodo(element)  // Declaramos una variable que contenga al nuevo nodo con valor (element)
        if (this.size === 0) { // Si la lista esta vacia
            this.head = newNode;
        }
        else { // En caso de que la lista no este vacia
            
            let nodoActual = this.head; // Declaramos una variable que contenga a la cabeza actual de la lista 
            while (nodoActual.next) {  // Chat GPT Explica
                nodoActual = nodoActual.next;
            }
            nodoActual.next = newNode;
        }
        this.size++;
    }
    pop() { // Metodo para eliminar el ultimo nodo
        if (this.size === 0) { return }; // Si la lista esta vacia
        let nodoActual = this.head; // Hacemos referencia a la cabeza de la lista
        let prev; // Declaramos la variable prev que nos permitira contener el nodo anterior
        for (let i = 0; i < (this.size-1); i++) { // Este for lo voy a usar muchas veces
            prev = nodoActual; // Prev sera la variable que mentendra el nodoAnterior, esto con el fin de luego eliminar el ultimo nodo
            nodoActual = nodoActual.next; // Al reemplazar nodoActual con el siguiente nodo a nodoActual, estamos moviendonos a traves de la lista.
        }
        prev.next = nodoActual.next; // Con esta linea estamos diciendo, el penultimo elemento va a tener como next a null, y como penultimo.next es originalmente el ultimo elemento, lo estamos eliminando y a la vez declarando que el penultimo es el nuevo ultimo ya que apunta ahora a null
        this.size--;
    }
    del() {
        if (this.size === 0) { return }; // Si la lista esta vacia
        let nodoActual = this.head; // Hacemos referencia a la cabeza de la lista
        this.head = nodoActual.next; // Y lo reemplazamos con su nodo siguiente
        this.size--;
    }
    peekFirst(){
        if (this.size !=0) {
            return this.head; // Devolvemos a la cabeza de la lista
        }
        else {return null}
    }
    peekLast(){
        let nodoActual = this.head; // Hacemos referencia a la cabeza de la lista
        let next; // Declaramos una variable que nos permitira movernos a traves de la lista, next se cambiara con cada iteracion. Para que lo entiendan mejor recomiendo usar el debugger o que le pidan a chat gpt que les explique esto en concreto.
        if (this.size !== 0) {
            for (let i = 0; i < this.size-1; i++) { // La explicacion se da para la primera iteracion, con cada iteracion el nodoActual se mueve al siguiente nodo
                next = nodoActual.next  // Next tendra como valor el valor next del nodoActual, en la primera iteracion sera el next del head, es decir el elemento 1 en la lista. Recordar que la lista va de 0 al lenght-1
                nodoActual = next; // Ahora nos movemos un elemento a la derecha de la lista, el nodoActual sera ahora el siguiente nodo en la lista, es decir el elemento 1 de la lista.
            } // Una vez se finaliza el bucle que recorre desde el primer hasta el ultimo nodo, devolvemos el ultimo nodo
            return nodoActual; // El nodoActual es ahora el ultimo nodo de la lista
        }
        else {return null}
    }
    
    insertAtHead(value){ // Metodo que ingresa un nodo al principio de la lista, convirtiendose en la nueva cabeza. El anterior primer nodo no es eliminado
        const oldHead = this.head; // Guardamos la lista tal y como estaba antes en una variable
        this.head = new Nodo(value, oldHead); // Y reemplazamos el valor de la lista con el nuevo nodo, su pointer sera la lista anterior
        this.size++;
    }
    isEmpty(){  // Verifica si la lista enlazada está vacía.
        return this.size === 0; // Si es diferente de cero la comparacion es falsa, si es igual a cero es verdadera. Mejor que usar un if / else
    }

    size(){ //Retorna el número de nodos en la lista enlazada.
        return this.size
    }

    search(valor){ // Busca un valor en la lista y devuelve el nodo que contiene ese valor, o null si no se encuentra.
        if (this.isEmpty()) {return} // Si la lista esta vacia
        let nodoActual = this.head; // Declaramos una variable que contenga la lista
        for (let i = 0; i < this.size-1; i++) { // Recorre el ancho de la lista
            if (valor === nodoActual.value){return nodoActual} // Si el valor ingresado corresponde al value de algun nodo, se regresa ese nodo
            nodoActual = nodoActual.next // De lo contrario saltamos al siguiente nodo
        }
        return null; // No un nodo con este value
    }

    remove(valor){ // Elimina el primer nodo que contiene el valor proporcionado.
        if (this.isEmpty()) {return}// Si la lista esta vacia
        let nodoActual = this.head; // Declaramos una variable que contenga la lista
        let prev; // Declaramos la variable prev que nos permitira contener el nodo anterior
        for (let i = 0; i < this.size-1; i++) { // Recorre el ancho de la lista
            if (valor === nodoActual.value){
                prev.next = nodoActual.next; // El next del nodo anterior al que deseamos eliminar, es decir el nodo que contiene al deseado por eliminar se le reemplaza next por el siguiente nodo al que queremos eliminar. Por lo que el deseado por eliminar desaparece de la lista y los pointers quedan actualizados
                this.size--;
                break;
            } // Si el valor ingresado corresponde al value de algun nodo, se regresa ese nodo
            prev = nodoActual; // Prev sera la variable que mentendra el nodoAnterior, esto con el fin de luego eliminar el nodo que contenga el value valor
            nodoActual = nodoActual.next; // De lo contrario saltamos al siguiente nodo
        }
        return null; // No se encontro un nodo con value = valor
    }
    toArray(){ // Convierte la lista enlazada en un array, lo cual puede ser útil para ciertas operaciones o para visualización.
        let nodoActual = this.head;
        let arrayNodos = Array()
        for (let i =0 ; i < this.size ; i++){
            arrayNodos.push(nodoActual.value); // Hacemos un push al array que contendra los valores de cada nodo
            nodoActual = nodoActual.next // Pasamos al siguiente nodo
        }
        return arrayNodos
    }

    reverse(){ // Invierte el orden de los nodos en la lista enlazada.
        if (this.size === 0) {return};
        let prev = null; // Declaramos tanto el anterior como el siguiente en null, esto es necesario para el primer elemento de la nueva lista
        let nodoActual = this.head;
        let next = null; // La variable next hace referencia al nodo siguiente del nodo actual, esta variable contendra todos los nodos siguientes al actual debido a la estructura en la que esta formada la lista, donde cada nodo contiene al siguiente nodo.
        while (nodoActual  !== null) {
            next = nodoActual.next; // Aqui almacenamos todos los nodos siguientes al actual
            nodoActual.next = prev; // Ahora le decimos, que la flecha va a apuntar hacia la izquierda por lo que nuestro nodoActual next, necesita apuntar al prev. Como ejemplo la primera iteracion sera nodoActual.next = null. Porque como es el primer elemento, apunta al vacio.
            prev = nodoActual; // El prev ahora cambia de valor para contener al nodoActual, que en la siguiente iteracion sera el nodo previo al actual.
            nodoActual = next; // Nos movemos 1 nodo a la derecha
        }
    
        this.head = prev; // Finalmente, establecemos la nueva cabeza de la lista

        // Si no fue suficiente la explicacion, aqui dejo un chatgpt que lo explica https://goo.su/UEZhvvs
    }
    insertAfter(who, value){ // Inserta un nuevo nodo con el valor proporcionado después del nodo especificado en la lista. Who seria el nodo al que se esta haciendo referencia, y value seria el valor del nuevo nodo que ira despues de who
        if (this.size === 0){return}
        let nodoActual = this.head;
        let newNode; // Variable que contendra al nuevo nodo
        while (who != nodoActual.value && who != null){ // Un bucle para buscar al nodo who, who obviamente no puede ser null
            nodoActual = nodoActual.next; // No es who? pasamos al siguiente nodo
        }
        newNode = new Nodo(value, nodoActual.next); // Una vez salimos del bucle significa que encontramos el nodo, ahora tenemos que crear un nodo que contenga el valor value y en el next le ingresamos el valor del who.next para que no se pierdan los pointers entre nodos
        nodoActual.next = newNode; // Ahora el who apunta a el newNode y newNode apunta al nodo que antes apuntaba who
        this.size++;
    }
    removeAfter(who) { // Elimina el nodo que se encuentra después del nodo especificado en la lista. 
        if (this.size === 0) {return}
        let nodoActual = this.head;
        let nodoDeleted;
        let contador = 0;
        while (who != nodoActual.value && who != null){ // Un bucle para buscar al nodo who, who obviamente no puede ser null
            contador++
            nodoActual = nodoActual.next; // No es who? pasamos al siguiente nodo
        }
        if (contador === (this.size-1)) {
            return null;
        }
        nodoDeleted = nodoActual.next; // La variable que contendra a los nodos siguientes al nodo que se va a eliminar
        nodoActual.next = nodoDeleted.next; // Reemplazamos el nodo a eliminar por la variable que conteine a los siguientes
        this.size--;
    }
    getAt(index){ // Retorna el valor del nodo en la posición index (empezando desde 0) en la lista.
        if (this.size === 0) {return}
        let nodoActual = this.head;
        let i = 0;
        while (i < index && nodoActual != null){ // Un bucle para buscar al nodo who, who obviamente no puede ser null
            nodoActual = nodoActual.next; // No es who? pasamos al siguiente nodo
            i++
        }
        return nodoActual.value;
    }
    insertAt(index, value) { // Inserta un nuevo nodo con el valor proporcionado en la posición index de la lista.
        this.insertAfter(this.getAt(index-1), value)
    }
}



let lista = new ListaEnlazada();
lista.push(20);
lista.push(202);
lista.push(100);
lista.push(999);
// console.log(lista);
lista.pop();
// console.log(lista);
// console.log(lista.peekFirst());
// console.log(lista.peekLast());
lista.insertAtHead(1);
// console.log(lista);
// console.log(lista.search(202))
lista.remove(105);
console.log(lista.toArray());
console.log(lista);
lista.reverse();
console.log(lista.toArray());
console.log(lista);// Deberia ser 100, 202, 20, 1
lista.insertAfter(202, 8); // Deberia ser 100, 202, , 20, 1
console.log(lista.toArray());
lista.removeAfter(202); // Deberia ser 100, 202, 20, 1 (se elimino a 8 que se habia agregado antes)
console.log(lista.toArray());
console.log(lista.getAt(2)) // Deberia dar 20
lista.insertAt(1, 19) // Deberia dar 100, 19, 202, 20, 1
console.log(lista.toArray());