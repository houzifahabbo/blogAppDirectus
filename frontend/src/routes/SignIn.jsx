import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../services/auth";
import Components from "./Components";

function SignIn() {
	const [errorMessages, setErrorMessages] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		let { email, password } = document.forms[0];
		const result = await authServices.loginService(email.value, password.value);
		if (result) {
			navigate("/");
		} else {
			setErrorMessages("wrongCredentials");
		}
	};

	useEffect(() => {
		const isAuthunticated = async () => {
			const result = await authServices.getAccessToken();
			if (result) {
				navigate("/");
			}
		};
		isAuthunticated();
	});

	return (
		<div>
			<div>
				<Components.Header button="signup" />
				<div className="form">
					<form onSubmit={handleSubmit}>
						<Components.TextBox type="text" name="email" text="Email:" />
						<Components.TextBox
							type="password"
							name="password"
							text="Password:"
						/>
						{Components.ErrorMessage(errorMessages)}
						<Components.SubmitButton text="Sign in" />
						<Link to="/forgot-password" className="link">
							Forgot password?
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
