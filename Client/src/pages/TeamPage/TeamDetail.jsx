import { useEffect, useState, useMemo } from "react";
import { X } from "lucide-react";
import StatusBadge from "../../components/team/StatusBadge";
import ProjectCard from "../../components/team/ProjectCard";
import MemberCard from "../../components/team/MemberCrad";
import { fetchTeamById, updateTeam, addMemberToTeam, removeMemberFromTeam, fetchUnassignedStudents } from "../../Data/teams";
import { getStudentData } from "../../api/axios";

export default function TeamDetails({ teamId, onClose }) {
  const [team, setTeam] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // New state for multi-select
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const [teamData, unassignedStudents] = await Promise.all([
          fetchTeamById(teamId),
          fetchUnassignedStudents().catch(async () => {
            // Fallback to getStudentData if unassigned-students route fails
            const res = await getStudentData(token).catch(() => ({ students: [] }));
            return res?.students || [];
          })
        ]);
        
        if (isMounted) {
          setTeam(teamData);
          setAllStudents(unassignedStudents || []);
        }
      } catch (err) {
        if (isMounted) setError(err.message ?? "Unknown error");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [teamId]);

  const projects = team?.projects?.length
    ? team.projects
    : team?.project
    ? [team.project]
    : [];

  const members = team?.members ?? [];
  const memberIds = new Set(members.map(m => m._id || m.id));

  // Available students to add (unassigned & not already in team)
  const availableStudents = useMemo(() => {
    return allStudents.filter(s => !s.team_id && !memberIds.has(s._id || s.id));
  }, [allStudents, memberIds]);

  async function handleAddMember() {
    if (selectedStudentIds.length === 0) return;
    
    setIsUpdating(true);
    try {
      for (const studentId of selectedStudentIds) {
        await addMemberToTeam(teamId, studentId);
      }
      setSelectedStudentIds([]);
      
      const [freshTeam, freshUnassigned] = await Promise.all([
        fetchTeamById(teamId),
        fetchUnassignedStudents().catch(() => [])
      ]);
      setTeam(freshTeam);
      setAllStudents(freshUnassigned);
    } catch (err) {
      alert("Failed to add member: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleRemoveMember(memberIdToRemove) {
    if (!window.confirm("Are you sure you want to remove this member?")) return;

    setIsUpdating(true);
    try {
      await removeMemberFromTeam(teamId, memberIdToRemove);
      
      const [freshTeam, freshUnassigned] = await Promise.all([
        fetchTeamById(teamId),
        fetchUnassignedStudents().catch(() => [])
      ]);
      setTeam(freshTeam);
      setAllStudents(freshUnassigned);
    } catch (err) {
      alert("Failed to remove member: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-lg backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-2xl shadow-xl w-full max-w-[1100px] flex flex-col h-[90vh] overflow-hidden border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="flex justify-between items-center p-xl border-b border-border bg-surface shrink-0">
          <div>
            <h1 className="text-2xl font-weight-bold text-text">
              {team ? team.name : "Team Details"}
            </h1>
            {team && (
              <p className="text-sm text-text-muted mt-xs">
                Manage team members and view assigned projects
              </p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-sm hover:bg-surface-high rounded-full transition-colors text-text-muted hover:text-text"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-xl overflow-y-auto flex-1 bg-background">
          {!isLoading && error && (
            <div className="bg-error/10 text-error p-md rounded-lg text-sm mb-lg border border-error/20 flex items-center gap-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Failed to load team: {error}
            </div>
          )}

          {!isLoading && !error && !team && (
            <div className="text-center py-20 bg-surface rounded-xl border border-border">
              <p className="text-base font-medium text-text-muted">
                Team not found. It may have been deleted.
              </p>
            </div>
          )}

          {!isLoading && !error && team && (
            <div className="flex flex-col gap-xl">
              
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                <div className="bg-surface p-lg rounded-xl border border-border shadow-sm flex flex-col justify-center items-start">
                  <span className="text-sm text-text-muted font-medium mb-1">Status</span>
                  <StatusBadge status={team.status} />
                </div>
                <div className="bg-surface p-lg rounded-xl border border-border shadow-sm flex flex-col justify-center items-start">
                  <span className="text-sm text-text-muted font-medium mb-1">Total Members</span>
                  <span className="text-2xl font-bold text-text">{members.length}</span>
                </div>
                <div className="bg-surface p-lg rounded-xl border border-border shadow-sm flex flex-col justify-center items-start">
                  <span className="text-sm text-text-muted font-medium mb-1">Total Projects</span>
                  <span className="text-2xl font-bold text-text">{projects.length}</span>
                </div>
              </div>

              {/* Projects section */}
              <section className="bg-surface rounded-xl border border-border p-lg shadow-sm">
                <div className="flex items-center justify-between mb-lg">
                  <h2 className="text-xl font-weight-bold text-text">
                    Assigned Projects
                  </h2>
                </div>

                {projects.length === 0 ? (
                  <div className="py-8 text-center bg-surface-low rounded-lg border border-dashed border-border">
                    <p className="text-sm text-text-muted">
                      No projects have been assigned to this team yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
                    {projects.map((project) => (
                      <ProjectCard key={project._id ?? project.id ?? project.title} project={project} />
                    ))}
                  </div>
                )}
              </section>

              {/* Team members section */}
              <section className="bg-surface rounded-xl border border-border p-lg shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-md mb-lg">
                  <h2 className="text-xl font-weight-bold text-text">
                    Team Members
                  </h2>
                  
                  {/* Add Member UI */}
                  <div className="flex flex-col gap-sm items-end">
                    <div className="max-h-40 overflow-y-auto border border-border rounded-lg p-2 bg-surface-low min-w-[280px]">
                      {availableStudents.length === 0 ? (
                        <p className="text-sm text-text-muted p-2 text-center">No available students</p>
                      ) : (
                        availableStudents.map(student => (
                          <label key={student._id || student.id} className="flex items-center gap-3 p-2 hover:bg-surface rounded-md cursor-pointer transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedStudentIds.includes(student._id || student.id)}
                              onChange={(e) => {
                                const id = student._id || student.id;
                                if (e.target.checked) {
                                  setSelectedStudentIds(prev => [...prev, id]);
                                } else {
                                  setSelectedStudentIds(prev => prev.filter(x => x !== id));
                                }
                              }}
                              className="w-4 h-4 accent-primary rounded border-border"
                            />
                            <span className="text-sm font-medium text-text">
                              {student.name} <span className="text-text-muted font-normal">({student.rollNumber})</span>
                            </span>
                          </label>
                        ))
                      )}
                    </div>
                    <button
                      onClick={handleAddMember}
                      disabled={selectedStudentIds.length === 0 || isUpdating}
                      className="bg-primary text-white px-lg py-sm rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap w-full"
                    >
                      Add Selected ({selectedStudentIds.length})
                    </button>
                  </div>
                </div>

                {members.length === 0 ? (
                  <div className="py-8 text-center bg-surface-low rounded-lg border border-dashed border-border">
                    <p className="text-sm text-text-muted">
                      No members have been added to this team yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
                    {members.map((member) => (
                      <MemberCard 
                        key={member._id ?? member.id ?? member.email} 
                        member={member} 
                        onRemove={handleRemoveMember} 
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

