document.addEventListener('keydown', (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null
    const isInput =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target && target.isContentEditable);
    if (isInput) return;
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
    }
});
