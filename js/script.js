window.addEventListener('load', function() {
    const loader = document.getElementById('loading');
    loader.style.display = 'none';
});


document.addEventListener('DOMContentLoaded', () => {

    const filters = document.querySelectorAll('.filter');
    const projects = Array.from(document.querySelectorAll('.proj'));
    const clearBtn = document.getElementById('clear-filter');

    function updateHRs() {
        const visibleProjects = projects.filter(p => !p.classList.contains('hidden'));

        projects.forEach(p => {
            const hr = p.nextElementSibling;
            if (hr && hr.tagName === 'HR') hr.style.display = 'none';
        });

        visibleProjects.forEach((p, index) => {
            if (index < visibleProjects.length - 1) {
                const hr = p.nextElementSibling;
                if (hr && hr.tagName === 'HR') hr.style.display = 'block';
            }
        });
    }

    function showProjectWithFade(p) {
        // forza opacità 0 e reset transizione
        p.style.transition = 'none';
        p.style.opacity = '0';
        p.classList.remove('hidden'); // display:block tramite CSS
        p.offsetHeight; // forza repaint
        p.style.transition = ''; // riattiva transizione dal CSS
        p.style.opacity = '1'; // fade-in
    }

    function applyFilter(category) {
        projects.forEach(p => {
            const categories = p.dataset.category.split(' ');
            const shouldShow = categories.includes(category);

            if (shouldShow) {
                showProjectWithFade(p); // fade-in anche la prima volta
            } else {
                p.classList.add('hidden'); // sparizione immediata
            }
        });

        updateHRs();
    }

    function clearFilter() {
        filters.forEach(f => f.classList.remove('active', 'inactive'));

        projects.forEach(p => {
            showProjectWithFade(p); // fade-in
        });

        updateHRs();
        clearBtn.classList.remove('visible');
    }

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.dataset.filter;

            filters.forEach(f => {
                f.classList.toggle('active', f === filter);
                f.classList.toggle('inactive', f !== filter);
            });

            applyFilter(category);
            clearBtn.classList.add('visible');
        });
    });

    clearBtn.addEventListener('click', clearFilter);

});
