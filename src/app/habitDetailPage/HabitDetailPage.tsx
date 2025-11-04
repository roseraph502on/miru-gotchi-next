'use client';

import BeforeBtn from '@/components/BeforeBtn';
import CharacterBox from '@/components/CharacterBox';
import { useAuthContext } from '@/hooks/auth/useAuthContext';
import { useGetGoalDetail } from '@/hooks/useGetGoalDetail';
import { useGoalsFirestore } from '@/hooks/useGoalsMutation';
import { useTodayLogStatus } from '@/hooks/useTodayLogStatus';
import ContentTitle from '../Layout/ContentTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, Button, Grid, styled } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import EditHabitDetailModal from './component/EditHabitDetailModal';

const HabitDetailBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  backgroundColor: '#F2F2F3',
  borderRadius: '10px',
  padding: '20px 30px',
  position: 'relative',
  '& .unitBox': {
    color: '#bababa',
    fontSize: '11px',
    position: 'absolute',
    right: '20px',
    top: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  '& .characterContent': {
    padding: 0,
  },
  '@media (max-width: 1000px)': {
    height: '100vh',
  },
  '@media (max-width: 600px)': {
    borderRadius: 'unset',
    // paddingBottom: 0,

    margin: '0 -20px -16px',
    '& .unitBox': {
      right: '10px',
      top: '15px',
    },
  },
});

const HabitDetailTitle = styled(Grid)({
  width: '100%',
  // height: '6vh',
  display: 'flex',
  flexDirection: 'column',
});

const EditBtn = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  fontFamily: 'fontGalmuri',
  fontSize: '12px',
  color: 'rgb(121 121 121 / 68%)',
  padding: '3px 10px',
  '& selected': {
    color: '',
  },
  '&.updateBtn': {
    '& svg': {
      width: '20px',
    },
  },
  '&.deleteBtn': {
    '& svg': {
      width: '15px',
    },
  },
  '& svg': {
    height: 'auto',
    verticalAlign: 'middle',
    marginRight: '2px',
  },
  '@media (min-width: 601px)': {
    fontSize: '14px',
    display: 'flex',
    '&.updateBtn': {
      '& svg': {
        width: '24px',
      },
    },
    '&.deleteBtn': {
      '& svg': {
        width: '19px',
      },
    },
  },
});

const HabitContainBox = styled(Grid)({
  width: '100%',
  flexGrow: 1,
  display: 'flex',
  gap: 10,
});
const CharacterGrid = styled(Grid)({
  width: '100%',
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // padding: "25px 0 30px",
});
const CharBox = styled(Box)({
  width: '60%',
  aspectRatio: '1/1.14',
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '450px',
  minWidth: '200px',
  '@media (max-width: 600px)': { maxWidth: '230px' },
  '@media (max-width: 1279px)': { maxWidth: '400px' },
});
const HabitContSecGrid = styled(Grid)({
  width: '100%',
  gap: 10,
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
});

const HabitDescBox = styled(Box)({
  width: '100%',
  backgroundColor: '#ffffff60',
  flexGrow: 1,
  borderRadius: '10px',
  padding: '20px',
  minHeight: '90px',
  '@media (max-width: 600px)': {
    maxHeight: 'calc(100vh - 550px)',
    overflowY: 'auto',
  },
});

const InformHeadBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  color: 'rgba(17, 17, 17, 0.68)',
  marginTop: '3px',
  fontWeight: 500,
  fontSize: '12px',
});

const HabitDoneBtn = styled(Button)({
  width: '100%',
  borderRadius: '20px',
});

const HabitDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { userId } = useAuthContext();


  const { deleteGoal } = useGoalsFirestore();
  const { data, isLoading } = useGetGoalDetail(userId, id);
  const { isChecked, checkLog, uncheckLog, isUpdatingLog } = useTodayLogStatus(id);
  // 모달
  const [openEditModal, setOpenEditModal] = useState(false);

  if (!id) {
    return <div>오류: 파라미터값이 발견되지 않았습니다.</div>;
  }
  if (!userId) {
    return <div>로그인이 필요합니다.</div>;
  }
  if (!data) {
    return <CharacterGrid>⚠️오류: 존재하지않는 습관입니다.</CharacterGrid>;
  }
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // console.log('data', data)

  const now = new Date();

  // 삭제 핸들러
  const handleDeleteGoal = async () => {
    if (!data.id) {
      alert('삭제할 목표 ID를 찾을 수 없습니다.');
      return;
    }
    if (window.confirm(`정말로 "${data.title}" 습관을 삭제하시겠습니까?`)) {
      try {
        await deleteGoal.mutateAsync(data.id);
        alert('습관이 성공적으로 삭제되었습니다.');
        router.push('/habit');
      }  catch (err: unknown) { // ✨ any 대신 unknown 사용 ✨
        let errorMessage = '습관 삭제 실패: 알 수 없는 오류가 발생했습니다.';
        if (err instanceof Error) { // ✨ Error 인스턴스인지 확인
          errorMessage = `습관 삭제 실패: ${err.message}`;
        }
        alert(errorMessage);
      }
    }
  };

  // 수정 모달 열기/닫기 핸들러
  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  // 수정 버튼 조건
  const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
  const isEditable = Math.abs(data.startDate.getTime() - now.getTime()) < ONE_DAY_IN_MS;
  return (
    <>
      <ContentTitle>
        <BeforeBtn handleClick={() => router.push('/habit')} />
      </ContentTitle>
      <HabitDetailBox>
        <HabitDetailTitle>
          <>
            <h2>{data?.title}</h2>
            <InformHeadBox>
              목표기간 : {data?.startDate.toLocaleDateString()}~{data?.endDate.toLocaleDateString()}
            </InformHeadBox>
          </>

          {data.status === 'failed' ? (
            ''
          ) : (
            <Box sx={{ marginLeft: 'auto' }} className="unitBox">
              {!isEditable ? (
                ''
              ) : (
                <>
                  <EditBtn onClick={handleOpenEditModal} className="updateBtn">
                    <EditNoteIcon />
                    수정
                  </EditBtn>
                  |
                </>
              )}
              <EditBtn onClick={handleDeleteGoal} className="deleteBtn">
                <DeleteIcon />
                삭제
              </EditBtn>
            </Box>
          )}
        </HabitDetailTitle>

        <HabitContainBox container spacing={2}>
          <CharacterGrid size={{ xs: 12, sm: 6 }}>
            <CharBox>
              <CharacterBox
                successCount={data.successCount}
                failCount={data.failCount}
                totalDays={data.totalDays}
                characterId={data.characterId}
                characterStatus={data.characterStatus}
              />
            </CharBox>
          </CharacterGrid>

          <HabitContSecGrid size={{ xs: 12, sm: 6 }}>
            {/* <InformHeadBox>
              목표기간 : {data?.startDate.toLocaleDateString()}~
              {data?.endDate.toLocaleDateString()}
            </InformHeadBox> */}
            <HabitDescBox>
              <p>{data?.description}</p>
            </HabitDescBox>
            {/* 완료 버튼 */}

            <HabitDoneBtn
              variant="contained"
              onClick={isChecked ? uncheckLog : checkLog}
              color={isChecked ? 'primary' : 'secondary'}
            >
              {isUpdatingLog
                ? '처리 중...'
                : isChecked
                  ? `오늘의 (${data.title.slice(0, 10)}) 취소하기`
                  : `오늘의 (${data.title.slice(0, 10)}) 완료하기`}
            </HabitDoneBtn>
          </HabitContSecGrid>
        </HabitContainBox>
      </HabitDetailBox>

      {/* 수정 폼 모달 */}
      {data && (
        <EditHabitDetailModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          goal={data} // 현재 목표 데이터를 prop으로 전달
        />
      )}
    </>
  );
};

export default HabitDetailPage;
