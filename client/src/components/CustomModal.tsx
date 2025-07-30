import React, { useEffect } from "react";

const CustomModal = ({ isOpen, onClose, children }: CustomFixedModalProps) => {
  // Khi modal mở, ngăn chặn scroll của body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose}
        style={{ zIndex: 9999 }}
      />
      <div 
        className="relative bg-gray-900 rounded-xl shadow-xl border border-gray-700 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        style={{ zIndex: 10000 }}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
