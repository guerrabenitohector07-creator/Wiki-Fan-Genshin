document.addEventListener("DOMContentLoaded", () => {
    
    // 1. CONTROL DE DESPLIEGUE DEL SUMARIO
    const btnSummary = document.getElementById("btn-summary");
    const summaryContent = document.getElementById("summary-content");

    if (btnSummary && summaryContent) {
        btnSummary.addEventListener("click", () => {
            const isHidden = summaryContent.style.display === "none";
            summaryContent.style.display = isHidden ? "block" : "none";
            btnSummary.textContent = isHidden ? "[ocultar]" : "[mostrar]";
        });
    }

    // 2. APERTURA AUTOMÁTICA DE <details> Y SCROLL SUAVE
    const linksSumario = document.querySelectorAll(".summary-list a");
    linksSumario.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const parentDetails = targetElement.closest("details");
                if (parentDetails) {
                    parentDetails.setAttribute("open", "true");
                    
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                }
            }
        });
    });

    // 3. SISTEMA DE PESTAÑAS (Carta / Arte / Modelo)
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

    // 4. SISTEMA DE PESTAÑAS DEL NAV (Resumen, Historia, etc.)
    const navTabs = document.querySelectorAll('.tabs .tab-link');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // 5. CAMBIO DE CLASE EN EL HEADER AL HACER SCROLL
    window.addEventListener('scroll', function() {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// ROBUSTECIMIENTO: Función global para el cambio de pestañas de Talentos
function cambiarTab(event, tabId) {
    // 1. Encontrar el contenedor del talento específico
    const contenedor = event.target.closest('.talento-container');
    
    if (!contenedor) return;

    // 2. Desactivar solo los botones y paneles de ESTE contenedor
    contenedor.querySelectorAll('.talento-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
    contenedor.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    
    // 3. Activar el botón clicado y mostrar su panel correspondiente
    event.target.classList.add('active');
    
    const panelObjetivo = contenedor.querySelector(`#${tabId}`);
    if (panelObjetivo) {
        panelObjetivo.classList.add('active');
    }
}