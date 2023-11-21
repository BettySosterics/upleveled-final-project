import { getComments } from '../../../database/comments';

export default async function GetAllComments() {
  const comments = await getComments();

  return (
    <div>
      <h2 className="text-xl">COMMENTS</h2>
      {comments.map((comment) => {
        return (
          <div key={`${comment.id}`}>
            <div>
              <p className="font-light">{comment.username}</p>
              <p className="italic ml-2">{comment.textContent}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
