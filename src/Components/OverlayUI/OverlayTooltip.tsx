import { useContext, useEffect, useRef, useState } from "react";
import ElemAnimationCallback from "../../Handlers/UI/ElemAnimationCallback";
import {
	TooltipControlContext,
	TooltipControlDispatch,
} from "../../Contexts/UI/TooltipControl";

const OverlayTooltip = () => {
	const tooltipControl = useContext(TooltipControlContext);
	const dispatchTooltipControl = useContext(TooltipControlDispatch);

	const modalDivElem = useRef<HTMLDivElement | null>(null);

	const [shouldShow, setShouldShow] = useState(false);
	const [xPos, setXPos] = useState(0);
	const [yPos, setYPos] = useState(0);

	useEffect(() => {
		if (modalDivElem.current === null) return;
		if (tooltipControl.activated === false) {
			setShouldShow(false);
			return;
		}

		setXPos(
			tooltipControl.coords.x - 0.5 * modalDivElem.current.clientWidth
		);
		setYPos(tooltipControl.coords.y - modalDivElem.current.clientHeight);

		setShouldShow(true);
	}, [tooltipControl]);

	useEffect(() => {
		if (shouldShow === true) return;
		if (modalDivElem.current === null) return;
		if (tooltipControl.cleared === true) return;

		let compCallback = () => {
			setShouldShow(false);
			setYPos(0);
			setXPos(0);
			dispatchTooltipControl({
				type: "clear",
			});
		};

		ElemAnimationCallback(modalDivElem.current, () => compCallback());
		return () => {
			compCallback = () => {};
		};
	}, [shouldShow]);

	return (
		<>
			<div
				className={`select-none fixed transition-opacity ease-in duration-100 z-50 ${
					shouldShow === true ? "opacity-100" : "opacity-0"
				}`}
				style={{
					top: yPos,
					left: xPos,
				}}
				ref={modalDivElem}
			>
				<div className="alert alert-info p-2.5">
					<div>
						<span className="text-xs">{tooltipControl.text}</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default OverlayTooltip;
