import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../services/auth";
import Components from "./Components";
import { bloggers } from "../services/directus";

function SignUp() {
	const navigate = useNavigate();
	const [errorMessages, setErrorMessages] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { email, firstName, lastName } = document.forms[0];
		const user = await bloggers.readByQuery({
			fields: ["email"],
			filter: {
				email: {
					_eq: email.value,
				},
			},
		});
		if (user.data.length > 0) {
			setErrorMessages("emailAlreadyExists");
		} else {
			await authServices
				.signupService(email.value, firstName.value, lastName.value)
				.then(() => {
					navigate("/");
				})
				.catch(() => {
					setErrorMessages("invalidEmail");
				});
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
				<Components.Header button="signin" />
				<div className="form">
					<form onSubmit={handleSubmit}>
						<Components.TextBox type="text" name="email" text="Email:" />
						<Components.TextBox
							type="text"
							name="firstName"
							text="First name:"
						/>
						<Components.TextBox type="text" name="lastName" text="Last name:" />
						{Components.ErrorMessage(errorMessages)}
						<Components.SubmitButton text="Sign up" />
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
