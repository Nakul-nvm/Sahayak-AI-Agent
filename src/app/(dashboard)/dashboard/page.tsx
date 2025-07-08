// Example usage in a dashboard page (e.g., src/app/(dashboard)/dashboard/page.tsx)
// This is a simplified example. You'd need to get the user session.

'use client'; // If it needs to be interactive or use hooks like useState, useEffect

import FileUpload from '@/components/dashboard/FileUpload'; // Adjust path
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      // Could add logic here if event is 'SIGNED_IN' and user was null, then redirect, etc.
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleUploadComplete = async (result: { filePath: string; fileName: string }) => {
    console.log('File upload successful in parent:', result);
    // You might want to refresh a list of uploaded files here or show a notification.
    // And trigger the API call to your backend for OCR and worksheet generation.
    // e.g., callWorksheetGenerationAPI(result.filePath, result.fileName, user.id);

    // Example: Save metadata to textbook_uploads table
    if (user) {
      try {
        const { error: dbError } = await supabase
          .from('textbook_uploads')
          .insert({
            teacher_id: user.id,
            file_name: result.fileName,
            file_path: result.filePath,
            storage_bucket: 'textbook_images', // ensure this matches the bucket used in FileUpload
            // file_size_bytes: uploadedFile.size, // You might need to get this from the FileUpload component
            // content_type: uploadedFile.type, // Same as above
            ocr_status: 'pending', // Default status
            // language_code, grade_level, subject: These would be collected from other form fields
          });

        if (dbError) {
          console.error('Error saving upload metadata:', dbError);
          alert('Upload succeeded, but failed to save metadata: ' + dbError.message);
        } else {
          alert('File uploaded and metadata saved! You can now process it.');
          // Potentially trigger the call to the worksheet generation API endpoint here
          // await fetch('/api/generate/worksheet', {
          //   method: 'POST',
          //   body: JSON.stringify({ filePath: result.filePath, /* other params */ })
          // });
        }
      } catch (e) {
        console.error('Error in handleUploadComplete:', e);
        alert('An unexpected error occurred while saving metadata.');
      }
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading user information...</div>;
  }

  if (!user) {
    // This should ideally be handled by middleware or a layout that redirects to login
    return <div className="p-6 text-center">Please log in to view the dashboard. <a href="/login" className="text-indigo-600">Login</a></div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Teacher Dashboard</h1>
      <p className="mb-6">Welcome, {user.email}!</p>

      <div className="mb-8 p-4 border rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Upload New Textbook Section</h2>
        <FileUpload
          teacherId={user.id}
          onUploadSuccess={handleUploadComplete}
          storageBucket="textbook_images"
        />
        <p className="mt-2 text-xs text-gray-500">
          After uploading, you can initiate worksheet generation from the uploaded content.
          Additional fields for grade, subject, and language will be needed for processing.
        </p>
      </div>

      {/* Other dashboard content would go here:
      - List of uploaded files
      - List of generated worksheets
      - Lesson plan creator/viewer
      - Q&A interface
      */}
    </div>
  );
}
