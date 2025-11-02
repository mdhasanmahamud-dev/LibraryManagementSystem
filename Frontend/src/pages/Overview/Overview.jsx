import OverviewHeader from "./OverviewHeader";
import OverviewTabs from "./OverviewTabs";

const Overview = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <OverviewHeader />
      <OverviewTabs />
    </div>
  );
};

export default Overview;
