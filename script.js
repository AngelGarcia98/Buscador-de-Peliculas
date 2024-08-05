document.addEventListener('DOMContentLoaded', function () {
    // Inicialización del carrusel de Splide.js
    new Splide('#image-carousel', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        autoplay: true,
        interval: 3000,
        pauseOnHover: true,
        pagination: true,
        arrows: true,
    }).mount();

    const input = document.getElementById('input');
    const boton = document.getElementById('miboton');
    const lista = document.getElementById('lista');
    const userLinks = document.querySelectorAll('.users-link');
    let currentUser = null;

    function buscar() {
        lista.innerHTML = "";

        if (!currentUser) {
            alert("Selecciona un usuario");
            return;
        }

        const busqueda = input.value.toLowerCase();
        peliculas.forEach(function (genero) {
            genero.contenido.contenido.forEach(function (subgenero) {
                subgenero.peliculas.forEach(function (pelicula) {
                    if (pelicula.titulo.toLowerCase().includes(busqueda)) {
                        if (esPeliculaPermitida(pelicula.contenido.clasificacion)) {
                            const item = document.createElement('div');
                            item.className = "card bg-white text-gray-900 p-4 rounded-md shadow-md mb-3";
                            item.innerHTML = `
                                <h5 class="text-xl font-bold">${pelicula.titulo}</h5>
                                <p class="text-sm">Año: ${pelicula.contenido.año}</p>
                                <p class="text-sm">Director: ${pelicula.contenido.director}</p>
                                <p class="text-sm">Clasificación: ${pelicula.contenido.clasificacion}</p>
                            `;
                            lista.appendChild(item);
                        }
                    }
                });
            });
        });
    }

    function esPeliculaPermitida(clasificacion) {
        const edad = currentUser.Edad;
        if (edad <= 8) {
            return clasificacion === 'A' || clasificacion === 'B-12';
        } else if (edad <= 13) {
            return clasificacion === 'A' || clasificacion === 'B-12' || clasificacion === 'B-15';
        } else {
            return true;
        }
    }

    userLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // Remove active class from all links
            userLinks.forEach(function (link) {
                link.classList.remove('bg-gray-600');
            });

            // Add active class to the clicked link
            this.classList.add('bg-gray-600');

            currentUser = obtenerUsuarioPorNombre(this.getAttribute('data-nombre'));
            console.log("Usuario seleccionado:", currentUser);
        });
    });

    // Función para obtener los detalles del usuario por su nombre
    function obtenerUsuarioPorNombre(nombre) {
        for (let grupo of usuarios) {
            for (let subgrupo of grupo.contenido.contenido) {
                for (let persona of subgrupo.personas) {
                    if (persona.nombre === nombre) {
                        return persona.contenido;
                    }
                }
            }
        }
        return null;
    }

    boton.addEventListener('click', buscar);
});



