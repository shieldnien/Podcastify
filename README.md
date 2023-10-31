
# Podcastify

Estado actual: Incompleto 

Apartados a implementar: 

- Gestionar la búsqueda para filtrar podcasts.
- Arreglar el indicador visual para que se muestre en la esquina superior derecha.
- Implementar spinners y mostrarlos hasta que los datos terminen de cargar.
- Interpretar el Html de las descripciones obtenidas de los capítulos.
- Testing con Jest.

Funcionando:

- Es Single Page Aplication.
- Permite arrancar en Modo Dev y Modo Producción.
- Utiliza URLs limpias.
- Se muestra el listado de los 100 podcasts más populares de Itunes y se almacena en localStorage mediante IDs.
- Los datos almacenados en local estarán disponibles durante un día mediante LocalStorage.
- Se utilizan enrutados delegados basados en IDs, permitiendo la navegación al pinchar sobre los elementos.

Descripción: 

Ésta aplicación es un portal que permite visualizar los 100 podcasts más populares de Itunes. 

La aplicación está desarrollada en ReactJS, y utiliza elementos de ES6 como son los "array function" para simplificar el código, entre otras técnicas y funcionalidades.
Para almacenar los datos en localStorage se utiliza la librería "localstorage-slim", el cual permite fijar un tiempo de expiración para los datos e incluso encriptarlos.
Para mejorar el arte visual de la página se utiliza el framework de CSS Tailwind, permitiéndonos usar selectores CSS (en mi caso, clases) para aplicar estilos de forma sencilla.

Instalar las dependencias: 

Para instalar las dependencias primero nos situaremos en la raíz del proyecto (donde se encuentra el package.json), en nuestro caso: 

cd podcastify

Llegados a este punto lo único que faltaría sería instalar las dependencias, para ello: 

npm install

Ejecución de la aplicación:

Tenemos dos modos de ejecución de la aplicación, modo development y modo production. En el modo development los assets se sirven sin minimizar y en el modo production se sirven concatenados y minimizados.

- Para ejecutar la aplicación en modo desarrollo debemos situarnos en la raíz del proyecto (donde se encuentra el fichero package.json) y ejecutar la siguiente orden: 

npm run dev

Esto abrirá el modo dev, normalmente en el siguiente enlace: http://localhost:5173

- Para ejecutar la aplicación en modo producción debemos situarnos en la raíz del proyecto (donde se encuentra el fichero package.json) y ejecutar la siguiente orden:

npm run build

Esta orden construye la aplicación minificada generando ficheros estáticos para producción optimizados para un mejor rendimiento y los coloca en el directorio build, el cual queda ya preparado para ser desplegado en producción.

Se puede servir con un servidor estático, usando:

npm run preview

Este comando abrirá el modo producción, normalmente en el siguiente enlace: http://localhost:4173
