import React, { useState } from 'react';
import BasicCases from './BasicCases';
import SmartFormatting from './SmartFormatting';
import CleanupTools from './CleanupTools';

interface TabsProps {
  text: string;
  setText: (text: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ text, setText }) => {
  const [activeTab, setActiveTab] = useState('cases');

  return (
    <div className="tabs">
      <nav>
        <ul className="tab-list">
          <li className={`tab-item ${activeTab === 'cases' ? 'active' : ''}`}>
            <a href="#cases" onClick={(e) => { e.preventDefault(); setActiveTab('cases'); }}>
              Cases
            </a>
          </li>
          <li className={`tab-item ${activeTab === 'formatting' ? 'active' : ''}`}>
            <a href="#formatting" onClick={(e) => { e.preventDefault(); setActiveTab('formatting'); }}>
              Formatting
            </a>
          </li>
          <li className={`tab-item ${activeTab === 'cleanup' ? 'active' : ''}`}>
            <a href="#cleanup" onClick={(e) => { e.preventDefault(); setActiveTab('cleanup'); }}>
              Cleanup
            </a>
          </li>
        </ul>
      </nav>
      <div className="tab-content">
        {activeTab === 'cases' && <BasicCases text={text} setText={setText} />}
        {activeTab === 'formatting' && <SmartFormatting text={text} setText={setText} />}
        {activeTab === 'cleanup' && <CleanupTools text={text} setText={setText} />}
      </div>
    </div>
  );
};

export default Tabs;