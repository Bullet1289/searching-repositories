const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const errorMessage = document.getElementById('error-message');
const resultsList = document.getElementById('results-list');
const notFound = document.getElementById('not-found');

searchButton.addEventListener('click', searchRepos);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchRepos();
  }
});

function searchRepos() {
  const query = searchInput.value;

  if (query.length < 3) {
    errorMessage.classList.remove('hidden');
    errorMessage.textContent = 'Введите хотя бы 3 символа';
    return;
  }

  errorMessage.classList.add('hidden');
  notFound.classList.add('hidden');

  fetch(`https://api.github.com/search/repositories?q=${query}&per_page=10`)
    .then((response) => response.json())
    .then((data) => {
      resultsList.innerHTML = '';

      if (data.items.length === 0) {
        notFound.classList.remove('hidden');
      } else {
        data.items.forEach((repo) => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <p>Описание: ${repo.description || 'отсутствует'}</p>
            <p>Звезды: ${repo.stargazers_count}</p>
          `;
          resultsList.appendChild(listItem);
        });
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}