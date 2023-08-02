import { useContext } from "react";
import { ChildrenProp } from "../../GeneralPropDefinitions/ChildrenProp";
import { OnClickHandler } from "../../GeneralPropDefinitions/OnClickProp";
import { WorkableAreaDispatch } from "../../Contexts/UI/WorkableArea";
import OverlayModal from "./OverlayModal";
import OverlayTooltip from "./OverlayTooltip";

type OverlayDrawerProps = ChildrenProp & {
	onClickHome: OnClickHandler;
	onClickContentButton: OnClickHandler;
	onClickLowButton: OnClickHandler;
};

const OverlayDrawer = ({
	children,
	onClickHome,
	onClickContentButton,
	onClickLowButton,
}: OverlayDrawerProps) => {
	/**
	 * Update workableArea from changes in window size and updates from the span element
	 */
	const dispatchWorkableArea = useContext(WorkableAreaDispatch);

	const drawerContentRef = (elem: HTMLSpanElement | null) => {
		if (elem === null) {
			dispatchWorkableArea({
				type: "updateInnerContentElem",
				innerContentElem: null,
			});
			dispatchWorkableArea({
				type: "updateInnerContentParentElem",
				innerContentParentElem: null,
			});
		} else {
			let parElem = elem.parentElement!;

			dispatchWorkableArea({
				type: "updateInnerContentElem",
				innerContentElem: elem,
			});
			dispatchWorkableArea({
				type: "updateInnerContentParentElem",
				innerContentParentElem: parElem,
			});
		}
	};

	return (
		<>
			<OverlayTooltip />
			<OverlayModal />

			<div className="drawer drawer-mobile">
				<input
					type="checkbox"
					className="drawer-toggle"
					id="my-drawer-2"
				/>
				<div className="drawer-content bg-base-300 flex flex-col">
					<div className="navbar bg-base-100 lg:hidden">
						<div className="flex-none">
							<label
								htmlFor="my-drawer-2"
								className="btn btn-square btn-ghost"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="inline-block w-5 h-5 stroke-current"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									></path>
								</svg>
							</label>
						</div>
						<div className="flex-1">
							<a
								className="btn btn-ghost normal-case text-xl"
								onClick={onClickHome}
							>
								Title
							</a>
						</div>
					</div>

					<span ref={drawerContentRef} className="w-auto h-auto">
						{children}
					</span>
				</div>
				<div className="drawer-side">
					<label
						htmlFor="my-drawer-2"
						className="drawer-overlay"
					></label>
					<ul className="menu p-4 w-80 bg-base-100 text-base-content">
						<li>
							<a
								className="text-3xl normal-case text-center font-bold"
								onClick={onClickHome}
							>
								Title
							</a>
						</li>
						<div className="divider"></div>
						<li>
							<a onClick={onClickContentButton}>Content Button</a>
						</li>
						<li className="mt-auto">
							<a onClick={onClickLowButton}>Low Button</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default OverlayDrawer;
