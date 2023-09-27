import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authServices from "../services/auth";
import Components from "./Components";

function AcceptInvite() {
	const [errorMessages, setErrorMessages] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const params = new URLSearchParams(location.search);
		const token = params.get("token");
		let { confirmPassword, password } = document.forms[0];
		if (confirmPassword.value === password.value) {
			await authServices
				.invitesAcceptService(token, password.value)
				.then(() => {
					navigate("/");
				})
				.catch(() => {
					setErrorMessages("invalidPassword");
				});
		} else {
			setErrorMessages("passwordsNotMatch");
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
				<Components.Header />
				<div className="form">
					<form onSubmit={handleSubmit}>
						<Components.TextBox
							text="Password:"
							type="password"
							name="password"
						/>
						<Components.TextBox
							text="Confirm password:"
							type="password"
							name="confirmPassword"
						/>
						{Components.ErrorMessage(errorMessages)}
						<Components.SubmitButton text="Submit" />
					</form>
				</div>
			</div>
		</div>
	);
}

export default AcceptInvite;
