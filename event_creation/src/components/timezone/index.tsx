// TimeZoneSelector.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Text = styled.p`
  color: #FFF;
  font-family: Inter, sans-serif;
  font-size: 20px;
  margin-right: 10px;
`;

const Selection = styled.div`
  width: 250px; /* Adjust the width as needed */
  height: 37px;
  flex-shrink: 0;
  border-radius: 40px;
  background: #FEFEFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  transition: background-color 0.3s ease; /* Add smooth transition */

  &:hover {
    background-color: #D4D4D4; /* Change to a different color on hover */
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background: #FEFEFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  z-index: 1;
`;

const TimeZoneItem = styled.div`
  padding: 10px;
  cursor: pointer;
`;
const TimeZoneText = styled.p`
    color: #59616C;

    text-align: center;
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

interface TimeZoneSelectorProps {
  onSelect: (timeZone: string) => void;
}

const TimeZoneSelector: React.FC<TimeZoneSelectorProps> = ({ onSelect }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTimeZone, setSelectedTimeZone] = useState('America/Vancouver GMT-07:00 PDT'); // Initial selected timezone

  const timeZoneList = [
    'America/Vancouver GMT-07:00 PDT',
    'America/New_York GMT-05:00 EST',
    'America/Chicago GMT-06:00 CST',
    'America/Denver GMT-07:00 MST',
    'America/Los_Angeles GMT-08:00 PST',
    'America/Phoenix GMT-07:00 MST (No DST)',
    'America/Anchorage GMT-09:00 AKST',
    'Pacific/Honolulu GMT-10:00 HST',
    'Europe/London GMT+00:00 GMT (No DST)',
    'Europe/Paris GMT+01:00 CET',
    'Europe/Berlin GMT+01:00 CET',
    'Europe/Rome GMT+01:00 CET',
    'Europe/Madrid GMT+01:00 CET',
    'Europe/Istanbul GMT+03:00 TRT (No DST)',
    'Asia/Tokyo GMT+09:00 JST',
    'Asia/Shanghai GMT+08:00 CST',
    'Asia/Hong_Kong GMT+08:00 HKT',
    'Asia/Dubai GMT+04:00 GST (No DST)',
    'Asia/Kolkata GMT+05:30 IST',
  ];

  const handleTimeZoneItemClick = (timeZone: string) => {
    onSelect(timeZone);
    setSelectedTimeZone(timeZone); // Update selected timezone dynamically
    setDropdownOpen(false);
  };

  return (
    <Container>
      <Text>Time Zone:</Text>
      <Selection onClick={() => setDropdownOpen(!isDropdownOpen)}>
        <TimeZoneText>{selectedTimeZone}</TimeZoneText>
      </Selection>
      {isDropdownOpen && (
        <Dropdown>
          {timeZoneList.map((timeZone) => (
            <TimeZoneItem key={timeZone} onClick={() => handleTimeZoneItemClick(timeZone)}>
              {timeZone}
            </TimeZoneItem>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

export default TimeZoneSelector;