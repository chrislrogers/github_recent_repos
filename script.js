const RECENT_REPOS = document.getElementById("recent-repos");
const INPUT = document.getElementById("input-word");

function showRepos(name) {
    let githubUser = name;
    let githubApiUrl = 'https://api.github.com/users/' + githubUser + '/repos?per_page=10';

    fetch(githubApiUrl)
        .then((response) => response.json())
        .then((data) => {
            RECENT_REPOS.innerHTML = '<!-- Code injected by script.js -->';
            for (let i = 0; i < data.length; i++) {
                let cardHtml = `<div class="card">`;
                let date = new Date(data[i].updated_at);
                let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

                cardHtml = cardHtml + `<h3 id="project-name">${data[i].name}</h3>`;
                cardHtml = cardHtml + `<h5>Updated: ${date.toLocaleDateString('en-US', options)}</h5>`;
                cardHtml = cardHtml + `<h4 id="project-language">${data[i].language}</h4>`;

                if (data[i].description !== null) {
                    cardHtml = cardHtml + ` <p>${data[i].description}</p>`;
                }

                cardHtml = cardHtml + `<br><div class="links">`;
                cardHtml = cardHtml + `<a id="project-url" href="${data[i].html_url}" target="_blank">Source Code</a>`;

                if (data[i].homepage !== "" && data[i].homepage !== null) {
                    cardHtml = cardHtml + ` <a id="project-live" href="${data[i].homepage}" target="_blank">Website</a>`;
                } else {
                    cardHtml = cardHtml + `<a class="no-link" href="#">Website</a>`;
                }

                cardHtml = cardHtml + `</div></div>`;
                RECENT_REPOS.insertAdjacentHTML("beforeend", cardHtml);
            }
        })
}

INPUT.addEventListener("keydown", function (event) {
    if (event.code === "Enter") {
        showRepos(event.target.value);
    }
});
