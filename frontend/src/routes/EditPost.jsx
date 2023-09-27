import { posts } from "../services/directus";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authServices from "../services/auth";
import Components from "./Components";

function Editpost() {
	const { id } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const isAuthunticated = async () => {
			const result = await authServices.getAccessToken();
			if (!result) {
				navigate("/");
			} else {
				async function fetchPost() {
					try {
						const postData = await posts.readOne(id);
						setPost(postData);
						setLoading(false);
					} catch (error) {
						Components.ErrorMessage("postNotFound");
						setLoading(false);
					}
				}
				fetchPost();
			}
		};
		isAuthunticated();
	}, [id, navigate]);

	function handleInputChange(event) {
		const { name, value } = event.target;
		setPost((prevPost) => ({ ...prevPost, [name]: value }));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const { title, content } = document.forms[0];

		await posts
			.updateOne(id, {
				title: title.value,
				content: content.value,
			})
			.catch(() => {
				Components.ErrorMessage("dontHavePermission");
			});
		navigate("/");
	}

	return (
		<div>
			<div>
				<Components.Header />
				{loading ? (
					<Components.Loading />
				) : (
					<form onSubmit={handleSubmit}>
						<Components.TextBox
							text="Title:"
							type="text"
							name="title"
							value={post.title}
							onChange={handleInputChange}
						/>
						<Components.TextBox
							text="Content:"
							type="text"
							name="content"
							value={post.content}
							onChange={handleInputChange}
						/>
						<Components.SubmitButton text="Edit" />
					</form>
				)}
				;
			</div>
		</div>
	);
}

export default Editpost;
