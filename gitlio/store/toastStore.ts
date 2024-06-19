// stores/toastStore.ts
import create from 'zustand';

interface ToastState {
  showToast: boolean;
  setShowToast: (isVisible: boolean) => void;
}

const useToastStore = create<ToastState>((set) => ({
  showToast: false,
  setShowToast: (isVisible: boolean) => set({ showToast: isVisible }),
}));

export default useToastStore;
