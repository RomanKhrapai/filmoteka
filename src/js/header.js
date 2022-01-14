export function onBtnHomeClick(event) {
    document.location = 'page/index.html';
    event.currentTarget.classList('.is-active');
}

export function onFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    event.currentTarget.reset();
}