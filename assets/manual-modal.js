document.addEventListener('DOMContentLoaded', function () {
    const pages = Array.from(document.querySelectorAll('.manual-page'));
    let currentPage = 0;
    const totalPages = pages.length;

    function showPage(page) {
        pages.forEach((el, idx) => {
            el.classList.toggle('d-none', idx !== page);
        });

        // Busca los controles SOLO en la página visible
        const activePage = pages[page];
        const prevBtn = activePage.querySelector('#manual-prev-btn');
        const nextBtn = activePage.querySelector('#manual-next-btn');
        const pagination = activePage.querySelector('#manual-pagination');

        if (prevBtn) prevBtn.disabled = page === 0;
        if (nextBtn) nextBtn.textContent = page === totalPages - 1 ? 'Finalizar' : 'Siguiente →';

        // Actualiza los indicadores de paginación SOLO en la página visible
        if (pagination) {
            pagination.innerHTML = '';
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('span');
                dot.className = 'manual-dot' + (i === page ? ' active' : '');
                dot.style.cssText = 'width:12px;height:12px;border-radius:50%;display:inline-block;background:' + (i === page ? '#1976d2' : '#ccc') + ';margin:0 2px;';
                pagination.appendChild(dot);
            }
        }
    }

    // Delegación de eventos: como los botones existen en cada página, usamos delegación
    document.getElementById('manual-carousel').addEventListener('click', function (e) {
        if (e.target && e.target.id === 'manual-prev-btn') {
            if (currentPage > 0) {
                currentPage--;
                showPage(currentPage);
            }
        }
        if (e.target && e.target.id === 'manual-next-btn') {
            if (currentPage < totalPages - 1) {
                currentPage++;
                showPage(currentPage);
            } else {
                // Cierra el modal al finalizar
                const modal = bootstrap.Modal.getInstance(document.getElementById('visorModal'));
                if (modal) modal.hide();
            }
        }
    });

    // Reinicia el manual al abrir el modal
    document.getElementById('visorModal').addEventListener('show.bs.modal', function () {
        currentPage = 0;
        showPage(currentPage);
    });

    // Inicializa la primera página
    showPage(currentPage);
});