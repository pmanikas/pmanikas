document.currentScript.insertAdjacentHTML('beforebegin', `
    <style>
    .pmanikas-github-8bit {
        width: 64px;
        height: 64px;
        cursor: pointer;
    }

    .pmanikas-github-8bit-link {
        text-decoration: none;
    }
    </style>

    <a href="https://github.com/pmanikas" target="_blank" class="pmanikas-github-8bit-link">
        <img src="https://pmanikas.github.io/pmanikas/assets/images/github-8bit.png" alt="Pantelis Manikas GitHub" class="pmanikas-github-8bit">
    </a>
`);
document.currentScript.remove();
