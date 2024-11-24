document.currentScript.insertAdjacentHTML('beforebegin', `
    <style>
    .coffee {
        display: flex;
        padding: 6px 12px;
        background-color: #fd0;
        align-items: center;
        color: #000;
        border: none;
        opacity: 0.2;
        cursor: pointer;
        font-size: 12px;
        word-spacing: 0;
        letter-spacing: 0;
    }

    .coffee::before {
        content: "";
        background-image: url("https://github.com/pmanikas/pmanikas/blob/main/images/coffee-cup-8bit.png");
        width: 20px;
        height: 40px;
        background-size: contain;
        background-repeat: no-repeat;
        flex-shrink: 0;
        margin-right: var(--base-spacing);
    }

    .coffee:hover {
        opacity: 1;
    }
    </style>
    <a href="https://buymeacoffee.com/pmanikas"><button class="coffee">Buy me a coffee</button></a>
`);
document.currentScript.remove();
