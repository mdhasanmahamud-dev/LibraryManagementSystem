import React from "react";
import { FaClipboardList } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";

const OverviewHeader = () => {
  return (
    <div>
      <PageHeader
        title="Dashboard Overview"
        subtitle="Quick Summary of All Data"
        description="Get a snapshot of total students, teachers, and financial information at a glance."
        icon={<FaClipboardList className="text-6xl md:text-8xl lg:text-9xl opacity-30" />}
      />
    </div>
  );
};

export default OverviewHeader;
