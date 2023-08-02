import React, { createContext, useReducer } from "react";
import { Point } from "../../GeneralTypeDefinitions/PointTyp";

type TooltipControlType = {
	activated: boolean;
	cleared: boolean;
	text: string;
	coords: Point;
};

type DispatchTooltipControlAction =
	| {
			type: "show";
			text: string;
			x: number;
			y: number;
	  }
	| {
			type: "hide";
	  }
	| {
			type: "clear";
	  };

const TooltipControlInitial = {
	activated: false,
	cleared: true,
	text: "",
	coords: {
		x: 0,
		y: 0,
	},
};

const DispatchTooltipControl = (
	state: TooltipControlType,
	action: DispatchTooltipControlAction
): TooltipControlType => {
	switch (action.type) {
		case "show": {
			return {
				activated: true,
				cleared: false,
				text: action.text,
				coords: {
					x: action.x,
					y: action.y,
				},
			};
		}
		case "hide": {
			return { ...state, activated: false };
		}
		case "clear": {
			return {
				...state,
				cleared: true,
				text: "",
				coords: { x: 0, y: 0 },
			};
		}
	}
};

const useTooltipControlReducer = (): [
	TooltipControlType,
	React.Dispatch<DispatchTooltipControlAction>
] => {
	const [tooltipControl, dispatchTooltipControl] = useReducer(
		DispatchTooltipControl,
		TooltipControlInitial
	);

	return [tooltipControl, dispatchTooltipControl];
};

const TooltipControlContext = createContext<TooltipControlType>(null!);
const TooltipControlDispatch = createContext<
	React.Dispatch<DispatchTooltipControlAction>
>(null!);

export type { TooltipControlType };
export {
	TooltipControlContext,
	TooltipControlDispatch,
	useTooltipControlReducer,
};
