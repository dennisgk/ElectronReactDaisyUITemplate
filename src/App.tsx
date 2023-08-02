import "./index.css";
import OverlayDrawer from "./Components/OverlayUI/OverlayDrawer";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/Pages/Home";

const App = () => {
	const navigate = useNavigate();

	return (
		<OverlayDrawer
			onClickHome={() => navigate("/")}
			onClickContentButton={() => navigate("/")}
			onClickLowButton={() => navigate("/")}
		>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</OverlayDrawer>
	);
};

export default App;
