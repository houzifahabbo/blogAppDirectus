import { Link, useNavigate } from "react-router-dom";
import authServices from "../services/auth";
import logo from "../logo.svg";
import "../App.css";
import { posts } from "../services/directus";

const errors = {
	dontHavePermission: "You don't have permission to do this",
	invalidEmail: "Invalid email",
	passwordsNotMatch: "Passwords do not match",
	postNotFound: "Post not found",
	wrongCredentials: "Wrong credentials",
	emailAlreadyExists: "You already have an account with this email address",
	invalidPassword:
		"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
};

const ErrorMessage = (message) => (
	<div className="error">{errors[message]}</div>
);

function Button({ text, handleClick, className }) {
	return (
		<button onClick={handleClick} className={className}>
			{text}
		</button>
	);
}

const SubmitButton = ({ text }) => (
	<div>
		<input type="submit" className="input-button" id="add" value={text} />
	</div>
);

async function DeleteHandleClick(id, navigate) {
	await posts.deleteOne(id);
	navigate("/");
}

async function EditHandleClick(id, navigate) {
	navigate(`/edit-post/${id}`);
}

async function SignoutHandleClick() {
	const token = localStorage.getItem("auth_refresh_token");
	await authServices.logoutService(token);
}

async function checkAuthOrNav(navigate, authEndpoint, nonAuthEndpoint) {
	const result = await authServices.getAccessToken();
	result ? navigate(authEndpoint) : navigate(nonAuthEndpoint);
}

function Header({ button, isAuth, id }) {
	const navigate = useNavigate();

	if (button === "signin") {
		button = (
			<Button
				text="Sign in"
				handleClick={() => {
					checkAuthOrNav(navigate, null, "/signin");
				}}
			/>
		);
	} else if (button === "signup") {
		button = (
			<>
				<Button
					text="Sign up"
					handleClick={() => {
						checkAuthOrNav(navigate, null, "/signup");
					}}
				/>
			</>
		);
	} else if (button === "signin-signup") {
		button = (
			<>
				<Button
					text="Sign in"
					className="first"
					handleClick={() => {
						checkAuthOrNav(navigate, null, "/signin");
					}}
				/>
				<Button
					text="Sign up"
					className="second"
					handleClick={() => {
						checkAuthOrNav(navigate, null, "/signup");
					}}
				/>
			</>
		);
	} else if (button === "edit-delete") {
		button = isAuth ? (
			<>
				<Button
					text="Edit"
					className="first"
					handleClick={() => EditHandleClick(id, navigate)}
				/>

				<Button
					text="Delete"
					className="second"
					handleClick={() => {
						DeleteHandleClick(id, navigate);
					}}
				/>
			</>
		) : null;
	} else if (button === "add-signout") {
		button = isAuth ? (
			<>
				<Button
					text="Add"
					className="first"
					handleClick={() => {
						checkAuthOrNav(navigate, "/add-post", "/signin");
					}}
				/>
				<Button
					text="Sign out"
					className="second"
					handleClick={() => {
						SignoutHandleClick();
					}}
				/>
			</>
		) : (
			<>
				<Button
					text="Sign in"
					className="first"
					handleClick={() => {
						checkAuthOrNav(navigate, null, "/signin");
					}}
				/>
				<Button
					text="Sign up"
					className="second"
					handleClick={() => {
						checkAuthOrNav(navigate, null, "/signup");
					}}
				/>
			</>
		);
	} else {
		button = <></>;
	}

	return (
		<div className="header">
			<Link to={`/`} className="logo">
				Posts
			</Link>
			<div className="header-right">{button}</div>
		</div>
	);
}

const Loading = () => (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
		</header>
	</div>
);

const TextBox = ({ name, type, text, value, onChange }) => (
	<div className="input-container">
		<h4>{text}</h4>
		<input
			type={type}
			name={name}
			required
			className="input"
			{...(value ? { value: value || "", onChange: onChange } : {})}
		/>
	</div>
);

const Components = {
	Header,
	ErrorMessage,
	Loading,
	TextBox,
	SubmitButton,
};

export default Components;
