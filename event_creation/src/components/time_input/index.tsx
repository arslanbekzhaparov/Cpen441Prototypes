// TimeSelector.tsx
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
  width: 124.64px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 40px;
  background: #FEFEFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: #59616C;
`;

const TimeItem = styled.div`
  padding: 10px;
  cursor: pointer;
`;

const TimeText = styled.p`
    color: #59616C;

    text-align: center;
    font-family: Inter, sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

interface TimeSelectorProps {
  label: string;
  onSelect: (time: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ label, onSelect }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [defaultTime, setDefaultTime] = useState('9:00'); // Initial default time

  const handleTimeItemClick = (time: string) => {
    onSelect(time);
    setDefaultTime(time); // Update default time dynamically
    setDropdownOpen(false);
  };

  return (
    <Container>
      <Text>{label}:</Text>
      <Selection onClick={() => setDropdownOpen(!isDropdownOpen)}>
        <TimeText>{defaultTime}</TimeText>
      </Selection>
      {isDropdownOpen && (
        <Dropdown>
          {Array.from({ length: 24 }, (_, index) => (
            <TimeItem key={index} onClick={() => handleTimeItemClick(`${index}:00`)}>
              {`${index}:00`}
            </TimeItem>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

export default TimeSelector;