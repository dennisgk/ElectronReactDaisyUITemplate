import React, { createContext, useReducer } from "react";

type ModalControlType = {
	activated: boolean;
	content: React.JSX.Element;
	cleared: boolean;
};

type DispatchModalControlAction =
	| {
			type: "showRaw";
			content: React.JSX.Element;
	  }
	| {
			type: "hide";
	  }
	| {
			type: "clear";
	  };

const ModalControlInitial = {
	activated: false,
	content: <></>,
	cleared: true,
};

const DispatchModalControl = (
	state: ModalControlType,
	action: DispatchModalControlAction
): ModalControlType => {
	switch (action.type) {
		case "showRaw": {
			return {
				activated: true,
				cleared: false,
				content: action.content,
			};
		}
		case "hide": {
			return { ...state, activated: false };
		}
		case "clear": {
			return { ...state, cleared: true, content: <></> };
		}
	}
};

const useModalControlReducer = (): [
	ModalControlType,
	React.Dispatch<DispatchModalControlAction>
] => {
	const [modalControl, dispatchModalControl] = useReducer(
		DispatchModalControl,
		ModalControlInitial
	);

	return [modalControl, dispatchModalControl];
};

const ModalControlContext = createContext<ModalControlType>(null!);
const ModalControlDispatch = createContext<
	React.Dispatch<DispatchModalControlAction>
>(null!);

export type { ModalControlType };
export { ModalControlContext, ModalControlDispatch, useModalControlReducer };
