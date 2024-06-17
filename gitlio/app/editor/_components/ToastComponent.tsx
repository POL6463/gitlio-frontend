// components/ToastComponent.tsx
import React from 'react';
import useToastStore from '@/store/toastStore';

const ToastComponent: React.FC = () => {
  const showToast = useToastStore((state) => state.showToast);

  return showToast ? (
    <div className="toast toast-start">
      <div className="alert alert-success">
        <span>성공적으로 저장되었습니다.</span>
      </div>
    </div>
  ) : null;
};

export default ToastComponent;
