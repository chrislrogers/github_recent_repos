const RECENT_REPOS = document.getElementById("recent_repos");

function showRepos(name) {
    let githubUser = name;
    let githubApiUrl = 'https://api.github.com/users/' + githubUser + '/repos?per_page=10';

    fetch(githubApiUrl)
    .then((response) => response.json())
    .then((data) => {
        RECENT_REPOS.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            RECENT_REPOS.insertAdjacentHTML('beforeend', `<h3 id="project-name">${data[i].name}</h3>`);
            
            if (data[i].description !== null) {
                RECENT_REPOS.insertAdjacentHTML('beforeend',` <p>${data[i].description}</p>`);
            }

            RECENT_REPOS.insertAdjacentHTML('beforeend',`<a id="project-url" href="${data[i].html_url}" target="_blank">Source Code</a>`);
            
            if (data[i].homepage !== "" && data[i].homepage !== null) {
                RECENT_REPOS.insertAdjacentHTML('beforeend',` <a id="project-live" href="${data[i].homepage}" target="_blank">Live</a>`);
            }
        }
    })
}