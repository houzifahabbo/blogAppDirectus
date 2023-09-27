import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { posts } from "../services/directus";
import authServices from "../services/auth";
import Components from "./Components";

function Post() {
	const { id } = useParams();
	const [auth, setAuth] = useState(false);
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const fetchToken = async () => await authServices.getAccessToken();

	useEffect(() => {
		fetchToken().then((result) => setAuth(result ? true : false));

		async function fetchPost() {
			try {
				const postData = await posts.readOne(id);
				const user = await authServices.getUser();
				user.id === postData.user_created ? setAuth(true) : setAuth(false);
				setPost(postData);
				setLoading(false);
			} catch (error) {
				Components.ErrorMessage("postNotFound");
				setLoading(false);
			}
		}
		fetchPost();
	}, [id]);

	if (loading) {
		return Components.Loading();
	}

	if (!post) {
		return Components.ErrorMessage("postNotFound");
	}

	return (
		<div className="App">
			<div>
				<Components.Header button="edit-delete" isAuth={auth} id={post.id} />
			</div>
			<>
				<div className="post" key={post.id}>
					<h1>{post.title}</h1>
					<p>{post.content}</p>
				</div>
			</>
		</div>
	);
}

export default Post;
