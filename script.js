/**
 * ARCHIVO: js/script.js
 * DESCRIPCIÓN: Lógica unificada para el Centro Médico Loira
 */

// 1. BASE DE DATOS DE ESPECIALISTAS
const medicalData = {
    "ALERGOLOGIA E INMUNOLOGIA": [{ name: "DR. GUILLERMO BOGGIANO", tel: "584142450930" }],
    "ANATOMIA PATOLOGICA": [
        { name: "DR. ARMANDO RODRIGUEZ", tel: "584166309016" },
        { name: "DRA. YANEIA DE SULBARAN", tel: "584143281451" },
        { name: "DR. JOSE SULBARAN", tel: "584143096260" },
        { name: "DR. JESUS ADAN ROMERO", tel: "584149200092" }
    ],
    "ANESTESIOLOGIA": [
        { name: "DRA. FRANCA FRANCHI", tel: "584142650007" },
        { name: "DRA. YAMELLY DE PAPALE", tel: "584166254333" },
        { name: "DR. EDGARDO GOSEN", tel: "584147922508" },
        { name: "DR. SERGIO HERNANDEZ", tel: "58424133710" },
        { name: "DR. ABDALLA HONSANI", tel: "584143239718" },
        { name: "DR. PANFILIO PAPALE", tel: "584166254333" },
        { name: "DR. TEODORO PEREZ", tel: "584149292096" },
        { name: "DR. GUSTAVO RAMIREZ", tel: "584142371020" },
        { name: "DR. MILTON RODRIGUEZ", tel: "584142743071" },
        { name: "DRA. INGRID SALGREDO", tel: "584149198549" }
    ],
    "CARDIOLOGIA": [
        { name: "DRA. ZUNILDE PAREDES", tel: "584143210260" },
        { name: "DRA. MARIA PELLINO", tel: "584143379027" },
        { name: "DR. MANUEL CARUJO", tel: "584143206992" },
        { name: "DR. NELSON CARRILLO", tel: "584143385526" },
        { name: "DR. JOSE ANGEL BRITO", tel: "584163835071" },
        { name: "DR. JOSE GREGORIO MONTERO", tel: "584241251347" }
    ],
    "CIRUGIA GENERAL": [
        { name: "DR. DAVID ARANA", tel: "584149307399" },
        { name: "DR. FELIX ANZOLA", tel: "58416271819" },
        { name: "DR. JUAN ISAAC", tel: "584166225393" },
        { name: "DR. VICTOR MARTELO", tel: "584143259937" },
        { name: "DRA. DIANA LUCIA FRANCO", tel: "584166070081" }
    ],
    "GASTROENTEROLOGIA": [
        { name: "DR. RONALDO SOLANO S.", tel: "584246543735" },
        { name: "DRA. NELLY ALVAREZ DE ESLAVA", tel: "584166398093" },
        { name: "DR. FREDDY DAVILA", tel: "584143088545" },
        { name: "DRA. MIREYA GONZALEZ", tel: "584126237291" }
    ],
    "GINECO-OBSTETRA": [
        { name: "DRA. DORA SILVA", tel: "584142321388" },
        { name: "DR. JOSE MANZANO", tel: "584166248388" },
        { name: "DRA. MARIA LISSETTE THEN M.", tel: "584141347680" },
        { name: "DRA. SAMANTHA SMITH", tel: "584269187883" }
    ],
    "PEDIATRIA": [
        { name: "DR. GUILLERMO DOMINGUEZ", tel: "584166130209" },
        { name: "DRA. ANNA ROCCO", tel: "584269187883" },
        { name: "DR. ROBERTO MANGUPLI", tel: "584143247621" },
        { name: "DR. ALFREDO ZAJIA", tel: "584143217178" }
    ],
    "TRAUMATOLOGIA": [
        { name: "DR. ALEXIS RODRIGUEZ", tel: "584142611613" },
        { name: "DRA. ADRIANA CEDEÑO", tel: "584268126800" },
        { name: "DR. JORGE OSTOS", tel: "584141297378" }
    ],
    "UROLOGIA": [
        { name: "DR. TULIO REYES", tel: "04166186300" },
        { name: "DR. JOSE LUIS DIAZ", tel: "0412693872" },
        { name: "DR. DIEGO REYES", tel: "04248005103" }
    ]
};

// 2. LÓGICA DEL MENÚ DE HAMBURGUESA
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.classList.replace('fa-times', 'fa-bars');
        });
    });
}

// 3. MOTOR DEL DIRECTORIO MÉDICO
const selectElement = document.getElementById('specialtySelect');
const resultsContainer = document.getElementById('results');
const btnSearch = document.getElementById('btnSearch');

function initDirectory() {
    if (!selectElement) return;
    const sortedSpecs = Object.keys(medicalData).sort();
    sortedSpecs.forEach(spec => {
        const option = document.createElement('option');
        option.value = spec;
        option.textContent = spec;
        selectElement.appendChild(option);
    });
}

function filterDoctors() {
    if (!selectElement || !resultsContainer) return;

    const selectedSpec = selectElement.value;
    resultsContainer.innerHTML = ''; 

    if (!selectedSpec) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-user-md"></i>
                <p>Por favor, selecciona una especialidad para filtrar.</p>
            </div>`;
        return;
    }

    const doctors = medicalData[selectedSpec];

    if (doctors && doctors.length > 0) {
        doctors.forEach(doc => {
            const card = document.createElement('div');
            card.className = 'doctor-card';
            
            // CAMBIO: Se usa una URL genérica de internet para la foto por defecto
            const internetPlaceholder = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png';
            const doctorPhoto = doc.image ? doc.image : internetPlaceholder;

            card.innerHTML = `
                <div class="doctor-photo-container">
                    <img src="${doctorPhoto}" alt="${doc.name}" class="doctor-img">
                </div>
                <h3>${doc.name}</h3>
                <span class="specialty-label">${selectedSpec}</span>
                <a href="https://wa.me/${doc.tel}" target="_blank" class="btn-whatsapp">
                    <i class="fab fa-whatsapp"></i> Contactar
                </a>
            `;
            resultsContainer.appendChild(card);
        });
    }
}

if (btnSearch) {
    btnSearch.addEventListener('click', filterDoctors);
}

// 4. EFECTOS VISUALES
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.style.backgroundColor = window.scrollY > 50 ? 'rgba(26, 58, 90, 0.98)' : '#1a3a5a';
    }
});

document.addEventListener('DOMContentLoaded', initDirectory);