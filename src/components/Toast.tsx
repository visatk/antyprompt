import { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import type { ToastMessage } from '../types';

interface ToastProps {
  messages: ToastMessage[];
  onRemove: (id: string) => void;
}

const iconMap = {
  success: { Icon: CheckCircle, color: 'text-accent-green' },
  error: { Icon: AlertCircle, color: 'text-accent-red' },
  info: { Icon: Info, color: 'text-accent-blue' },
};

const progressColors = {
  success: 'bg-accent-green',
  error: 'bg-accent-red',
  info: 'bg-accent-blue',
};

export default function Toast({ messages, onRemove }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {messages.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const { Icon, color } = iconMap[toast.type];

  return (
    <div className="pointer-events-auto glass rounded-lg overflow-hidden min-w-[300px] max-w-sm toast-enter">
      <div className="flex items-center gap-3 px-4 py-3">
        <Icon className={`w-5 h-5 flex-shrink-0 ${color}`} />
        <p className="text-sm text-text-primary flex-1">{toast.message}</p>
        <button
          onClick={() => onRemove(toast.id)}
          className="p-1 rounded hover:bg-bg-glass-hover transition-colors cursor-pointer flex-shrink-0"
        >
          <X className="w-4 h-4 text-text-muted" />
        </button>
      </div>
      {/* Progress bar */}
      <div className="h-0.5 w-full bg-bg-glass">
        <div
          className={`h-full ${progressColors[toast.type]}`}
          style={{ animation: 'progress-shrink 3s linear forwards' }}
        />
      </div>
    </div>
  );
}
