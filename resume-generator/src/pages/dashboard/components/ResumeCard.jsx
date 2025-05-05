import { FaEye, FaEdit, FaTrashAlt, FaSpinner } from "react-icons/fa";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const gradients = [
  "from-blue-400 via-blue-500 to-indigo-500",
  "from-cyan-400 via-blue-500 to-indigo-600",
  "from-blue-300 via-indigo-400 to-purple-500",
];

const getRandomGradient = () =>
  gradients[Math.floor(Math.random() * gradients.length)];

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const gradient = getRandomGradient();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteThisResume(resume._id);
      toast.success("Resume deleted");
    } catch (error) {
      console.error("Error deleting resume:", error.message);
      toast.error("Failed to delete resume");
    } finally {
      setLoading(false);
      setOpenAlert(false);
      refreshData();
    }
  };

  return (
    <div
      className={`p-1 bg-gradient-to-r ${gradient} rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl`}
    >
      <div className="bg-white rounded-lg p-5 h-full flex flex-col justify-between">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 truncate hover:underline transition-all duration-150">
            {resume.title}
          </h2>
        </div>

        <div className="mt-4 flex items-center justify-around gap-3 border-t pt-4">
          <Button
            variant="ghost"
            onClick={() => navigate(`/dashboard/view-resume/${resume._id}`)}
            className="text-blue-600 hover:bg-blue-50 p-2 rounded-md transition"
            title="View"
          >
            <FaEye className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
            className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition"
            title="Edit"
          >
            <FaEdit className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            onClick={() => setOpenAlert(true)}
            className="text-red-500 hover:bg-red-50 p-2 rounded-md transition"
            title="Delete"
          >
            <FaTrashAlt className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your resume. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={loading}>
              {loading ? <FaSpinner className="animate-spin mr-2" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumeCard;
