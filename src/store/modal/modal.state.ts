export interface ModalState {
  isOpen: boolean;
  isSucces: boolean;
  isConfirm: boolean;
  isErrored: boolean;
  title: string;
  children: React.ReactNode | string;
  functions: {
    handleSubmit: () => void;
    handleCancel: () => void;
  };

  openModal: () => void;
  closeModal: () => void;

  setIsSuccess: () => void;
  resetIsSucces: () => void;

  setIsConfirm: () => void;
  resetIsConfirm: () => void;

  setIsErrored: () => void;
  resetIsErrored: () => void;

  setTitle: (title: string) => void;
  resetTitle: () => void;

  setChildren: (children: React.ReactNode | string) => void;
  resetChildren: () => void;

  setHandleSubmit: (action: () => void) => void;
  resetHandleSubmit: () => void;

  reset: () => void;
}
