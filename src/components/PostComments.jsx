import Comment from './Comment'

export default function PostComments(props) {
  const commentElements = props.data.map((comment) => (
    <Comment
      key={comment.id}
      userName={comment.username}
      isAnonymous={comment.isAnonymous}
      commentText={comment.commentText}
    />
  ))

  return <div className="all-comments-container">{commentElements}</div>
}
