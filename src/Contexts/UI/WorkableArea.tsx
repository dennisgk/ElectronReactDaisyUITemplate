import React, { createContext, useEffect, useReducer, useState } from "react";
import useSetEventListener from "../../Hooks/UI/useSetEventListener";

type WorkableAreaType = {
	innerContentElem: HTMLElement | null;
	innerContentParentElem: HTMLElement | null;

	left: number;
	right: number;
	bottom: number;
	top: number;
	getScrollTop: () => number; //THESE MUST BE CALLED - DO NOT UPDATE DOM
	getScrollLeft: () => number; //THESE MUST BE CALLED - DO NOT UPDATE DOM
};
type DispatchWorkableAreaAction =
	| {
			type: "updateInnerContentElem";
			innerContentElem: HTMLElement | null;
	  }
	| {
			type: "updateInnerContentParentElem";
			innerContentParentElem: HTMLElement | null;
	  }
	| {
			type: "refreshRect";
	  };

const WorkableAreaInitial = {
	innerContentElem: null,
	innerContentParentElem: null,
	left: 0,
	right: 0,
	bottom: 0,
	top: 0,
	getScrollTop: () => 0,
	getScrollLeft: () => 0,
};

const GetWorkableAreaRect = (workableArea: WorkableAreaType) => {
	if (
		workableArea.innerContentElem === null ||
		workableArea.innerContentParentElem === null
	)
		return {
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		};

	let parRect = workableArea.innerContentParentElem.getBoundingClientRect();
	let elemRect = workableArea.innerContentElem.getBoundingClientRect();

	let rect = {
		top: elemRect.top > parRect.top ? elemRect.top : parRect.top,
		left: parRect.left,
		right: parRect.left + workableArea.innerContentParentElem.clientWidth,
		bottom: parRect.bottom,
	};

	return rect;
};

const DispatchWorkableArea = (
	state: WorkableAreaType,
	action: DispatchWorkableAreaAction
): WorkableAreaType => {
	switch (action.type) {
		case "updateInnerContentElem": {
			let tmpWorkableArea = {
				...state,
				innerContentElem: action.innerContentElem,
			};
			let newWorkableArea = {
				...tmpWorkableArea,
				...GetWorkableAreaRect(tmpWorkableArea),
			};
			return newWorkableArea;
		}
		case "updateInnerContentParentElem": {
			let tmpWorkableArea = {
				...state,
				innerContentParentElem: action.innerContentParentElem,
			};
			let newWorkableArea = {
				...tmpWorkableArea,
				...GetWorkableAreaRect(tmpWorkableArea),

				getScrollTop: () => {
					if (action.innerContentParentElem === null) return 0;
					return action.innerContentParentElem.scrollTop;
				},
				getScrollLeft: () => {
					if (action.innerContentParentElem === null) return 0;
					return action.innerContentParentElem.scrollLeft;
				},
			};
			return newWorkableArea;
		}
		case "refreshRect": {
			return { ...state, ...GetWorkableAreaRect(state) };
		}
	}
};

const useWorkableAreaReducer = (): [
	WorkableAreaType,
	React.Dispatch<DispatchWorkableAreaAction>
] => {
	const [workableArea, dispatchWorkableArea] = useReducer(
		DispatchWorkableArea,
		WorkableAreaInitial
	);

	const [lastWorkableAreaParent, setLastWorkableAreaParent] =
		useState<null | HTMLElement>(null);

	useSetEventListener(
		"resize",
		() => {
			dispatchWorkableArea({
				type: "refreshRect",
			});
		},
		[workableArea]
	);

	useEffect(() => {
		if (lastWorkableAreaParent !== workableArea.innerContentParentElem) {
			dispatchWorkableArea({
				type: "refreshRect",
			});
			setLastWorkableAreaParent(workableArea.innerContentParentElem);
		}
	}, [workableArea, lastWorkableAreaParent]);

	return [workableArea, dispatchWorkableArea];
};

const WorkableAreaContext = createContext<WorkableAreaType>(null!);
const WorkableAreaDispatch = createContext<
	React.Dispatch<DispatchWorkableAreaAction>
>(null!);

export type { WorkableAreaType };
export { WorkableAreaContext, WorkableAreaDispatch, useWorkableAreaReducer };
