// src/components/dashboard/FileUpload.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Adjust path
import { v4 as uuidv4 } from 'uuid'; // For generating unique file names

// Define a type for the props, including the onUploadSuccess callback
interface FileUploadProps {
  onUploadSuccess?: (uploadResult: { filePath: string; fileName: string }) => void;
  teacherId: string; // Assuming teacherId is passed as a prop
  storageBucket?: string; // Optional: specify bucket, defaults to 'textbook_images'
}

export default function FileUpload({
  onUploadSuccess,
  teacherId,
  storageBucket = 'textbook_images'
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
      setMessage(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    if (!teacherId) {
      setError('User not identified. Cannot upload file.');
      return;
    }

    setUploading(true);
    setError(null);
    setMessage(null);

    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${teacherId}/${uuidv4()}.${fileExtension}`; // Organize by teacherId in bucket

    try {
      const { data, error: uploadError } = await supabase.storage
        .from(storageBucket) // Your designated bucket name for textbook images
        .upload(uniqueFileName, file, {
          cacheControl: '3600', // Optional: cache control
          upsert: false, // Optional: true to overwrite, false to error if file exists
        });

      if (uploadError) {
        setError(`Upload failed: ${uploadError.message}`);
      } else if (data) {
        setMessage(`File uploaded successfully: ${file.name}`);
        console.log('Upload successful, path:', data.path);

        // Call the callback function if provided
        if (onUploadSuccess) {
          onUploadSuccess({ filePath: data.path, fileName: file.name });
        }

        // Here you would typically also save metadata to your `textbook_uploads` table
        // This might involve calling a serverless function or directly using supabase.from('textbook_uploads').insert(...)
        // For example:
        /*
        const { error: dbError } = await supabase
          .from('textbook_uploads')
          .insert({
            teacher_id: teacherId, // Make sure you have teacherId
            file_name: file.name,
            file_path: data.path,
            storage_bucket: storageBucket,
            file_size_bytes: file.size,
            content_type: file.type,
            // language_code, grade_level, subject might be collected from another form
          });

        if (dbError) {
          console.error('Error saving upload metadata:', dbError);
          setError('Upload succeeded, but failed to save metadata: ' + dbError.message);
        }
        */
      }
    } catch (e: any) {
      setError('An unexpected error occurred during upload: ' + e.message);
    } finally {
      setUploading(false);
      setFile(null); // Clear the file input after attempt
      // Consider clearing the actual file input element value if needed:
      // if (event.target instanceof HTMLFormElement) event.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
      <div>
        <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
          Upload Textbook Image/PDF
        </label>
        <input
          id="fileUpload"
          type="file"
          onChange={handleFileChange}
          accept="image/*,.pdf" // Specify accepted file types
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {message && <p className="text-green-500 text-sm">{message}</p>}
      <div>
        <button
          type="submit"
          disabled={uploading || !file}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
      </div>
    </form>
  );
}
