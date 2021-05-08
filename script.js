const RECENT_REPOS = document.getElementById("recent_repos");

function showRepos(name) {
    let githubUser = name;
    let githubApiUrl = 'https://api.github.com/users/' + githubUser + '/repos'
    console.log(name);

    fetch(githubApiUrl)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        RECENT_REPOS.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            RECENT_REPOS.insertAdjacentHTML('beforeend', `<h3 id="project-name">${data[i].name}</h3><a id="project-url" href="${data[i].html_url}">Source Code</a>`);
            
            if (data[i].homepage !== "" && data[i].homepage !== null) {
                RECENT_REPOS.insertAdjacentHTML('beforeend',` <a id="project-live" href="${data[i].homepage}">Live</a>`);
            }
        }
    })
}