import { useGetTodayLog } from '@hooks/useGetTodayLog';
import { Box, Typography, Checkbox, CircularProgress } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styled from 'styled-components';
import { characterImageMap } from '@/constants/characterImages';

import type { Character } from '@models/character';
import type { Goal } from '@models/goal';
import type { Log } from '@models/log';

const HabitCard = styled(Box) <{ checked: boolean }>`
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // gap: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  background-color: ${({ checked }) => (checked ? '#B0E501' : '#5B93D5')};

  &:hover {
    background-color: ${({ checked }) => (checked ? '#A0D400' : '#4A80BF')};
  }
`;
const ContentsWrapper = muiStyled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  flexGrow: 1,
});
const CharacterContainer = styled.div`
  position: relative;
  width: 20vw;
  max-width: 80px;
  height: 20vw;
  max-height: 80px;
  @media (max-width: 600px) {
    width: 24vw;
    height: 24vw;
  }
`;

const CharacterImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  background-color: #f2f2f3;
`;

const CharacterNameOverlay = styled(Typography)`
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: bold;
  color: #333;
  background-color: #f2f2f3;
  border-radius: 4px;
`;
const CompletedLabel = styled(Typography)`
  font-weight: bold;
  color: #5b93d5;
  margin-left: 8px;
`;

const CustomCheckbox = muiStyled(Checkbox)({
  color: '#fff',
  '&.Mui-checked': {
    color: '#5B93D5',
  },
  '&.Mui-disabled': {
    color: '#555',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 32,
  },
  width: "50px",
  flexShrink: 0,
  // marginRight: 12,
});
const TextContainer = muiStyled(Box)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '40vw',
  flex: 1,
});
const GoalInfoContainer = muiStyled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const TruncatedTypography = muiStyled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

interface HabitItemProps {
  goal: Goal;
  character?: Character;
  onCheck: (goalId: string, logId?: string) => void;
  todayLog: Log | null;
}

const HabitItem = ({ goal, character, onCheck }: HabitItemProps) => {
  const router = useRouter();
  const { data: log, isLoading, isError } = useGetTodayLog(goal.id);

  const stage = goal.characterStatus?.gone ? 'gone' : goal.characterStatus?.growthStage;
  const charImages = goal.characterId ? characterImageMap[goal.characterId] : null;
  const imagePath = charImages && stage ? charImages[stage as keyof typeof charImages] : '';

  const isTodayCompleted = log?.checked === true;

  return (
    <HabitCard onClick={() => router.push(`/habit/${goal.id}`)} checked={!!isTodayCompleted}>
      {character && (
        <>
          {isLoading && (
            <Typography fontSize={14}>
              <CircularProgress size={18} sx={{ mr: 1, verticalAlign: 'middle' }} />
              오늘 목표 불러오는 중...
            </Typography>
          )}
          {isError && (
            <Typography color="error" fontSize={14}>
              오늘의 목표를 불러오지 못했습니다.
            </Typography>
          )}
          <ContentsWrapper>
            <CharacterContainer>
              {imagePath && (
                <CharacterImage 
                  src={imagePath} 
                  alt={character.name} 
                  width={80}
                  height={80}
                />
              )}
              <CharacterNameOverlay>{character.name}</CharacterNameOverlay>
            </CharacterContainer>
            <TextContainer>
              <GoalInfoContainer>
                <TruncatedTypography variant="h6" sx={{ color: isTodayCompleted ? '#666' : '' }}>
                  {goal.title}
                </TruncatedTypography>
                {goal.description.length > 0 && (
                  <TruncatedTypography sx={{ color: isTodayCompleted ? '#666' : '' }}>
                    설명 : {goal.description}
                  </TruncatedTypography>
                )}
              </GoalInfoContainer>
              {log && isTodayCompleted && <CompletedLabel>오늘 목표 완료!</CompletedLabel>}
            </TextContainer>
          </ContentsWrapper>
          {goal.status === 'in_progress' && log && (
            <CustomCheckbox
              checked={log.checked || false}
              disabled={log.checked}
              onClick={(e) => {
                e.stopPropagation();
                if (!log.checked) onCheck(goal.id, log.id);
              }}
            />
          )}
        </>
      )}
    </HabitCard>
  );
};

export default HabitItem;
