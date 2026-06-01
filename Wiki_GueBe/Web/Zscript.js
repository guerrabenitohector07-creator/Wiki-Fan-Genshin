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
                    
                    // Pequeño timeout para asegurar que el navegador 
                    // renderice el despliegue antes de hacer el scroll
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                }
            }
        });
    });

    // 3. SISTEMA DE PESTAÑAS (Carta / Arte / Modelo)
    const mediaTabs = document.querySelectorAll('.tab-btn');

    mediaTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const type = tab.getAttribute('data-media');

            // Ocultar todos los contenidos de multimedia
            const contents = document.querySelectorAll('.media-content');
            contents.forEach(el => {
                el.style.display = 'none';
                el.classList.remove('active');
            });

            // Quitar clase "active" (y el estilo del foquito) de todos los botones
            mediaTabs.forEach(t => t.classList.remove('active'));

            // Mostrar el contenedor seleccionado
            const selected = document.getElementById('media-' + type);
            if (selected) {
                selected.style.display = 'block';
                selected.classList.add('active');
            }

            // Activar botón actual
            tab.classList.add('active');
        });
    });

    // 4. SISTEMA DE PESTAÑAS DEL NAV (Resumen, Historia, etc.)
    const navTabs = document.querySelectorAll('.tab-link');

    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // No prevenimos el default si los links de nav llevan a IDs
            // Pero limpiamos la clase active de todos
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // 5. CAMBIO DE TITULO
    window.addEventListener('scroll', function() {
        const header = document.getElementById('main-header');
        
        // Si el scroll supera los 50px, añade la clase 'scrolled'
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            // Si vuelve arriba, quita la clase
            header.classList.remove('scrolled');
        }
    });



});