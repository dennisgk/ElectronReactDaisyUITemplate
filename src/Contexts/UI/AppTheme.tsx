import React, { createContext, useReducer } from "react";

type DispatchAppThemeAction = { type: "update"; theme: string };

const AppThemeInitial = "dark";
const DispatchAppTheme = (
	_state: string,
	action: DispatchAppThemeAction
): string => {
	switch (action.type) {
		case "update": {
			document
				.querySelector("html")
				?.setAttribute("data-theme", action.theme);
			return action.theme;
		}
	}
};

const AppThemeContext = createContext<string>(null!);
const AppThemeDispatch = createContext<React.Dispatch<DispatchAppThemeAction>>(
	null!
);

const useAppThemeReducer = (): [
	string,
	React.Dispatch<DispatchAppThemeAction>
] => {
	const [appTheme, dispatchAppTheme] = useReducer(
		DispatchAppTheme,
		AppThemeInitial //set in index.html file
	);

	return [appTheme, dispatchAppTheme];
};

export type { DispatchAppThemeAction };
export { AppThemeContext, AppThemeDispatch, useAppThemeReducer };
