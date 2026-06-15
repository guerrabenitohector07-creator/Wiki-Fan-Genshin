/* ==========================================================================
   WIKI GENSHIN IMPACT - INTERACCIONES GENERALES (Zscript.js)
   Versión: 1.4.1 - Enlaces Universales Autoadaptables
   ========================================================================== */

// =============================================================================
// BASE DE DATOS DEL BUSCADOR PREDICTIVO
// =============================================================================
/**
 * Base de datos con las ubicaciones de los archivos.
 * 'carpeta' define dónde está guardado el archivo respecto a la raíz del proyecto.
 */
const paginasWiki = [
    // Personajes (Carpeta: Personajes)
    { nombre: "Yoshiro", archivo: "Yoshiro.html", carpeta: "Personajes" },
    { nombre: "Reiji", archivo: "Reiji.html", carpeta: "Personajes" },
    { nombre: "Lutte", archivo: "Lutte.html", carpeta: "Personajes" },
    
    // Armas y Objetos (Carpeta: Armas)
    { nombre: "Pétalo del Crepúsculo", archivo: "Pétalo del Crepusculo.html", carpeta: "Armas" }
];

/**
 * Función mágica que detecta en qué carpeta está el usuario actualmente
 * y construye la ruta perfecta para ir a otra página, funcione en local o en servidor.
 */
function calcularRutaRelativa(paginaDestino) {
    const rutaActual = window.location.pathname;
    
    // Comprobamos si el usuario está actualmente metido dentro de una subcarpeta
    const estaEnSubcarpeta = rutaActual.includes('/Personajes/') || rutaActual.includes('/Armas/');
    
    if (estaEnSubcarpeta) {
        // Si ya estamos en una subcarpeta, primero salimos de ella con '../' y luego entramos a la carpeta destino
        return `../${paginaDestino.carpeta}/${paginaDestino.archivo}`;
    } else {
        // Si estamos en la raíz, vamos directo a la carpeta correspondiente
        return `${paginaDestino.carpeta}/${paginaDestino.archivo}`;
    }
}

