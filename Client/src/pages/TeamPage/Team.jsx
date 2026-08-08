import TeamHeader from "../../components/team/TeamHeader";
import TeamColumn from "../../components/team/TeamColumn";

const Teams = () => {
  const data = {
    notStarted: [
      {
        title: "Data Pipeline Optimization",
        sprint: "Capstone",
        progress: 10,
        status: "Not Started",
      },
    ],
    inProgress: [
      {
        title: "E-commerce API Refactor",
        sprint: "Sprint 3",
        progress: 65,
        status: "In Progress",
      },
    ],
    review: [
      {
        title: "Authentication Microservice",
        sprint: "Sprint 2",
        progress: 90,
        status: "Under Review",
      },
    ],
  };

  return (
    <div className="bg-[#F8FAFC] p-6  min-h-screen">
      
      <TeamHeader />

      <div className="grid grid-cols-3 gap-6">
        <TeamColumn
          title="NOT STARTED"
          count={data.notStarted.length}
          teams={data.notStarted}
        />

        <TeamColumn
          title="IN PROGRESS"
          count={data.inProgress.length}
          teams={data.inProgress}
        />

        <TeamColumn
          title="UNDER REVIEW"
          count={data.review.length}
          teams={data.review}
        />
      </div>

    </div>
  );
};

export default Teams;