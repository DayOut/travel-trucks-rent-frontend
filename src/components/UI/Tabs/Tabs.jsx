import React, { useEffect, useRef, useState } from "react";
import css from "./Tabs.module.css";
import clsx from "clsx";

const Tabs = ({ tabs, active, onClick, onKeyDown, className }) => {
  const [underlineCss, setUnderlineCss] = useState({ left: 0, width: 0 });
  const tabsRef = useRef([]);

  useEffect(() => {
    const indx = tabs.findIndex((tab) => tab === active);
    const { width } = tabsRef[indx].getBoundingClientRect();
    setUnderlineCss({
      left: `${tabsRef[indx].offsetLeft}px`,
      width: `${width}px`,
    });
  }, [active, tabs]);

  const handleClick = (index) => {
    onClick(tabs[index]);
  };

  const handleItemKeyDown = (e, index) => {
    console.log("enter");
    if (onKeyDown && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onKeyDown(tabs[index]);
    }
  };

  return (
    <div className={clsx(css.container, className, "prevent-select")}>
      {tabs.map((tab, index) => (
        <h3
          ref={(el) => (tabsRef[index] = el)}
          key={index}
          className={clsx(css.item, tab === active && css.active)}
          onClick={() => handleClick(index)}
          tabIndex={0}
          onKeyDown={(e) => handleItemKeyDown(e, index)}
        >
          {tab}
        </h3>
      ))}
      <div className={css.underline} style={underlineCss}></div>
    </div>
  );
};

export default Tabs;
