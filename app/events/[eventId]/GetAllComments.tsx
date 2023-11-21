import { getComments } from '../../../database/comments';

export default async function GetAllComments() {
  const comments = await getComments();

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div key={`comment-${comment.id}`}>
            <div className="text-textColorNavbar mb-4">
              <p className="font-light ">{comment.username} wrote:</p>
              <p className="italic ml-2  left-5 bg-backgroundNavbar py-2 px-3 rounded-lg">
                {comment.textContent}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
