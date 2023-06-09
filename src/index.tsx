import React from "react";
import { createRoot } from 'react-dom/client';
import Modal from "react-modal"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import RootLayout from "./pages/layout";
import { Shop } from "./pages/shop";
import * as serviceWorker from "./serviceWorker";

Modal.setAppElement("#root")

/** TODO: Implement 404 route to catch all */
const rootElement = document.getElementById("root");
if (rootElement) {
	const root = createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<RootLayout />}>
						<Route index element={<Shop />} />
					</Route>
				</Routes>
			</BrowserRouter>
  		</React.StrictMode>
	);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
