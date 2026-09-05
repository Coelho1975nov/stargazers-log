async function loadStarredRepos() {
  const listEl = document.getElementById("repo-list");

  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repos = await response.json();
    renderRepos(repos, listEl);
  } catch (error) {
    listEl.innerHTML = `<li class="error">Could not load starred repositories: ${error.message}</li>`;
    console.error("Failed to load events.json:", error);
  }
}

function renderRepos(repos, listEl) {
  if (!repos || repos.length === 0) {
    listEl.innerHTML = `<li class="loading">No starred repositories yet.</li>`;
    return;
  }

  listEl.innerHTML = repos
    .map(
      (repo) => `
    <li class="repo-item">
      <div class="repo-name">
        <a href="${repo.url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
      </div>
      <p class="repo-description">${repo.description}</p>
      <div class="repo-meta">
        <span class="language">${repo.language}</span>
        <span class="stars">${repo.stars.toLocaleString()}</span>
        <span class="starred-at">Starred ${repo.starredAt}</span>
      </div>
    </li>
  `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", loadStarredRepos);
