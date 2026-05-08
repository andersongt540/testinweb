// noticias.js
const noticias = [
    "https://www.instagram.com/p/DR5kKWfCYH_/", 
    "https://www.instagram.com/p/DYBHuC4Cbqm/",   
    "https://www.instagram.com/p/DXKxKWKD9xj/"  
];

function cargarNoticias() {
    const contenedor = document.getElementById('instagram-container');
    if (!contenedor) return;

    // 1. Limpiamos el contenedor (remueve el "Cargando...")
    contenedor.innerHTML = ''; 

    // 2. Inyectamos los blockquotes de Instagram con atributos explícitos
    noticias.forEach(link => {
        const blockquote = document.createElement('blockquote');
        blockquote.className = 'instagram-media';
        // Aseguramos que la URL termine correctamente para el embed
        const cleanLink = link.split('?')[0];
        blockquote.setAttribute('data-instgrm-permalink', cleanLink);
        blockquote.setAttribute('data-instgrm-version', '14');
        
        // Estilos para evitar saltos de diseño (CLS)
        blockquote.style.width = '100%';
        blockquote.style.minWidth = '326px';
        blockquote.style.margin = '1px auto';
        blockquote.style.background = '#FFF';
        blockquote.style.border = '0';
        blockquote.style.borderRadius = '3px';
        blockquote.style.boxShadow = '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)';
        
        contenedor.appendChild(blockquote);
    });

    // 3. Gestión del script con protocolo seguro explícito
    if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
        const script = document.createElement('script');
        script.src = "https://www.instagram.com/embed.js"; // HTTPS explícito para Netlify
        script.async = true;
        script.defer = true;
        script.onload = () => procesarEmbeds();
        document.body.appendChild(script);
    } else {
        procesarEmbeds();
    }
}

// Función de procesamiento con reintentos para entornos de red variables
function procesarEmbeds() {
    if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
    } else {
        // Si el script cargó pero el objeto no está listo, reintenta
        setTimeout(procesarEmbeds, 200);
    }
}

// Inicialización: 'load' es más seguro que 'DOMContentLoaded' para scripts externos
if (document.readyState === 'complete') {
    cargarNoticias();
} else {
    window.addEventListener('load', cargarNoticias);
}