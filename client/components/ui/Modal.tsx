import React, { useEffect, useRef } from "react";
import { Button } from "./button";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    ariaLabel?: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, ariaLabel }) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            dialogRef.current?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel || title || 'Modal'}
            tabIndex={-1}
            ref={dialogRef}
            onKeyDown={e => { if (e.key === 'Escape') onClose(); }}
        >
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg max-w-lg w-full p-8 relative outline-none" role="document">
                <Button
                    variant="ghost"
                    className="absolute top-4 right-4 text-gray-400 hover:text-primary"
                    aria-label="Cerrar modal"
                    onClick={onClose}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </Button>
                {title && <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">{title}</h2>}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
