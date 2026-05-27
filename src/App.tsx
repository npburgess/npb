import { useState } from 'react';
import Modal from './components/Modal.tsx';
import ListItem from './components/ListItem.tsx';
import { LINKEDIN_PATH_D, EMAIL_PATH_D, FACEBOOK_PATH_D } from './constants';

import profileImg from '/profile_sm.jpg';
import './App.css';

function App() {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	function handleClick() {
		setModalIsOpen(true);
	}

	function handleClose() {
		setModalIsOpen(false);
	}

	return (
		<>
			<Modal isOpen={modalIsOpen} onClose={handleClose} />
			<section className="bg-white border-1 border-gray-200 max-w-100 min-w-60 absolute text-center p-3.75 rounded-[5px] -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4">
				<img
					src={profileImg}
					alt="The profile picture of Nathaniel Burgess."
					className="shadow-[0_0_8px_rgba(0,0,0,0.5)] w-50 rounded-full mx-auto"
				/>
				<h1 className="text-xl font-bold my-2.5">Nathaniel Burgess</h1>
				<p className="text-slate-500 my-2.5">
					Software Engineer living in <span className="line-through">Los Angeles</span> Launceston, Tasmania.
				</p>
				<p className="text-slate-500 my-2.5">I love tech, a local brew, and travelling with my family.</p>
				<ul className="inline-flex">
					<ListItem
						linkHref="https://www.linkedin.com/pub/nathaniel-burgess/30/942/b69"
						svgClassName="fill-blue-700"
						pathD={LINKEDIN_PATH_D}
					/>
					<ListItem onClick={handleClick} svgClassName="fill-blue-600" pathD={EMAIL_PATH_D} />
					<ListItem
						linkHref="https://www.facebook.com/p/Nathaniel-Burgess-100089553147382/"
						svgClassName="fill-blue-500"
						pathD={FACEBOOK_PATH_D}
					/>
				</ul>
			</section>
		</>
	);
}

export default App;
