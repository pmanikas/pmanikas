import { PUBLIC_PATH, LOCAL_PATH } from './config/global.js';

const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

async function getScripts() {
    const res = await fetch(`assets/data/scripts.json`);
    return await res.json();
}

async function renderScripts(scripts, targetElement) {
    const BASE_PATH = IS_LOCAL ? LOCAL_PATH : PUBLIC_PATH;

    scripts.forEach((script, index) => {
        const parentElement = document.createElement('div');
        parentElement.classList.add('code-container');

        parentElement.innerHTML = `
            <h2>${script.title}</h2>
            <div class="code-block">
                <pre><code>&lt;script src="${BASE_PATH}/${script.filename}"&gt;&lt;/script&gt;</code></pre>
                <button class="copy-button" data-copy-button data-index="${index}">Copy</button>
            </div>
        `;

        const scriptElement = document.createElement('script');
        scriptElement.src = `${BASE_PATH}/${script.filename}`;
        parentElement.insertBefore(scriptElement, parentElement.querySelector('.code-block'));

        targetElement.appendChild(parentElement);
    });
}

function handleClick(event) {
    if(event.target.hasAttribute('data-copy-button')) handleCopy(event);
}

async function handleCopy(event) {
    const button = event.target;
    const index = button.getAttribute('data-index');
    const script = scripts[index];
    const BASE_PATH = IS_LOCAL ? LOCAL_PATH : PUBLIC_PATH;
    const text = `<script src="${BASE_PATH}/${script.filename}"></script>`;

    try {
        await navigator.clipboard.writeText(text);
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text:', err);
        button.textContent = 'Failed to copy';
        
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000);
    }
}

const targetElement = document.querySelector('[data-scripts-list]');
const scripts = await getScripts();
renderScripts(scripts, targetElement);

addEventListener('click', handleClick);
