import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddBook from "./components/AddBook";
import Dashboard from "./components/Dashboard";

function Routing() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact={true} component={Dashboard} />
				<Route path="/books/:id" component={AddBook} />
			</Switch>
		</Router>
	);
}

export default Routing;
