import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import authServices from "../services/auth";
import Components from "./Components";

function ResetPassword() {
	const navigate = useNavigate();
	const location = useLocation();
	const [errorMessages, setErrorMessages] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const params = new URLSearchParams(location.search);
		const token = params.get("token");
		const { password, confirmPassword } = document.forms[0];

		if (confirmPassword.value !== password.value) {
			setErrorMessages("passwordsNotMatch");
		} else {
			await authServices.resetPasswordService(
				token,
				password.value
			).then(()=>navigate("/signin")).catch(()=>setErrorMessages("invalidPassword"));
		}
	};

	return (
		<div>
			<div>
				<Components.Header />
				<div className="form">
					<form onSubmit={handleSubmit}>
						<Components.TextBox
							type="password"
							name="password"
							text="Password:"
						/>
						<Components.TextBox
							type="password"
							name="confirmPassword"
							text="Confirm password:"
						/>
						{Components.ErrorMessage(errorMessages)}
						<Components.SubmitButton text="Reset password" />
					</form>
				</div>
			</div>
		</div>
	);
}

export default ResetPassword;
