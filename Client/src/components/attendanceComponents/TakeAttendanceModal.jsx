import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

const TakeAttendanceModal = ({ students, onClose, onSave }) => {
  // Initialize attendance draft state (empty by default)
  const [draft, setDraft] = useState({});

  const [activeIndex, setActiveIndex] = useState(0);
  const tableContainerRef = useRef(null);
  const rowRefs = useRef({});

  // Auto-mark the focused student as 'P' if they don't have a status yet
  useEffect(() => {
    const currentStudentId = students[activeIndex]?.id;
    if (currentStudentId) {
      setDraft(prev => {
        if (!prev[currentStudentId]) {
          return { ...prev, [currentStudentId]: 'P' };
        }
        return prev;
      });
    }
  }, [activeIndex, students]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Handle keyboard events globally when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const currentStudentId = students[activeIndex]?.id;
      if (!currentStudentId) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setDraft((prev) => {
          const currentStatus = prev[currentStudentId] || 'P';
          const nextStatus = currentStatus === 'P' ? 'A' : currentStatus === 'A' ? 'L' : 'P';
          return { ...prev, [currentStudentId]: nextStatus };
        });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setDraft((prev) => {
          const currentStatus = prev[currentStudentId] || 'P';
          const nextStatus = currentStatus === 'P' ? 'L' : currentStatus === 'A' ? 'P' : 'A';
          return { ...prev, [currentStudentId]: nextStatus };
        });
      } else if (e.key === 'Enter' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeIndex < students.length - 1) {
          setActiveIndex((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeIndex > 0) setActiveIndex((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, students]);

  // Auto-scroll to active row
  useEffect(() => {
    const activeRow = rowRefs.current[activeIndex];
    if (activeRow && tableContainerRef.current) {
      activeRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeIndex]);

  const markAllPresent = () => {
    setDraft((prev) => {
      const newState = { ...prev };
      students.forEach((s) => {
        newState[s.id] = 'P';
      });
      return newState;
    });
  };

  const handleSave = () => {
    // Convert draft (P, A, L) back to actual status (Present, Absent, Leave)
    const statusMap = { P: 'Present', A: 'Absent', L: 'Leave' };
    const updates = students.map(s => ({
      id: s.id,
      status: statusMap[draft[s.id]] || 'Not marked'
    }));
    
    onSave(updates);
    onClose();
  };

  const Bubble = ({ letter, active, onClick, colorClass }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border transition-colors ${
        active 
          ? colorClass 
          : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-low)]'
      }`}
    >
      {letter}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-2xl border border-[var(--color-border)] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-surface-highest)] shrink-0">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text)]">Daily Attendance</h2>
            <p className="text-sm font-medium text-[var(--color-text-muted)] mt-1">{currentDate}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={markAllPresent}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-low)] hover:bg-[var(--color-surface-high)] text-[var(--color-text)] text-sm font-medium rounded-lg transition-colors border border-[var(--color-border)]"
            >
              <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
              Mark all present
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-low)] rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Keyboard Hint */}
        <div className="bg-[var(--color-primary-container)]/10 px-6 py-3 shrink-0 flex items-center justify-center border-b border-[var(--color-surface-highest)]">
          <p className="text-xs font-medium text-[var(--color-primary)]">
            <strong className="mr-2">Keyboard Shortcuts:</strong> 
            Use <kbd className="px-1.5 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded mx-1">←</kbd>
            <kbd className="px-1.5 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded mx-1">→</kbd> 
            arrows to switch between P, A, and L. 
            Press <kbd className="px-1.5 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded mx-1">Enter</kbd> to move to next student.
          </p>
        </div>

        {/* Table Body */}
        <div ref={tableContainerRef} className="flex-1 overflow-y-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="sticky top-0 bg-[var(--color-surface)] z-10 shadow-sm">
              <tr className="border-b border-[var(--color-surface-highest)]">
                <th className="px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Roll No</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-surface-highest)] text-sm">
              {students.map((student, index) => {
                const isActive = activeIndex === index;
                const status = draft[student.id];

                return (
                  <tr 
                    key={student.id} 
                    ref={(el) => (rowRefs.current[index] = el)}
                    onClick={() => setActiveIndex(index)}
                    className={`transition-colors cursor-pointer ${
                      isActive ? 'bg-[var(--color-primary-container)]/10' : 'hover:bg-[var(--color-surface-low)]'
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-[var(--color-text-muted)] text-[13px]">
                      {student.rollNo}
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#0284c7]">
                      {student.name}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <Bubble 
                          letter="P" 
                          active={status === 'P'} 
                          onClick={() => setDraft({ ...draft, [student.id]: 'P' })}
                          colorClass="bg-[#dcfce7] border-[#16a34a] text-[#16a34a]" 
                        />
                        <Bubble 
                          letter="A" 
                          active={status === 'A'} 
                          onClick={() => setDraft({ ...draft, [student.id]: 'A' })}
                          colorClass="bg-[#fee2e2] border-[#ef4444] text-[#ef4444]" 
                        />
                        <Bubble 
                          letter="L" 
                          active={status === 'L'} 
                          onClick={() => setDraft({ ...draft, [student.id]: 'L' })}
                          colorClass="bg-[#ffedd5] border-[#ea580c] text-[#ea580c]" 
                        />
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <input 
                        type="text" 
                        placeholder="Add note..."
                        className={`w-full bg-transparent border-none focus:ring-0 text-xs font-medium text-[var(--color-text)] placeholder-[var(--color-text-muted)] outline-none ${
                          isActive ? 'opacity-100' : 'opacity-50'
                        }`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end p-6 border-t border-[var(--color-surface-highest)] shrink-0 bg-[var(--color-surface)] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 bg-[var(--color-primary)] hover:opacity-90 text-[var(--color-on-primary)] text-sm font-semibold rounded-lg transition-colors shadow-md"
          >
            Save Attendance
          </button>
        </div>

      </div>
    </div>
  );
};

export default TakeAttendanceModal;
