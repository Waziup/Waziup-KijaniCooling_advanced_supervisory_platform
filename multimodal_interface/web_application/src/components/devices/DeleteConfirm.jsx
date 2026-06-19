import React from 'react';

const DeleteConfirm = ({ device, onCancel, onConfirm }) => {
  // If no device is passed, don't render the modal
  if (!device) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal Content Box */}
      <div className="bg-[#242730] text-gray-100 rounded-xl shadow-2xl w-full max-w-sm p-6 text-center mx-4">
        <h3 className="text-[20px] font-semibold mb-3">Confirm Delete</h3>
        <p className="text-gray-300 text-[14px] mb-8 leading-relaxed px-2">
          Are you sure you want to delete '{device.name} ({device.deviceId})'? This action is irreversible.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 rounded border border-gray-600 bg-[#2C303A] hover:bg-[#353A46] text-white text-[14px] font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 rounded bg-[#FA5A5A] hover:bg-red-500 text-white text-[14px] font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;