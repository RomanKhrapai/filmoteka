import { modal } from "./refs.js";

export function closeModal() {
    modal.classList.add('modal-area--is-hidden');
  }