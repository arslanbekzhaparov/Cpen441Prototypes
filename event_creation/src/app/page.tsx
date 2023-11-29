// pages/index.tsx
'use client';
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import TimeSelector from '@components/time_input';
import TimeZoneSelector from '@components/timezone';
import Button from '@components/createButton';
import Logo from '@images/logo.svg'


// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(90deg, #29B689 0%, rgba(13, 47, 36, 0.80) 100%);
  overflow:hidden;
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
  margin-bottom: 60px;
  margin-left: 15px;
  width: 100%; /* Ensure full width of the container */
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

const TimeSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 40px;
`;

const TimeSelectorRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const pulse = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Define the changing gradient animation
const changeGradient = keyframes`
  0% {
    background-size: 200% 100%;
  }
  50% {
    background-size: 300% 100%;
  }
  100% {
    background-size: 200% 100%;
  }
`;

const ButtonText = styled.p`
  background: linear-gradient(90deg, #279D50 20.95%, rgba(9, 35, 18, 0.69) 81.87%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${pulse} 2s linear infinite, ${changeGradient} 4s linear infinite; /* Apply both animations */
`;

const SuccessMessage = styled.p`
  color: #279D50;
  font-size: 16px;
  margin-top: 10px;
`;

// Logo container component
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LogoImg = styled.img`
  /* Add styling for your logo image */
  max-width: 100%;
  max-height: 100%;
`;

// Home component
const Home: React.FC = () => {
  const [isEditing, setEditing] = useState(false);
  const [eventName, setEventName] = useState('Add Event Name');
  const [swiperDates, setSwiperDates] = useState<Date[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  

  const handleCreateEvent = () => {
    // Handle the logic for creating a new event
    console.log('Create New Event clicked!');
    
    // Set the state to indicate that the button has been clicked
    setButtonClicked(true);
  };
  
    // Render different content based on the button click
    if (buttonClicked) {
      return (
        <LogoContainer>
          <LogoImg src={Logo} alt="Logo" />
        </LogoContainer>
      );
    }

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

  const handleTimeSelection = () => {
    // Handle the time selection logic here
    console.log('Time selected!');
  };

  const handleTimeZoneSelection = (timeZone: string) => {
    // Handle the timezone selection logic here
    console.log('Time Zone selected:', timeZone);
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
      <TimeSelectorContainer>
        <TimeSelectorRow>
          <TimeSelector label="From"  onSelect={handleTimeSelection} />
        </TimeSelectorRow>
        <TimeSelectorRow>
          <TimeSelector label="To"  onSelect={handleTimeSelection} />
        </TimeSelectorRow>
        <TimeSelectorRow>
        <TimeZoneSelector onSelect={handleTimeZoneSelection} />
        </TimeSelectorRow>
      </TimeSelectorContainer>
      <ButtonContainer>
        <Button>
          <ButtonText>Create New Event</ButtonText>
        </Button>
      </ButtonContainer>
    </Container>
  );
};


export default Home;