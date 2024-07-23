let input = document.getElementById('input');
let boton = document.getElementById('miboton');
var lista = document.getElementById('lista');
let archivos = 'movies.js';

function buscar() {
    lista.innerHTML = " ";

    var busqueda = input.value.toLowerCase();
    peliculas.forEach(function (genero) {
        genero.contenido.contenido.forEach(function (subgenero) {
            subgenero.peliculas.forEach(function (pelicula) {
                if (pelicula.titulo.toLowerCase().includes(busqueda)) {
                    var item = document.createElement('div');
                    item.className = "card bg-dark text-white mb-3";
                    item.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${pelicula.titulo}</h5>
                            <p class="card-text">Año: ${pelicula.contenido.año}</p>
                            <p class="card-text">Director: ${pelicula.contenido.director}</p>
                        </div>
                    `;
                    lista.appendChild(item);
                }

            });
        });

    });
}

boton.addEventListener('click', buscar);