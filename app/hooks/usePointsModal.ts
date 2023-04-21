import { create } from 'zustand';

interface PointsModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePointsModal = create<PointsModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default usePointsModal;
