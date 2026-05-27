import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ContactForm from './ContactForm';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

function Modal({ isOpen, onClose }: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [status, setStatus] = useState<string>('');

	useEffect(() => {
		if (isOpen) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
			setStatus('');
		}
	}, [isOpen]);

	return createPortal(
		<dialog
			className="w-full sm:max-w-150 mt-auto mb-0 sm:mb-auto mx-auto border rounded-sm border-white backdrop:bg-black/40 backdrop:backdrop-blur-xs"
			ref={dialogRef}
			onClose={onClose}
			closedby="any"
		>
			<ContactForm status={status} setStatus={setStatus} onClose={onClose} />
		</dialog>,
		document.getElementById('modal') as HTMLElement
	);
}

export default Modal;
