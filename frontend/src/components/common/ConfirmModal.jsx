import { useEffect } from 'react';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Reusable confirmation modal.
 *
 * Props:
 *  open         - boolean, controls visibility
 *  title        - string, heading text
 *  description  - string or JSX, message body
 *  confirmLabel - string (default: "Confirm")
 *  cancelLabel  - string (default: "Cancel")
 *  onConfirm    - function, called when user confirms
 *  onClose      - function, called on cancel or backdrop click.
 */
export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const handleBackdrop = (e) => {
    // Only close if backdrop itself is clicked, not modal content
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6 relative animate-fadeIn">
        {/* Close (X) button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <X size={20} />
        </button>

        {title && (
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-sm text-gray-600 mb-6">
            {description}
          </p>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
