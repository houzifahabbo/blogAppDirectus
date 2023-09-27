import { useEffect } from "react";
import authServices from "../services/auth";
import { posts } from "../services/directus";
import { useNavigate } from "react-router-dom";
import Components from "./Components";

function Addpost() {
	const navigate = useNavigate();
	const fetchToken = async () => await authServices.getAccessToken();

	async function handleSubmit(event) {
		event.preventDefault();
		const accessToken = await fetchToken();
		if (!accessToken) {
			navigate("/signin");
		} else {
			const { title, content } = document.forms[0];
			const result = await posts.createOne({
				title: title.value,
				content: content.value,
			});
			result && navigate("/");
		}
	}

	useEffect(() => {
		const result = fetchToken();
		if (!result) {
			navigate("/signin");
		}
	}, [navigate]);

	return (
		<>
			<Components.Header />
			<div className="form">
				<form onSubmit={handleSubmit}>
					<Components.TextBox text="Title:" type="text" name="title" />
					<Components.TextBox text="Content:" type="text" name="content" />
					<Components.SubmitButton text="Add" />
				</form>
			</div>
		</>
	);
}

export default Addpost;
