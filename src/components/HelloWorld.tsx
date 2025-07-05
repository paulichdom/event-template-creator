import React from "react";
import { Tabs } from "antd";

const App: React.FC = () => {
  return (
    <Tabs
      tabBarGutter={4}
      defaultActiveKey="1"
      items={Array.from({ length: 3 }).map((_, i) => {
        const id = String(i + 1);
        return {
          label: <span style={{ padding: '0 16px' }}>{`Tab ${id}`}</span>,
          key: id,
          children: <div style={{ padding: '0 16px' }}>Content of Tab Pane {id}</div>,
        };
      })}
    />
  );
};

export default App;
