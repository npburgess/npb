import { useState } from 'react';
import { ARROW_PATH_D } from '../constants';
import emailjs from '@emailjs/browser';

interface ContactFormProps {
	status: string;
	setStatus: React.Dispatch<React.SetStateAction<string>>;
	onClose: () => void;
}

interface FormData {
	name: string;
	email: string;
	message: string;
}

export default function ContactForm({ status, setStatus, onClose }: ContactFormProps) {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		message: ''
	});

	// Handle input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	// Handle form submission
	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus('Sending...');

		const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
		const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
		const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

		try {
			await emailjs.send(serviceID, templateID, formData as any, publicKey);
			setStatus('Message sent successfully!');
			setFormData({ name: '', email: '', message: '' });
		} catch (error) {
			setStatus('Failed to send message. Please try again later.');
		}
	};

	return (
		<form role="form" onSubmit={handleSubmit}>
			<div className="sm:flex sm:items-start px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className="size-6 stroke-blue-600 fill-none"
					>
						<path d={ARROW_PATH_D} />
					</svg>
				</div>
				<div className="grow text-center sm:ml-4 sm:text-left">
					<h3 className="mt-3 sm:mt-0 text-base font-semibold">Say G'day...</h3>
					<div className="mt-2">
						<label className="hidden" htmlFor="senderName">
							Name
						</label>
						<input
							type="text"
							id="senderName"
							name="name"
							placeholder="Name: Joe Blow"
							className="text-sm text-gray-500 border rounded border-gray-300 mb-2 p-2 flex-1 w-full"
							value={formData.name}
							onChange={handleChange}
							required
						/>
						<label className="hidden" htmlFor="emailAddress">
							Email Address
						</label>
						<input
							type="email"
							id="emailAddress"
							name="email"
							placeholder="Email: joe@email.com"
							className="text-sm text-gray-500 border rounded border-gray-300 mb-2 p-2 flex-1 w-full"
							value={formData.email}
							onChange={handleChange}
							required
						/>
						<label className="hidden" htmlFor="emailMessage">
							Email Message
						</label>
						<textarea
							id="emailMessage"
							name="message"
							placeholder="Message: Long winded sentence begging me to play Catan..."
							className="text-sm text-gray-500 border rounded border-gray-300 p-2 w-full"
							rows={4}
							value={formData.message}
							onChange={handleChange}
							required
						/>
					</div>
					{status && (
						<p className={status.includes('Failed') ? 'text-red-600' : 'text-green-600'}>{status}</p>
					)}
				</div>
			</div>
			<div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
				<button
					type="submit"
					className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
					autoFocus
				>
					Send
				</button>
				<button
					type="button"
					className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
					onClick={onClose}
				>
					Cancel
				</button>
			</div>
		</form>
	);
}
