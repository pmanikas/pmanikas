document.currentScript.insertAdjacentHTML('beforebegin', `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&family=Press+Start+2P&display=swap');

    .coffee {
        display: flex;
        padding: 6px 12px;
        background-color: #fd0;
        align-items: center;
        gap: 1rem;
        color: #000;
        border: none;
        opacity: 0.2;
        cursor: pointer;
        font-size: 12px;
        word-spacing: 0;
        letter-spacing: 0;
        font-family: 'Press Start 2P', cursive;
    }

    .coffee::before {
        content: "";
        background-image: url("https://pmanikas.github.io/pmanikas/assets/images/coffee-cup-8bit.png");
        width: 20px;
        height: 40px;
        background-size: contain;
        background-repeat: no-repeat;
        flex-shrink: 0;
    }

    .coffee:hover {
        opacity: 1;
    }

    .coffee-link {
        text-decoration: none;
    }
    </style>

    <a href="https://buymeacoffee.com/pmanikas" target="_blank" class="coffee-link"><button class="coffee">Buy me a coffee</button></a>
`);
document.currentScript.remove();
