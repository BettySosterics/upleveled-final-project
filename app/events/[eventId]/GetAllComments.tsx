import { getComments } from '../../../database/comments';

export default async function GetAllComments() {
  const comments = await getComments();

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  block text-gray-700  ">
      <h2>COMMENTS</h2>
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
