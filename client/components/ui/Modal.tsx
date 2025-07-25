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

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }

            if (e.key === 'Tab') {
                const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
                    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
                );
                if (!focusableElements) return;

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        if (open) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel || title || 'Modal'}
            tabIndex={-1}
            ref={dialogRef}
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
