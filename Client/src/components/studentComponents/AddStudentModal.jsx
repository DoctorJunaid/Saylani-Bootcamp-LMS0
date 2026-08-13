import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import CustomSelect from '../CustomSelect';
import { createStudent } from '../../api/student.api';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const AddStudentModal = ({ onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    course: '',
    batch: '',
    teamName: 'Unassigned',
  });

  // Fetch teams when modal opens
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get('/api/teams', {
          headers: { Authorization: token ? `Bearer ${token}` : '' }
        });
        
        if (response.data && response.data.data) {
          setTeams(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };
    
    fetchTeams();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (teamName) => {
    setFormData((prev) => ({ ...prev, teamName }));
  };

  const handleSave = async () => {
    // Basic validation
    if (!formData.rollNumber || !formData.name || !formData.course || !formData.batch) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Find the ID of the selected team
      let selectedTeamId = null;
      if (formData.teamName !== 'Unassigned') {
        const matchedTeam = teams.find(t => t.name === formData.teamName);
        console.log("Matched Team:", matchedTeam);
        if (matchedTeam) {
           selectedTeamId = matchedTeam._id || matchedTeam.id;
        }
      }

      console.log("Selected Team ID to send:", selectedTeamId);

      // We only send team_id if they actually selected a valid team
      const studentPayload = {
        rollNumber: formData.rollNumber,
        name: formData.name,
        course: formData.course,
        batch: formData.batch,
        ...(selectedTeamId && { team_id: selectedTeamId })
      };

      console.log("Sending Payload:", studentPayload);

      await createStudent(studentPayload);
      
      toast.success('Student added successfully!');
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (error) {
      console.error('Failed to create student:', error);
      toast.error(error.response?.data?.message || 'Failed to add student');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-xl border border-[var(--color-border)] w-1/2 sm:w-3/4 md:w-1/2 max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 shrink-0">
          <h2 className="text-xl font-bold text-[var(--color-text)]">Add Student</h2>
          <button 
            onClick={onClose}
            className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-low)] rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body (Form) */}
        <div className="p-6 pt-2 overflow-visible">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--color-text-muted)]">Roll Number *</label>
              <input 
                type="text" 
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="e.g. 100234"
                className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors" 
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--color-text-muted)]">Name *</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ali Raza"
                className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors" 
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--color-text-muted)]">Course *</label>
              <input 
                type="text" 
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="e.g. Web & App Dev"
                className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors" 
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--color-text-muted)]">Batch *</label>
              <input 
                type="text" 
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                placeholder="e.g. Batch-10"
                className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors" 
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--color-text-muted)]">Team</label>
              <CustomSelect
                label="Team"
                defaultOption="Unassigned"
                options={teams.map(team => team.name)}
                value={formData.teamName}
                onChange={handleTeamChange}
                className="w-full"
              />
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-[var(--color-surface-highest)]">
          <button 
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-low)] text-[var(--color-text)] text-sm font-semibold rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-5 py-2 bg-[var(--color-primary)] hover:opacity-90 text-[var(--color-on-primary)] text-sm font-semibold rounded-lg transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-[var(--color-on-primary)] animate-spin"></div>
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddStudentModal;
