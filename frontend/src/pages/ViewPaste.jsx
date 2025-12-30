import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);

  useEffect(() => {
    api
      .get(`/api/pastes/${id}`)
      .then((res) => setPaste(res.data))
      .catch(() => toast.error("Paste not found or expired"));
  }, [id]);

  if (!paste) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Paste</h2>

      <pre className="bg-gray-900 p-4 rounded border border-gray-700 whitespace-pre-wrap">
        {paste.content}
      </pre>

      <div className="mt-4 text-sm text-gray-400">
        {paste.remaining_views !== null && (
          <p>Remaining views: {paste.remaining_views}</p>
        )}
        {paste.expires_at && (
          <p>
            Expires at: {new Date(paste.expires_at).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
