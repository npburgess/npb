import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

interface FormData {
	name: string;
	email: string;
	message: string;
}

const EMPTY: FormData = { name: "", email: "", message: "" };

export default function ContactModal() {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [form, setForm] = useState<FormData>(EMPTY);
	const [status, setStatus] = useState("");

	// Open from any element marked data-contact
	useEffect(() => {
		const open = (e: Event) => {
			e.preventDefault();
			dialogRef.current?.showModal();
		};
		const triggers = document.querySelectorAll<HTMLElement>("[data-contact]");
		triggers.forEach((t) => t.addEventListener("click", open));
		return () => triggers.forEach((t) => t.removeEventListener("click", open));
	}, []);

	const close = () => {
		dialogRef.current?.close();
		setStatus("");
	};

	// Click on the backdrop (the dialog element itself, outside the form) closes it.
	const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === dialogRef.current) close();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("Sending…");
		const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
		const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
		const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
		try {
			await emailjs.send(serviceID, templateID, { ...form }, publicKey);
			setStatus("Message sent — thanks, I'll be in touch.");
			setForm(EMPTY);
		} catch {
			setStatus("Something went wrong. Please try again later.");
		}
	};

	const failed = status.startsWith("Something");

	return (
		<dialog ref={dialogRef} className="contact-dialog" onClose={close} onClick={handleBackdropClick}>
			<form onSubmit={handleSubmit}>
				<div className="cd-head">
					<h3 className="disp">Say g'day</h3>
					<button type="button" className="cd-x" onClick={close} aria-label="Close">×</button>
				</div>
				<label className="sr-only" htmlFor="name">Name</label>
				<input id="name" name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
				<label className="sr-only" htmlFor="email">Email</label>
				<input id="email" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
				<label className="sr-only" htmlFor="message">Message</label>
				<textarea id="message" name="message" placeholder="Message" rows={4} value={form.message} onChange={handleChange} required />
				{status && <p className={failed ? "cd-status err" : "cd-status ok"}>{status}</p>}
				<div className="cd-actions">
					<button type="button" className="cd-cancel" onClick={close}>Cancel</button>
					<button type="submit" className="cd-send">Send</button>
				</div>
			</form>

			<style>{`
				.contact-dialog {
					width: calc(100% - 32px);
					max-width: 460px;
					margin: auto;
					border: 1px solid var(--ink);
					border-radius: 10px;
					padding: 0;
					background: var(--paper);
					color: var(--ink);
				}
				.contact-dialog::backdrop { background: rgba(27,42,39,.4); backdrop-filter: blur(2px); }
				.contact-dialog form { padding: 26px; }
				.cd-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
				.cd-head h3 { font-family: "Space Grotesk", sans-serif; font-size: 24px; font-weight: 500; margin: 0; }
				.cd-x { border: 0; background: none; font-size: 24px; line-height: 1; cursor: pointer; color: var(--sub); }
				.cd-x:hover { color: var(--survey); }
				.contact-dialog input, .contact-dialog textarea {
					width: 100%; font-family: "Inter", sans-serif; font-size: 14px; color: var(--ink);
					background: #fff; border: 1px solid #cdd5cf; border-radius: 6px; padding: 10px 12px; margin-bottom: 10px;
				}
				.contact-dialog input:focus, .contact-dialog textarea:focus { outline: 2px solid var(--survey); outline-offset: 1px; border-color: var(--survey); }
				.cd-status { font-size: 13px; margin: 2px 0 10px; }
				.cd-status.ok { color: var(--teal); }
				.cd-status.err { color: #b3402a; }
				.cd-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 6px; }
				.cd-actions button { font-family: "IBM Plex Mono", monospace; font-size: 13px; padding: 9px 18px; border-radius: 6px; cursor: pointer; }
				.cd-cancel { background: transparent; border: 1px solid #cdd5cf; color: var(--ink); }
				.cd-cancel:hover { border-color: var(--ink); }
				.cd-send { background: var(--survey); border: 0; color: #fff; }
				.cd-send:hover { background: var(--teal); }
				.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
			`}</style>
		</dialog>
	);
}
