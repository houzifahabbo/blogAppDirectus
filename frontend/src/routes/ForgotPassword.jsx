import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../services/auth";
import Components from "./Components";

function ForgotPassword() {
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { email } = document.forms[0];
		await authServices.forgotPasswordService(email.value);
		navigate("/");
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
				<Components.Header button="signin-signup" />
				<div className="form">
					<form onSubmit={handleSubmit}>
						<Components.TextBox name="email" type="text" text="Email:" />
						<Components.SubmitButton text="Submit" />
					</form>
				</div>
			</div>
		</div>
	);
}

export default ForgotPassword;
