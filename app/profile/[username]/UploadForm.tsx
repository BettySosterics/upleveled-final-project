// 'use client';
// import { CldImage, CldUploadButton } from 'next-cloudinary';
// import { useState } from 'react';

// export default function UploadForm() {
//   const [info, updateInfo] = useState();
//   const [error, updateError] = useState();

//   /**
//    * handleOnUpload
//    */

//   function handleOnUpload(error, result, widget) {
//     if (error) {
//       updateError(error);
//       return;
//     }

//     updateInfo(result?.info);

//     widget.close({
//       quiet: true,
//     });
//   }
//   return (
//     <>
//       <div>
//         <CldUploadButton
//           uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
//           onClick={handleOnUpload}
//         />
//       </div>
//     </>
//   );
// }

'use client';
import { CldImage, CldUploadButton } from 'next-cloudinary';
// import { cookies } from 'next/headers';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getUserBySessionToken } from '../../../database/users';

type Props = {
  params: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
};
export default function UserDashboardPage() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  // const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      // // NEW: in order to associate video with user add:
      // formData.append('user_id', currentUserID); // currentUserID is the ID of the logged-in user.

      // POST request to cloudinary's server API using Fetch or Axios
      fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=${uploadPreset}`,
        {
          method: 'POST',
          body: formData,
        },
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.secure_url) {
            // Video URL
            const url = data.secure_url;

            console.log('Video URL: ', url);
          }
        })
        .catch((error) => {
          setUploadError('An error occurred while uploading the file.');
          console.log(error);
        });
    } else {
      setUploadError('Please select a file to upload.');
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            name="file"
            id="file"
            // allow only videos to be uploaded
            accept="image"
            onChange={handleFileChange}
          />
          <button>Upload</button>
        </form>
        {uploadError !== null && <p>{uploadError}</p>}
      </div>
    </>
  );
}