// =============================================================================
// CAPA DE INICIALIZACIÓN MÁSTER (UNIFICADA)
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
    
    // -------------------------------------------------------------------------
    // 1. CONFIGURACIÓN DE COLORES DINÁMICOS POR ELEMENTO (VISIÓN)
    // -------------------------------------------------------------------------
    const visionNodo = document.querySelector(".vision-element");
    
    if (visionNodo) {
        let textoVision = visionNodo.textContent.toLowerCase().trim();
        const elementosValidos = ['pyro', 'hydro', 'anemo', 'electro', 'dendro', 'cryo', 'geo'];
        const elementoEncontrado = elementosValidos.find(el => textoVision.includes(el));
        
        if (elementoEncontrado) {
            elementosValidos.forEach(el => document.body.classList.remove(`elemento-${el}`));
            document.body.classList.add(`elemento-${elementoEncontrado}`);
            console.log("Elemento detectado con éxito:", elementoEncontrado);
        } else {
            console.log("No se reconoció el elemento en el texto:", textoVision);
        }
    }

    // -------------------------------------------------------------------------
    // 2. CONTROL DE DESPLIEGUE DEL SUMARIO INTERACTIVO (TOC DILIGENTE)
    // -------------------------------------------------------------------------
    const listaSumario = document.getElementById("lista-sumario");
    const encabezados = document.querySelectorAll(".contenido-wiki h2"); 

    if (listaSumario && encabezados.length > 0) {
        listaSumario.innerHTML = ""; 

        encabezados.forEach((encabezado) => {
            if (!encabezado.id) {
                encabezado.id = encabezado.textContent
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]/g, "-")
                    .replace(/-+/g, "-");
            }

            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `#${encabezado.id}`;
            a.textContent = encabezado.textContent;

            a.addEventListener("click", (e) => {
                e.preventDefault();
                encabezado.scrollIntoView({ behavior: "smooth" });
            });

            li.appendChild(a);
            listaSumario.appendChild(li);
        });
    }

    // -------------------------------------------------------------------------
    // 3. APERTURA AUTOMÁTICA DE SECCIONES <details> Y SCROLL SUAVE
    // -------------------------------------------------------------------------
    const linksSumario = document.querySelectorAll(".summary-list a, #lista-sumario a");
    
    linksSumario.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (!targetId.startsWith("#")) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const parentDetails = targetElement.closest("details");
                if (parentDetails && !parentDetails.open) {
                    parentDetails.setAttribute("open", "true");
                    
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }, 75);
                }
            }
        });
    });

    // -------------------------------------------------------------------------
    // 4. SISTEMA DE PESTAÑAS MULTIMEDIA (Carta / Arte / Modelo)
    // -------------------------------------------------------------------------
    const mediaTabs = document.querySelectorAll('.card-media-tabs .tab-btn');

    mediaTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const type = tab.getAttribute('data-media');
            const contents = document.querySelectorAll('.media-content');
            
            contents.forEach(el => {
                el.style.display = 'none';
                el.classList.remove('active');
            });

            mediaTabs.forEach(t => t.classList.remove('active'));

            const selected = document.getElementById('media-' + type);
            if (selected) {
                selected.style.display = 'block';
                selected.classList.add('active');
            }
            tab.classList.add('active');
        });
    });

    // -------------------------------------------------------------------------
    // 5. SISTEMA DE PESTAÑAS PRINCIPALES DEL NAV (Resumen, Historia, etc.)
    // -------------------------------------------------------------------------
    const navTabs = document.querySelectorAll('.tabs .tab-link');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // -------------------------------------------------------------------------
    // 6. CAMBIO DE DISEÑO ESTÉTICO EN EL HEADER (EFECTO SCROLL)
    // -------------------------------------------------------------------------
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // -------------------------------------------------------------------------
    // 7. SELECTOR DE NIVEL DINÁMICO PARA TABLAS DE ESTADÍSTICAS
    // -------------------------------------------------------------------------
    const selectoresNivel = document.querySelectorAll(".selector-nivel");

    selectoresNivel.forEach(selector => {
        selector.addEventListener("change", (e) => {
            const indiceSeleccionado = e.target.value;
            const textoNivel = e.target.options[e.target.selectedIndex].text;
            
            const contenedorTalento = e.target.closest(".talento-container");
            if (!contenedorTalento) return;
            
            const cabeceraTH = contenedorTalento.querySelector(".tab-panel.active .stats-table .cabecera-nivel-dinamica");
            if (cabeceraTH) {
                cabeceraTH.textContent = textoNivel;
            }

            const celdasValores = contenedorTalento.querySelectorAll(".tab-panel.active .stats-table .valor-dinamico");
            celdasValores.forEach(celda => {
                const dataValoresAttr = celda.getAttribute("data-valores");
                if (!dataValoresAttr) return;

                const listaValores = dataValoresAttr.split(",");
                if (listaValores[indiceSeleccionado]) {
                    celda.textContent = listaValores[indiceSeleccionado].trim();
                    
                    celda.style.animation = 'none';
                    celda.offsetHeight; 
                    celda.style.animation = 'cambioValorTalento 0.25s ease-out';
                }
            });
        });
    });

    // -------------------------------------------------------------------------
    // 8. BUSCADOR PREDICTIVO AUTOADAPTABLE
    // -------------------------------------------------------------------------
    const inputBuscar = document.getElementById('buscador-wiki');
    
    if (inputBuscar) {
        let dropdown = document.querySelector('.sugerencias-dropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.className = 'sugerencias-dropdown';
            dropdown.style.display = 'none';
            inputBuscar.parentNode.appendChild(dropdown);
        }

        // Evento al escribir
        inputBuscar.addEventListener('input', function() {
            const termino = this.value.toLowerCase().trim();
            dropdown.innerHTML = '';

            if (termino.length === 0) {
                dropdown.style.display = 'none';
                return;
            }

            const paginasFiltradas = paginasWiki.filter(p => p.nombre.toLowerCase().includes(termino));

            if (paginasFiltradas.length > 0) {
                paginasFiltradas.forEach(pagina => {
                    const item = document.createElement('div');
                    item.className = 'sugerencia-item';
                    item.textContent = pagina.nombre;

                    // Al hacer click, calcula la ruta exacta en base a dónde estás parado
                    item.addEventListener('click', () => {
                        const urlFinal = calcularRutaRelativa(pagina);
                        window.location.href = urlFinal;
                    });

                    dropdown.appendChild(item);
                });
                dropdown.style.display = 'block';
            } else {
                dropdown.style.display = 'none';
            }
        });

        // Evento al presionar ENTER
        inputBuscar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const termino = this.value.toLowerCase().trim();
                const paginaEncontrada = paginasWiki.find(p => p.nombre.toLowerCase().includes(termino));
                
                if (paginaEncontrada) {
                    const urlFinal = calcularRutaRelativa(paginaEncontrada);
                    window.location.href = urlFinal;
                } else {
                    alert("No se encontró esa página en la Wiki");
                }
            }
        });

        // Ocultar desplegable al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (e.target !== inputBuscar && e.target !== dropdown) {
                dropdown.style.display = 'none';
            }
        });
    }
});

// =============================================================================
// FUNCIONES ADICIONALES SCOPE GLOBAL
// =============================================================================
function cambiarTab(event, tabId) {
    const contenedor = event.target.closest('.talento-container');
    if (!contenedor) return;

    contenedor.querySelectorAll('.talento-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    contenedor.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    
    event.target.classList.add('active');
    const panelObjetivo = contenedor.querySelector(`#${tabId}`);
    if (panelObjetivo) {
        panelObjetivo.classList.add('active');
    }
}