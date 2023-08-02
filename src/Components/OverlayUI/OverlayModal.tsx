import { useContext, useEffect, useRef } from "react";
import {
	ModalControlContext,
	ModalControlDispatch,
} from "../../Contexts/UI/ModalControl";
import ElemAnimationCallback from "../../Handlers/UI/ElemAnimationCallback";

const OverlayModal = () => {
	const modalControl = useContext(ModalControlContext);
	const dispatchModalControl = useContext(ModalControlDispatch);

	const modalDivElem = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (modalDivElem.current === null) return;
		if (modalControl.activated === true) return;
		if (modalControl.cleared === true) return;

		let compCallback = () => {
			dispatchModalControl({
				type: "clear",
			});
		};

		ElemAnimationCallback(modalDivElem.current, () => compCallback());
		return () => {
			compCallback = () => {};
		};
	}, [modalControl]);

	return (
		<>
			<input
				type="checkbox"
				className="modal-toggle"
				checked={modalControl.activated}
				onChange={() => {}}
			/>
			<div className="modal">
				<div ref={modalDivElem} className="modal-box">
					{modalControl.content}
				</div>
			</div>
		</>
	);
};

export default OverlayModal;
