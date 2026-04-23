// Inject header links into the MkDocs Material top nav.
// Uses document$ (Material's instant-navigation observable) so links
// persist across client-side page transitions, not just the initial load.
document$.subscribe(function () {
  var header = document.querySelector('.md-header__inner');
  if (!header || header.querySelector('.th-header-links')) return;

  var nav = document.createElement('nav');
  nav.className = 'th-header-links';
  nav.innerHTML =
    '<a href="https://app.thalian.ai" target="_blank" rel="noopener noreferrer" class="th-header-link">Open App</a>' +
    '<a href="https://status.thalian.ai" target="_blank" rel="noopener noreferrer" class="th-header-link th-header-link--dim">System Status</a>' +
    '<a href="https://thalian.ai" target="_blank" rel="noopener noreferrer" class="th-header-link th-header-link--dim">Home</a>';

  header.appendChild(nav);
});
