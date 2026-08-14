import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2, AlertTriangle } from "lucide-react";
import StudentProfileHeader from "../../components/studentComponents/StudentProfileHeader";
import StudentProfileInfoCard, {
  StudentProfileInfoCardSkeleton,
} from "../../components/studentComponents/StudentProfileInfoCard";
import StudentRecentPerformance from "../../components/studentComponents/StudentRecentPerformance";
import StudentTeamsProjects from "../../components/studentComponents/StudentTeamsProjects";
import EditStudentModal from "../../components/studentComponents/EditStudentModal";
import { getStudentProfile, deleteStudent } from "../../api/student.api";
import toast from "react-hot-toast";
import Skeleton from "../../components/ui/Skeleton";

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const res = await getStudentProfile(id);
      if (!res?.data?.student) {
        throw new Error("Invalid profile response");
      }
      setProfile(res.data);
    } catch (error) {
      console.error("Error fetching student profile:", error);
      toast.error(
        error.response?.data?.message || "Failed to load student profile",
      );
      navigate("/students");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // intentional: run when filter deps change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteStudent(id);
      toast.success("Student deleted successfully");
      navigate("/students");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error(error.response?.data?.message || "Failed to delete student");
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] p-[var(--spacing-lg)] lg:p-[var(--spacing-xl)]">
        <div className="max-w-7xl w-full mx-auto">
          <Skeleton className="h-8 w-56 mb-6" />
          <StudentProfileInfoCardSkeleton />
          <div className="flex flex-col lg:flex-row gap-6">
            <Skeleton className="h-64 flex-1 rounded-[var(--radius-xl)]" />
            <Skeleton className="h-64 w-full lg:w-[400px] rounded-[var(--radius-xl)]" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile?.student) return null;

  const student = profile.student;
  const formattedStudentForEdit = {
    id: student.id,
    rollNo: student.rollNumber,
    name: student.name,
    email: student.email || "",
    phone: student.phone || "",
    course: student.course,
    batch: student.batch,
    team: student.team_id?.name || "—",
    teamId: student.team_id?._id ? String(student.team_id._id) : "",
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-[var(--spacing-lg)] lg:p-[var(--spacing-xl)] flex flex-col">
      <StudentProfileHeader
        student={student}
        onEdit={() => setIsEditModalOpen(true)}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col">
        <StudentProfileInfoCard profile={profile} />

        <div className="flex flex-col lg:flex-row gap-6 items-stretch mb-8">
          <StudentRecentPerformance
            tasks={profile.tasks?.items || profile.recentPerformance || []}
          />
          <StudentTeamsProjects
            team={profile.team}
            projects={profile.projects || []}
          />
        </div>

        <div className="flex justify-center sm:justify-end border-t border-[var(--color-surface-highest)] pt-6 mt-auto">
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-sm font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            Delete Student
          </button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-surface)] rounded-2xl shadow-2xl border border-[var(--color-border)] w-1/3 overflow-hidden p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">
              Delete Student
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[var(--color-text)]">
                {student.name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-[var(--color-surface-low)] hover:bg-[var(--color-surface-high)] text-[var(--color-text)] text-sm font-semibold rounded-lg transition-colors border border-[var(--color-border)] disabled:opacity-50 cursor-pointer"
              >
                No, Keep
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-md flex justify-center items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <EditStudentModal
          student={formattedStudentForEdit}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => {
            setIsEditModalOpen(false);
            fetchProfile();
          }}
        />
      )}
    </div>
  );
};

export default StudentProfile;
