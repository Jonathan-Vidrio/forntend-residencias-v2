import { create } from 'zustand';
import { ModalState } from './modal.state';

export const useModalStore = create<ModalState>()((set, get) => ({
  isOpen: false,
  isSucces: false,
  isConfirm: false,
  isErrored: false,
  title: '',
  children: '',
  functions: {
    handleCancel: () => {},
    handleSubmit: () => {},
  },

  openModal: () => set({ isOpen: true }),
  closeModal: () => {
    set({ isOpen: false });
    get().reset();
  },

  setIsSuccess: () => set({ isSucces: true }),
  resetIsSucces: () => set({ isSucces: false }),

  setIsConfirm: () => set({ isConfirm: true }),
  resetIsConfirm: () => set({ isConfirm: false }),

  setIsErrored: () => set({ isErrored: true }),
  resetIsErrored: () => set({ isErrored: false }),

  setTitle: title => set({ title }),
  resetTitle: () => set({ title: '' }),

  setChildren: children => set({ children }),
  resetChildren: () => set({ children: '' }),

  setHandleSubmit: action => set({ functions: { handleSubmit: action, handleCancel: () => get().closeModal() } }),
  resetHandleSubmit: () => set({ functions: { handleSubmit: () => {}, handleCancel: () => get().closeModal() } }),

  reset: () => {
    set({
      isSucces: false,
      isConfirm: false,
      isErrored: false,
      title: '',
      children: '',
      functions: {
        handleSubmit: () => {},
        handleCancel: () => {},
      },
    });
  },
}));
