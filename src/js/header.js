export function onBtnHomeClick(event) {
    btnHome.classList.add('is-active')  
  btnLibrary.classList.remove('is-active')  
}

export function onFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    event.currentTarget.reset();
}

export function onBtnLibraryClick(event) {
   btnHome.classList.remove('is-active')
    btnLibrary.classList.add('is-active')  
}