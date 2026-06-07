/* ==========================================================================
   WIKI GENSHIN IMPACT - INTERACCIONES GENERALES (Prueba.js)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================================
    // 1. CONFIGURACIÓN DE COLORES DINÁMICOS POR ELEMENTO (VISIÓN)
    // =========================================================================
    const visionNodo = document.querySelector(".vision-element");
    
    if (visionNodo) {
        // Extraemos el texto del elemento en minúsculas y sin espacios
        let textoVision = visionNodo.textContent.toLowerCase().trim();
        
        // Lista de los 7 elementos oficiales de Genshin Impact
        const elementosValidos = ['pyro', 'hydro', 'anemo', 'electro', 'dendro', 'cryo', 'geo'];
        
        // Buscamos si el texto de la casilla coincide con algún elemento de la lista
        const elementoEncontrado = elementosValidos.find(el => textoVision.includes(el));
        
        if (elementoEncontrado) {
            // Limpiamos cualquier clase de elemento previa aplicada en el body
            elementosValidos.forEach(el => document.body.classList.remove(`elemento-${el}`));
            
            // Inyectamos la clase definitiva al body (ej: elemento-electro)
            document.body.classList.add(`elemento-${elementoEncontrado}`);
            console.log("Elemento detectado con éxito:", elementoEncontrado);
        } else {
            console.log("No se reconoció el elemento en el texto:", textoVision);
        }
    }

    // =========================================================================
    // 2. CONTROL DE DESPLIEGUE DEL SUMARIO INTERACTIVO (TOC)
    // =========================================================================
    const btnSummary = document.getElementById("btn-summary");
    const summaryContent = document.getElementById("summary-content");

    if (btnSummary && summaryContent) {
        btnSummary.addEventListener("click", () => {
            const isHidden = summaryContent.style.display === "none";
            summaryContent.style.display = isHidden ? "block" : "none";
            btnSummary.textContent = isHidden ? "[ocultar]" : "[mostrar]";
        });
    }

    // =========================================================================
    // 3. APERTURA AUTOMÁTICA DE SECCIONES <details> Y SCROLL SUAVE
    // =========================================================================
    const linksSumario = document.querySelectorAll(".summary-list a");
    
    linksSumario.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const parentDetails = targetElement.closest("details");
                // Si el objetivo está dentro de un colapsable cerrado, forzamos su apertura
                if (parentDetails) {
                    parentDetails.setAttribute("open", "true");
                    
                    // Esperamos un instante a que el navegador lo despliegue antes de deslizar
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                }
            }
        });
    });

    // =========================================================================
    // 4. SISTEMA DE PESTAÑAS MULTIMEDIA (Carta / Arte / Modelo)
    // =========================================================================
    const mediaTabs = document.querySelectorAll('.card-media-tabs .tab-btn');

    mediaTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const type = tab.getAttribute('data-media');
            const contents = document.querySelectorAll('.media-content');
            
            // Ocultamos todos los paneles multimedia
            contents.forEach(el => {
                el.style.display = 'none';
                el.classList.remove('active');
            });

            // Quitamos la clase activa de todos los botones multimedia
            mediaTabs.forEach(t => t.classList.remove('active'));

            // Mostramos y activamos el panel multimedia seleccionado
            const selected = document.getElementById('media-' + type);
            if (selected) {
                selected.style.display = 'block';
                selected.classList.add('active');
            }

            tab.classList.add('active');
        });
    });

    // =========================================================================
    // 5. SISTEMA DE PESTAÑAS PRINCIPALES DEL NAV (Resumen, Historia, etc.)
    // =========================================================================
    const navTabs = document.querySelectorAll('.tabs .tab-link');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // =========================================================================
    // 6. CAMBIO DE DISEÑO ESTÉTICO EN EL HEADER (EFECTO SCROLL)
    // =========================================================================
    window.addEventListener('scroll', function() {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =========================================================================
    // 7. SELECTOR DE NIVEL DINÁMICO PARA TABLAS DE ESTADÍSTICAS
    // =========================================================================
    const selectoresNivel = document.querySelectorAll(".selector-nivel");

    selectoresNivel.forEach(selector => {
        selector.addEventListener("change", (e) => {
            const indiceSeleccionado = e.target.value;
            const textoNivel = e.target.options[e.target.selectedIndex].text;
            
            // Buscamos el contenedor del talento específico para no alterar otras tablas
            const contenedorTalento = e.target.closest(".talento-container");
            
            if (!contenedorTalento) return;
            
            // Actualizar el texto del encabezado de la tabla (th)
            const cabeceraTH = contenedorTalento.querySelector(".stats-table thead .cabecera-nivel-dinamica");
            if (cabeceraTH) {
                cabeceraTH.textContent = textoNivel;
            }

            // Actualizar los valores numéricos de las celdas leyendo sus "data-valores"
            const celdasValores = contenedorTalento.querySelectorAll(".stats-table .valor-dinamico");
            celdasValores.forEach(celda => {
                const listaValores = celda.getAttribute("data-valores").split(",");
                if (listaValores[indiceSeleccionado]) {
                    celda.textContent = listaValores[indiceSeleccionado];
                    
                    // Reiniciar y disparar la animación CSS de actualización
                    celda.style.animation = 'none';
                    celda.offsetHeight; // Truco de renderizado (reflow) para resetear animación
                    celda.style.animation = 'cambioValorTalento 0.25s ease-out';
                }
            });
        });
    });

});


// =============================================================================
// FUNCIONES GLOBALES (Fuera de la carga inicial)
// =============================================================================

/**
 * Controla el cambio de pestañas secundarias dentro del bloque de Talentos (Descripción/Estadísticas)
 */
function cambiarTab(event, tabId) {
    // 1. Encontrar el contenedor del talento específico en el que se hizo click
    const contenedor = event.target.closest('.talento-container');
    
    if (!contenedor) return;

    // 2. Desactivar solo los botones y paneles pertenecientes a ESTE contenedor
    contenedor.querySelectorAll('.talento-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    contenedor.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    
    // 3. Activar el botón clicado y mostrar su panel correspondiente
    event.target.classList.add('active');
    
    const panelObjetivo = contenedor.querySelector(`#${tabId}`);
    if (panelObjetivo) {
        panelObjetivo.classList.add('active');
    }
}