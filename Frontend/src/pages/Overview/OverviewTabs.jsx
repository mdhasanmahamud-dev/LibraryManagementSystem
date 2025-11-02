import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ClassWiseAmount from "./ClassWiseAmount";
import StudentCountByClass from "./StudentCountByClass";

const OverviewTabs = () => {
  const baseTabClass =
    "px-4 py-3 font-medium cursor-pointer relative transition-all duration-300 " +
    "text-gray-600 hover:text-gray-900 border-b-2 border-transparent " +
    "focus:outline-none focus:ring-0 ";

  const activeTabClass = "!border-blue-600 !text-blue-600";

  return (
    <div className="p-4">
      <Tabs>
        {/* Tab Buttons */}
        <TabList className="flex gap-6 border-b border-gray-200">
          {/* Student Count Tab */}
          <Tab className={baseTabClass} selectedClassName={activeTabClass}>
            ছাত্র সংখ্যা (Student Count)
          </Tab>

          {/* Class-wise Amount Tab */}
          <Tab className={baseTabClass} selectedClassName={activeTabClass}>
            ক্লাসভিত্তিক রিপোর্ট (Class-wise Report)
          </Tab>
        </TabList>

        {/* Tab Panels */}
        <div className="mt-6">
          <TabPanel>
            <StudentCountByClass />
          </TabPanel>
          <TabPanel>
            <ClassWiseAmount />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default OverviewTabs;
