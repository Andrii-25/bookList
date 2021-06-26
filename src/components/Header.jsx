import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header(props) {
	return (
		<div className="header">
			<Link to="/">
				<div className="title">Book List</div>
			</Link>
			{props.onPage ? (
				<Link to="/">
					<button
						className="btn btn2"
						style={{ backgroundColor: "#fc6108" }}
						type="button"
					>
						Back
					</button>
				</Link>
			) : (
				<Link to="/books/new">
					<button className="btn btn2" type="button">
						Add Book
					</button>
				</Link>
			)}
		</div>
	);
}

export default Header;
