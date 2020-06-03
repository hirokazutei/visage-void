import React, { useContext } from "react";
import { Tabs, Tab } from "@material-ui/core";
import Context from "../../context";
import { Paper } from "../atom/Paper";
import symbol from "../../symbol";
import Setting from "./Setting";
import Manual from "./Manual";

function TabPanel(props) {
  const { value, index, children } = props;
  return <div hidden={value !== index}>{value === index && children}</div>;
}

const ActionSection = () => {
  const { context, setContext } = useContext(Context);
  const { currentTab } = context;
  const changeTab = (_, value) => {
    setContext({
      ...context,
      currentTab: value,
      editCount: context.editCount + 1,
    });
  };
  return (
    <Paper customStyle={{ paddingTop: 0 }}>
      <Tabs
        value={currentTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={changeTab}
      >
        <Tab
          label={
            currentTab === 0 ? (
              "Setting"
            ) : (
              <span style={{ color: symbol.COLOR.text }}>Setting</span>
            )
          }
        />
        <Tab
          label={
            currentTab === 1 ? (
              "Manual"
            ) : (
              <span style={{ color: symbol.COLOR.text }}>Manual</span>
            )
          }
        />
      </Tabs>
      <TabPanel value={currentTab} index={0}>
        <Setting />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <Manual />
      </TabPanel>
    </Paper>
  );
};

export default ActionSection;
