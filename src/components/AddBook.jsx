import React, { useState, useEffect } from "react";
import Header from "./Header";
import { toast } from "react-toastify";
import "../styles/AddBook.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function AddBook(props) {
	const API_URL = "http://localhost:8000/api";

	const initialBookError = {
		titleError: "",
		authorError: "",
		categoryError: "",
		isbnError: "",
	};

	const condition = props.match.params.id !== "new";

	const [book, setBook] = useState({});

	const [bookError, setBookError] = useState({ initialBookError });

	const onThisPage = true;

	const notify = () =>
		toast.success(
			condition
				? "Successfully updated a book!"
				: "Successfully added a new book!",
			{
				position: toast.POSITION.TOP_RIGHT,
			}
		);

	useEffect(() => {
		if (props.match.params.id !== "new") {
			fetch(`${API_URL}/books/${props.match.params.id}`)
				.then(res => res.json())
				.then(result => {
					setBook(result);
				});
		}
	}, [props.match.params.id]);

	function validate() {
		let titleError = "";
		let authorError = "";
		let isbnError = "";
		let reg = /^[0-9]*$/;

		if (!book.title) {
			titleError = "Title cannot be blank!";
		}

		if (!book.author) {
			authorError = "Author cannot be blank!";
		}

		if (!book.ISBN || !reg.test(book.ISBN)) {
			isbnError = "ISBN cannot be blank and must contain only numbers!";
		}

		if (titleError || authorError || isbnError) {
			setBookError({ titleError, authorError, isbnError });
			return false;
		}
		return true;
	}

	function handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		let item = { ...book };
		item[name] = value;
		setBook(item);
		setBookError(initialBookError);
	}

	async function handleSubmit(event) {
		event.preventDefault();

		const isValid = validate();

		if (isValid) {
			await fetch(
				book.id ? `${API_URL}/books/${book.id}` : `${API_URL}/books`,
				{
					method: book.id ? "PUT" : "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(book),
				}
			);
			setBookError(initialBookError);
			notify();
			props.history.push("/");
		}
	}

	return (
		<div id="main-block">
			<Header onPage={onThisPage} />
			<div className="wrapper">
				<form onSubmit={handleSubmit}>
					<label>
						Title:
						<input
							placeholder="Title..."
							type="text"
							name="title"
							value={book.title || ""}
							onChange={handleChange}
						/>
						<div
							style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
						>
							{bookError.titleError}
						</div>
					</label>
					<label>
						Author:
						<input
							placeholder="Author..."
							type="text"
							name="author"
							value={book.author || ""}
							onChange={handleChange}
						/>
						<div
							style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
						>
							{bookError.authorError}
						</div>
					</label>
					<label>
						Category:
						<select
							name="category"
							value={book.category}
							onChange={handleChange}
						>
							<option value="Art & Music">Art & Music</option>
							<option value="Biographies">Biographies</option>
							<option value="Business">Business</option>
							<option value="Comics">Comics</option>
							<option value="Computers & Tech">Computers & Tech</option>
							<option value="Cooking">Cooking</option>
							<option value="Sports">Sports</option>
							<option value="Travel">Travel</option>
							<option value="History">History</option>
						</select>
						<div
							style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
						>
							{bookError.categoryError}
						</div>
					</label>
					<label>
						ISBN:
						<input
							placeholder="ISBN..."
							type="text"
							name="ISBN"
							value={book.ISBN || ""}
							onChange={handleChange}
						/>
						<div
							style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
						>
							{bookError.isbnError}
						</div>
					</label>
					{condition ? (
						<button className="bt bt2" type="submit">
							Update Book
						</button>
					) : (
						<button className="bt bt2" type="submit">
							Add Book
						</button>
					)}
				</form>
			</div>
		</div>
	);
}

export default AddBook;
