import {
	AppThemeContext,
	AppThemeDispatch,
	useAppThemeReducer,
} from "./UI/AppTheme";
import { ChildrenProp } from "../GeneralPropDefinitions/ChildrenProp";
import {
	WorkableAreaContext,
	WorkableAreaDispatch,
	useWorkableAreaReducer,
} from "./UI/WorkableArea";
import {
	ModalControlContext,
	ModalControlDispatch,
	useModalControlReducer,
} from "./UI/ModalControl";
import {
	TooltipControlContext,
	TooltipControlDispatch,
	useTooltipControlReducer,
} from "./UI/TooltipControl";

type PanContextualProviderProps = ChildrenProp;

const PanContextualProvider = ({ children }: PanContextualProviderProps) => {
	const [appTheme, dispatchAppTheme] = useAppThemeReducer();
	const [workableArea, dispatchWorkableArea] = useWorkableAreaReducer();
	const [modalControl, dispatchModalControl] = useModalControlReducer();
	const [tooltipControl, dispatchTooltipControl] = useTooltipControlReducer();

	return (
		<AppThemeContext.Provider value={appTheme}>
			<AppThemeDispatch.Provider value={dispatchAppTheme}>
				<WorkableAreaContext.Provider value={workableArea}>
					<WorkableAreaDispatch.Provider value={dispatchWorkableArea}>
                        <ModalControlContext.Provider
                            value={modalControl}
                        >
                            <ModalControlDispatch.Provider
                                value={
                                    dispatchModalControl
                                }
                            >
                                <TooltipControlContext.Provider
                                    value={
                                        tooltipControl
                                    }
                                >
                                    <TooltipControlDispatch.Provider
                                        value={
                                            dispatchTooltipControl
                                        }
                                    >
                                        {children}
                                    </TooltipControlDispatch.Provider>
                                </TooltipControlContext.Provider>
                            </ModalControlDispatch.Provider>
                        </ModalControlContext.Provider>
					</WorkableAreaDispatch.Provider>
				</WorkableAreaContext.Provider>
			</AppThemeDispatch.Provider>
		</AppThemeContext.Provider>
	);
};

export default PanContextualProvider;
