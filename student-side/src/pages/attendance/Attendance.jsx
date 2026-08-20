import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export const Attendance = () => {
  const { setPageTitle } = useOutletContext();

  useEffect(() => {
    setPageTitle("Attendance");
  }, [setPageTitle]);

  return (
    <div className="inner-page active fade-in">
      <div className="page-header-row">
        <div>
          <h1 className="page-headline">Attendance</h1>
          <p className="page-sub">
            Your full presence record — Batch 11, MERN Stack Development · Academic Year 2026
          </p>
        </div>
        <div className="filter-bar">
          <button className="range-pill active">This Week</button>
          <button className="range-pill">August</button>
          <button className="range-pill">Full Semester</button>
        </div>
      </div>

      <div className="stat-row attendance-stat-row">
        <div className="stat-card big">
          <span className="stat-label">Overall Rate</span>
          <span className="stat-number huge">92%</span>
          <span className="stat-trend up">Safe · Min required: 75%</span>
        </div>
        <div className="stat-card big">
          <span className="stat-label">Classes Attended</span>
          <span className="stat-number huge">23</span>
          <span className="stat-trend neutral">out of 25 total</span>
        </div>
        <div className="stat-card big">
          <span className="stat-label">Classes Missed</span>
          <span className="stat-number huge warn-text">2</span>
          <span className="stat-trend warn">Can miss 1 more safely</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">August 2026</h3>
        </div>
        <div className="heatmap-grid" style={{ maxWidth: "560px" }}>
          <div className="heatmap-labels">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
          </div>
          <div className="heatmap-cells">
            {(() => {
              const statuses = ['present','present','present','absent','present','present','present','present','absent','present','present','present','present','present','present','present','present','leave','present','present','present','present','present','future','future','future','future','future','future','future'];
              const dayNums  = [4,5,6,7,8,11,12,13,14,15,18,19,20,21,22,25,26,27,28,29,1,2,3,4,5,8,9,10,11,12];
              
              return statuses.map((status, i) => (
                <div 
                  key={i} 
                  className={`heatmap-cell ${status}`}
                  title={status === 'future' ? '' : `${dayNums[i]} Aug — ${status.charAt(0).toUpperCase() + status.slice(1)}`}
                >
                  {dayNums[i]}
                </div>
              ));
            })()}
          </div>
          
          <div className="heatmap-legend" style={{ marginTop: "1.5rem" }}>
            <div className="hl-item"><span className="hl-dot present"></span> Present</div>
            <div className="hl-item"><span className="hl-dot absent"></span> Absent</div>
            <div className="hl-item"><span className="hl-dot leave"></span> Leave</div>
          </div>
        </div>
      </div>

    </div>
  );
};
