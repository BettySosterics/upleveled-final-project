import Link from 'next/link';
import { getComments } from '../../../database/comments';

export default async function GetAllComments() {
  const comments = await getComments();

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div
            key={`${comment.id}`}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  block text-gray-700  "
          >
            <div>
              {comment.username} said:{' '}
              <p className="italic">{comment.textContent}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
