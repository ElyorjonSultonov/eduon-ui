import React from "react";
import OverallHeader from "../OverallHeader/overallHeader";
import "./statistics.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import StudentsStat from "../StudentsStat/studentsStat";
import SpeakerComments from "../SpeakerComments/speakerComments";
import Mycourses from "../Mycourses/Mycourses";
import Finance from "../Finance/Finance";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Statistics(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="statistics container  ">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Umumiy" {...a11yProps(0)} />
            {/* <Tab label="Studentlar" {...a11yProps(1)} /> */}
            <Tab label="Kurslar" {...a11yProps(1)} />
            <Tab label="Moliya" {...a11yProps(2)} />
            {/* <Tab label="Izohlar" {...a11yProps(4)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <OverallHeader />
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
          <StudentsStat />
        </TabPanel> */}{" "}
        <TabPanel value={value} index={1}>
          <Mycourses user={props.user} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Finance />
        </TabPanel>
        {/* <TabPanel value={value} index={4}>
          <SpeakerComments />
        </TabPanel> */}
      </Box>
    </div>
  );
}
