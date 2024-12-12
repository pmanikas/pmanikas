const scriptParams = Object.fromEntries(
    new URLSearchParams(document.currentScript?.src?.split('?')[1])
);

document.currentScript.insertAdjacentHTML(
    'beforebegin',
    `
    <style>
        .github-card {
            --base-size: ${scriptParams['size'] || '16'}px;
            --base-spacing: 2.5rem;
            --base-color: ${ scriptParams['color'] || 'white' };
            --base-background: ${ scriptParams['bg'] || 'black' };

            width: calc(var(--base-size) * 25);
            max-width: 90%;
            margin: 0 auto;
            color: var(--base-color);
            font-size: var(--base-size);
        }

        .github-card a {
            color: inherit;
            text-decoration: none;
        }

        .github-card .card-container {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--base-spacing);
            padding: var(--base-spacing);
            background: var(--base-background);
            border-radius: 8px;
            border: 1px solid ${scriptParams['hasBorder'] === 'true' ? 'var(--base-color)' : 'transparent'};
            overflow: hidden;
        }

        .github-card .github-icon {
            position: absolute;
            top: var(--base-spacing);
            right: var(--base-spacing);
            width: 30px;
            height: 30px;
            background: var(--base-color);
            mask: url(./../assets/images/github-icon.svg) no-repeat center;
        }

        .github-card .image-container {
            display: flex;
            justify-content: center;
        }

        .github-card .image {
            position: relative;
            z-index: 100;
            width: 200px;
            height: 200px;
            object-fit: cover;
            border-radius: 50%;
        }

        .github-card .details-container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .github-card .bio {
            max-width: 80%;
            margin-top: var(--base-spacing);
            text-align: center;
        }

        .github-card .metrics-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: var(--base-spacing) 0 0;
            border-top: 1px solid var(--base-color);
            gap: var(--base-spacing);
        }

        .github-card .metrics-item {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    </style>

    <div class="github-card">
        <div class="card-container">
            <span class="github-icon"></span>
            <div class="image-container">
                <img
                    class="image"
                    data-image-avatar
                />
            </div>
            <div class="details-container">
                <div class="name">
                    <a href="" target="blank" data-text-name></a>
                </div>
                <div class="username">
                    <a :href="" target="blank" data-text-login></a>
                </div>
                <div class="bio" data-text-bio></div>
            </div>
            <div class="metrics-container">
                <div class="metrics-item followers">
                    <span data-text-followers></span>
                    <label>Followers</label>
                </div>
                <div class="metrics-item following">
                    <span data-text-following></span>
                    <label>Following</label>
                </div>
                <div class="metrics-item repositories">
                    <span data-text-public_repos></span>
                    <label>Public Repos</label>
                </div>
            </div>
        </div>
    </div>
`
);

function getElement(selector) {
    return document.querySelector(selector);
}

function setProperty({ selector, property, value }) {
    const element = getElement(selector);
    if (!element) return;
    element[property] = value;
}

async function getGithubUser() {
    const response = await fetch('https://api.github.com/users/pmanikas');
    return await response.json();
}

async function setupGithubCard() {
    const user = await getGithubUser();

    if(!user) return;

    setProperty({ selector: '[data-image-avatar]', property: 'src', value: user.avatar_url });
    setProperty({ selector: '[data-image-avatar]', property: 'alt', value: user.name || user.login });
    setProperty({ selector: '[data-text-name]', property: 'textContent', value: user.name });
    setProperty({ selector: '[data-text-name]', property: 'href', value: user.html_url });
    setProperty({ selector: '[data-text-login]', property: 'textContent', value: user.login });
    setProperty({ selector: '[data-text-login]', property: 'href', value: '@' + user.html_url });
    setProperty({ selector: '[data-text-bio]', property: 'textContent', value: user.bio });
    setProperty({ selector: '[data-text-followers]', property: 'textContent', value: user.followers });
    setProperty({ selector: '[data-text-following]', property: 'textContent', value: user.following });
    setProperty({ selector: '[data-text-public_repos]', property: 'textContent', value: user.public_repos });
}

setupGithubCard();

document.currentScript.remove();
