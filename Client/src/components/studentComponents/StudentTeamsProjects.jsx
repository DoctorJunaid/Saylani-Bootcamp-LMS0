import React from 'react';
import { Rocket, Monitor, ChevronRight } from 'lucide-react';

const teamsData = [
  { 
    id: 1, 
    title: 'Capstone Group A', 
    subtitle: 'E-commerce Platform', 
    icon: <Rocket className="h-4 w-4" />, 
    iconBg: 'bg-[#e0f2fe]', 
    iconText: 'text-[#2563eb]' 
  },
  { 
    id: 2, 
    title: 'Hackathon Squad', 
    subtitle: 'Data Viz Challenge', 
    icon: <Monitor className="h-4 w-4" />, 
    iconBg: 'bg-[var(--color-surface-high)]', 
    iconText: 'text-[var(--color-text-muted)]' 
  },
];

const StudentTeamsProjects = () => {
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] border border-[var(--color-border)] p-6 w-full lg:w-[400px] flex flex-col h-full shrink-0">
      
      <h3 className="text-lg font-bold text-[var(--color-text)] tracking-tight mb-6">Teams & Projects</h3>
      
      <div className="flex flex-col gap-3">
        {teamsData.map((team) => (
          <div key={team.id} className="group flex items-center justify-between p-4 border border-[var(--color-border)] rounded-[var(--radius-md)] hover:bg-[var(--color-surface-low)] cursor-pointer transition-colors shadow-sm">
            
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${team.iconBg} ${team.iconText}`}>
                {team.icon}
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                  {team.title}
                </span>
                <span className="text-xs font-medium text-[var(--color-text-muted)] mt-0.5">
                  {team.subtitle}
                </span>
              </div>
            </div>
            
            <ChevronRight className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
            
          </div>
        ))}
      </div>

    </div>
  );
};

export default StudentTeamsProjects;
