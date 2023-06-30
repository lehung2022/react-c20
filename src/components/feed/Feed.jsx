import Post from "../posts/Post";

const Feed = ({ posts }) => {
    return (
        <>
            {posts?.map(post => (
                <Post key={post?.id} post={post} />
            ))}
        </>
    )
}

export default Feed;