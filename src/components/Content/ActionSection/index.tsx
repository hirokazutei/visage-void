import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { Paper } from "../../atom/Paper";
import symbol from "../../../symbol";
import Setting from "./Setting";
import Manual from "./Manual";
import { useStore } from "../../../store";
import { SubTitle } from "../../atom/Text";
import Space from "../../atom/Space";

function TabPanel({ value, index, children }: { value: number; index: number; children: React.ReactNode }) {
  return <div hidden={value !== index}>{value === index && children}</div>;
}

const ActionSection = () => {
  const { state, actions } = useStore();
  const { currentTab, imageInfo } = state;
  const changeTab = (_, tab) => {
    actions.changeTab({ tab });
  };
  return (
    <Paper customStyle={{ paddingTop: 0, maxWidth: 320 }}>
      <Tabs value={currentTab} indicatorColor="primary" textColor="primary" onChange={changeTab}>
        <Tab label={currentTab === 0 ? "Setting" : <span style={{ color: symbol.COLOR.text }}>Setting</span>} />
        <Tab label={currentTab === 1 ? "Manual" : <span style={{ color: symbol.COLOR.text }}>Manual</span>} />
      </Tabs>
      <TabPanel value={currentTab} index={0}>
        <Setting />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        {imageInfo.src ? (
          <Manual />
        ) : (
          <Space.Inset top="large">
            <SubTitle>NO IMAGE HAS BEEN LOADED</SubTitle>
          </Space.Inset>
        )}
      </TabPanel>
    </Paper>
  );
};

export default ActionSection;
