// pages/index.tsx
'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: linear-gradient(90deg, #29B689 0%, rgba(13, 47, 36, 0.80) 100%);
`;

const EditableTitle = styled.div`
  display: flex;
  width: 393px;
  height: 53px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 550;
  line-height: normal;
  cursor: text;
  background-color: transparent;
  border: none;
  outline: none;
  margin-top: 40px;
`;

const TitleInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 27px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SwiperContainer = styled.div`
  margin-top: 60px;
  margin-left: 15px;
  width: 100%; /* Ensure full width of the container */
  height: 100%;
  overflow: visible !important; /* Add this line to set overflow: visible */
`;

const Card = styled.div<{ isSelected: boolean }>`
  width: 70px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 15px;
  border: ${({ isSelected }) => (isSelected ? '2px solid #322E2E' : '1px solid rgba(0, 0, 0, 0.25)')};
  background: ${({ isSelected }) => (isSelected ? '#322E2E' : '#FAFCFE')};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${({ isSelected }) => (isSelected ? '-10px' : '10px')};
  cursor: pointer;
  transition: margin-top 0.3s ease, transform 0.3s ease; /* Add smooth transition */
  transform: ${({ isSelected }) => (isSelected ? 'translateY(-10px)' : 'translateY(0)')};
`;


const MonthText = styled.p`
  color: #59616C;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 5px;
`;

const DayText = styled.p`
  color: #8A8A8A;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 10px;
`;

const DateText = styled.p<{ isBold: boolean }>`
  color: #59616C;
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: 36px;
  font-style: normal;
  font-weight: ${({ isBold }) => (isBold ? 'bold' : '500')};
  line-height: normal;
  margin: 0;
`;

// Home component
// Home component
const Home: React.FC = () => {
  const [isEditing, setEditing] = useState(false);
  const [eventName, setEventName] = useState('Add Event Name');
  const [swiperDates, setSwiperDates] = useState<Date[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const handleTitleClick = () => {
    setEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value);
  };

  const handleTitleBlur = () => {
    setEditing(false);

    // If the input is empty, reset to the default text
    if (eventName.trim() === '') {
      setEventName('Add Event Name');
    }
  };

  const getFormattedDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const today = new Date();
    const initialDates = Array.from({ length: 6 }, (_, index) => {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + index);
      return newDate;
    });
    setSwiperDates(initialDates);
  }, []);

  const handleSwiperSlideChange = () => {
    // Add more dates to the end of the array
    const lastDate = swiperDates[swiperDates.length - 1];
    const newDate = new Date(lastDate);
    newDate.setDate(lastDate.getDate() + 1);
    setSwiperDates([...swiperDates, newDate]);
  };

  const handleCardSelect = (index: number) => {
    // Toggle the selection status of the clicked card
    setSelectedCards((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };
  

  return (
    <Container>
      <EditableTitle onClick={handleTitleClick}>
        {isEditing ? (
          <TitleInput
            type="text"
            value={eventName}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            autoFocus
          />
        ) : (
          eventName
        )}
      </EditableTitle>

      <SwiperContainer>
        <Swiper spaceBetween={5} slidesPerView={5} onSlideChange={handleSwiperSlideChange} className="custom-swiper-container">
          {swiperDates.map((date, index) => (
            <SwiperSlide key={index}>
              <Card
                onClick={() => handleCardSelect(index)}
                isSelected={selectedCards.includes(index)}
              >
                <MonthText>{getFormattedDate(date).slice(4, 8)}</MonthText>
                <DayText>{getFormattedDate(date).slice(0, 3)}</DayText>
                <DateText isBold={index === 0}>{getFormattedDate(date).slice(8)}</DateText>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    </Container>
  );
};


export default Home;