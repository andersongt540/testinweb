// noticias.js
const noticias = [
    "https://www.instagram.com/reel/DXKxKWKD9xj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", // Noticia 1
    "https://www.instagram.com/p/DYBHuC4Cbqm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",   // Noticia 2
    "https://www.instagram.com/p/DR5kKWfCYH_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="  // Noticia 3
];

function cargarNoticias() {
    const contenedor = document.getElementById('instagram-container');
    contenedor.innerHTML = ''; // Limpiamos el cargando

    noticias.forEach(link => {
        const blockquote = document.createElement('blockquote');
        blockquote.className = 'instagram-media';
        blockquote.setAttribute('data-instgrm-permalink', link);
        blockquote.setAttribute('data-instgrm-version', '14');
        
        // El contenido interno se genera solo con el script de Instagram
        contenedor.appendChild(blockquote);
    });

    // Re-ejecutamos el script de Instagram para que procese los nuevos bloques
    if (window.instgrm) {
        window.instgrm.Embeds.process();
    }
}

// Ejecutamos al cargar la página
document.addEventListener('DOMContentLoaded', cargarNoticias);