import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import authServices from "../services/auth";
import Components from "./Components";
import { posts } from "../services/directus";
import "../App.css";

function Posts() {
	const [loading, setLoading] = useState(true);
	const [auth, setAuth] = useState(false);
	const [postsData, setPostsData] = useState([]);
	const fetchToken = async () => await authServices.getAccessToken();

	useEffect(() => {
		const loadPost = async () => {
			fetchToken().then((result) => setAuth(result ? true : false));
			const result = await posts.readByQuery({ limit: -1 });
			setPostsData(result.data);
			setLoading(false);
		};
		loadPost();
	}, []);

	return (
		<>
			<div className="App">
				{loading ? (
					<Components.Loading />
				) : (
					<div>
						<Components.Header button="add-signout" isAuth={auth} />
						<div className="grid">
							{postsData.map((post) => (
								<Link className={"card"} to={`/post/${post.id}`} key={post.id}>
									<h3>{post.title}</h3>
									<p>{post.content}</p>
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Posts;
