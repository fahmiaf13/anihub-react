import React, { useState, ReactNode } from "react";
import { css, useTheme } from "@emotion/react";
import { Stack } from "../atoms";

interface TabProps {
  children: ReactNode;
}

interface TabPanelProps {
  label: string;
  children: ReactNode;
}

const Tab: React.FC<TabProps> & { Panel: React.FC<TabPanelProps> } = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const theme = useTheme();

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tabPanels = React.Children.toArray(children) as React.ReactElement<TabPanelProps>[];

  return (
    <div>
      <Stack
        direction="row"
        spacing={0}
        sx={css`
          width: 100%;
          background-color: ${theme.colors.primary};
          border-radius: 10px;
          padding: 10px;
        `}
      >
        {tabPanels.map((panel, index) => (
          <button
            key={index}
            css={css`
              all: unset;
              width: 100%;
              border-radius: 10px;
              padding: 10px;
              cursor: pointer;
              text-align: center;
              &:hover {
                background: ${theme.colors.secondary + "15"};
              }
              ${index === activeTab &&
              css`
                background: ${theme.colors.white};
              `}
            `}
            onClick={() => handleTabClick(index)}
          >
            {panel.props.label}
          </button>
        ))}
      </Stack>
      <div>{tabPanels[activeTab].props.children}</div>
    </div>
  );
};

const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return <>{children}</>;
};

Tab.Panel = TabPanel;

export default Tab;
