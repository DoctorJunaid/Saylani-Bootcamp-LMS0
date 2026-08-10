// import TeamHeader from "../../components/team/TeamHeader";
import TeamColumn from "../../components/team/TeamColumn";

const Teams = () => {
  const data = {
    notStarted: [
      {
        id:1,
        teamName: "Team Alpha",
        title: "Data Pipeline Optimization",
        deadline: "Aug 30, 2025",
        progress: 10,
        status: "Not Started",
        members: [
        "https://i.pravatar.cc/40?img=1",
        "https://i.pravatar.cc/40?img=2",
      ]
      },
    ],
    inProgress: [
      {
        id:2,
        teamName: "Team Alpha",
        title: "E-commerce API Refactor",
        deadline: "Aug 30, 2025",
        progress: 65,
        status: "In Progress",
         members: [
        "https://i.pravatar.cc/40?img=3",
        "https://i.pravatar.cc/40?img=4",
        "https://i.pravatar.cc/40?img=5",
      ]
      },
    ],
    review: [
      {
        id:3,
        teamName: "Tech Titans",
        title: "Authentication Microservice",
        deadline: "Aug 30, 2025",
        progress: 90,
        status: "Under Review",
        members: [
        "https://i.pravatar.cc/40?img=6",
        "https://i.pravatar.cc/40?img=7",
      ]
      },
    ],
  };

  // Column config
  const columns = [
    { key: "notStarted", title: "NOT STARTED" },
    { key: "inProgress", title: "IN PROGRESS" },
    { key: "review", title: "UNDER REVIEW" },
  ];

  return (
    <div className="w-full min-h-screen bg-[var(--color-background)] p-[var(--spacing-lg)]">
      
      {/* Header */}
      {/* <TeamHeader /> */}

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-lg)] mt-[var(--spacing-lg)]">
        
        {columns.map((col) => (
          <TeamColumn
            key={col.key}
            title={col.title}
            teams={data[col.key]}
            count={data[col.key].length}
          />
        ))}

      </div>

    </div>
  );
};

export default Teams;