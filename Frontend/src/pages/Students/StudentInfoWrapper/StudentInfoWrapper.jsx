import StudentFinancialInformation from "../StudentFinancialInformation/StudentFinancialInformation";
import StudentInformation from "../StudentAcademicInfo/StudentInformation";
import StudentPaymentTransaction from "../StudentFinancialInformation/StudentPaymentTransaction";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import StudentOtherFeesDetailse from "../StudentFinancialInformation/StudentOtherFeesDetailse";
const StudentInfoWrapper = ({ singleStudent }) => {
  return (
    <div className="mt-2 bg-white border border-gray-300 rounded-md p-8 ">
      <StudentInformation singleStudent={singleStudent} />
      <Tabs>
        <TabList>
          <Tab>Financial Information</Tab>
          <Tab>Other Fees</Tab>
          <Tab>Transaction History</Tab>
        </TabList>
        <TabPanel>
          <StudentFinancialInformation />
        </TabPanel>
        <TabPanel>
          <StudentOtherFeesDetailse />
        </TabPanel>
        <TabPanel>
          <StudentPaymentTransaction  studentId={singleStudent?._id}/>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default StudentInfoWrapper;
