import React from "react";
import Header from "./Header";
import BookTable from "./BookTable";

function Dashboard() {
	return (
		<div id="main-block">
			<Header></Header>
			<BookTable />
		</div>
	);
}

export default Dashboard;
