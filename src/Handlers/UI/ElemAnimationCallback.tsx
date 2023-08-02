const ElemAnimationCallback = (elem: HTMLElement, callback: () => any) => {
	let waitingAnims: Array<Animation> = [];
	let parent: null | HTMLElement = elem;
	while (parent !== null) {
		waitingAnims.push(...parent.getAnimations());
		parent = parent.parentElement;
	}

	if (waitingAnims.length <= 0) {
		callback();
		return;
	}

	let waitingAnimsCopy = [...waitingAnims];

	for (let i = 0; i < waitingAnimsCopy.length; i++) {
		let individWaitingAnim = waitingAnimsCopy[i];

		let evListener = () => {
			individWaitingAnim.removeEventListener("cancel", evListener);
			individWaitingAnim.removeEventListener("finish", evListener);
			individWaitingAnim.removeEventListener("remove", evListener);

			waitingAnims.splice(waitingAnims.indexOf(individWaitingAnim), 1);

			if (waitingAnims.length === 0) {
				callback();
			}
		};

		individWaitingAnim.addEventListener("cancel", evListener);
		individWaitingAnim.addEventListener("finish", evListener);
		individWaitingAnim.addEventListener("remove", evListener);
	}
};

export default ElemAnimationCallback;
