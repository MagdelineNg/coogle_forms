import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
// import { TabPanel} from '@mui/lab';
import TabList from "@mui/lab/TabList";
import { TabContext, TabPanel } from "@mui/lab";
import Questionform from "./Questionform";
// import "./Tabs.css";

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

const CenteredTabs = (props) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            TabIndicatorProps={{ sx: { bgcolor: "#4C2B87" } }}
            textColor="#3C4043"
            indicateColor="#4C2B87"
            centered
          >
            <Tab label="Questions" className="tab" value="1" />
            <Tab label="Responses" className="tab" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" style={{padding:"0"}}>
          <Questionform />
        </TabPanel>
        <TabPanel value="2">Panel two</TabPanel>
      </TabContext>
    </Box>
    // <Box sx={{ width: "100%" }}>
    //   <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    //     <Tabs value={value} onChange={handleChange} centered>
    //       <Tab label="Questions" className="tab" />
    //       <Tab label="Responses" className="tab" />
    //     </Tabs>
    //   </Box>
    //   <CustomTabPanel value={value} index={0}>
    //     Questions
    //   </CustomTabPanel>
    //   <CustomTabPanel value={value} index={1}>
    //     Responses
    //   </CustomTabPanel>
    // </Box>
  );
};

export default CenteredTabs;
