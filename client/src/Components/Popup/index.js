import React, { useState, useEffect } from 'react';

const Popup = ({ message, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!message);
  }, [message]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-red-500 text-white p-4 rounded shadow-md">
            <p>{message}</p>
            <button
              onClick={handleClose}
              className="mt-2 bg-white text-red-500 px-4 py-2 rounded hover:bg-red-100 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;