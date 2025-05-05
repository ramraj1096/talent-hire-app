import React, { useState } from "react";
import { CopyPlus, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createResume = async () => {
    setLoading(true);
    if (!resumetitle.trim()) {
      console.log("Please add a title to your resume");
      setLoading(false);
      return;
    }

    const data = {
      data: {
        title: resumetitle.trim(),
        themeColor: "#2563EB", // Tailwind blue-600
      },
    };

    try {
      const res = await createNewResume(data);
      navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
    } catch (error) {
      console.error("Error creating resume:", error.message);
    } finally {
      setLoading(false);
      setResumetitle("");
      setOpenDialog(false);
    }
  };

  return (
    <>
      {/* Resume Add Card */}
      <div
        className="p-14 py-24 flex flex-col items-center justify-center border-2 border-blue-200 bg-blue-50 rounded-xl h-[380px] 
          hover:scale-[1.03] transition-transform duration-300 cursor-pointer hover:shadow-xl group"
        onClick={() => setOpenDialog(true)}
      >
        <CopyPlus className="w-10 h-10 text-blue-500 group-hover:text-blue-600 transition duration-200" />
        <p className="mt-4 text-sm text-blue-600 font-medium">Add New Resume</p>
      </div>

      {/* Dialog for New Resume */}
      <Dialog open={isDialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white max-w-md mx-auto rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-blue-600 text-lg font-semibold">
              Create a New Resume
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm mt-1">
              Give your resume a title. You can edit other details later.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Input
              className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
              type="text"
              placeholder="e.g., Backend Resume"
              value={resumetitle}
              onChange={(e) => setResumetitle(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="ghost"
              onClick={() => setOpenDialog(false)}
              className="hover:bg-gray-100 transition"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={createResume}
              disabled={!resumetitle.trim() || loading}
              className="bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              {loading ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : (
                "Create Resume"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;
