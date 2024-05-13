// store/previewStore.ts
import create from 'zustand';

interface PreviewState {
  preview: boolean;
  setPreview: (preview: boolean) => void;
}

const usePreviewStore = create<PreviewState>((set) => ({
  preview: false,
  setPreview: (preview) => set(() => ({ preview })),
}));

export default usePreviewStore;
