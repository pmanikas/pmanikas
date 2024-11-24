document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', async () => {
        const codeBlock = button.previousElementSibling.querySelector('code');
        const text = codeBlock.textContent;

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
    });
});