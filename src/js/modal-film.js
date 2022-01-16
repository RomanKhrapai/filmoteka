import { modal } from "./refs";

export function toggleModal() {
  modal.classList.toggle('modal-area--is-hidden');
  modal.classList.contains('modal-area--is-hidden') ? document.body.style.overflow = "" : document.body.style.overflow = "hidden";
}  
