import React, { useEffect } from "react";

const useSetEventListener = (
	evType: keyof DocumentEventMap | string,
	evListener: EventListenerOrEventListenerObject,
	deps: React.DependencyList | undefined
) => {
	return useEffect(() => {
		window.addEventListener(evType, evListener);

		return () => {
			window.removeEventListener(evType, evListener);
		};
	}, deps);
};

export default useSetEventListener;
