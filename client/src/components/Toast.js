import { useEffect } from 'react';

// Usage: <Toast message="..." type="success|error" onClose={() => setToast(null)} />
export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return <div className={`toast ${type}`}>{message}</div>;
}