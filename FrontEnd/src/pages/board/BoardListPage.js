import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import InsertDialog from '../../containers/board/InsertDialog';
import BoardLayout from '../../layouts/BoardLayout';
import {
  Typography,
  Grid,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Avatar,
} from '@material-ui/core';

const ButtonGrid = styled(Grid)`
  margin-bottom: 1rem !important;
`;

const StyledCard = styled(Card)`
  width: 100%;
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.8rem !important;
  button {
    padding: 0.5rem;
    flex-grow: 1;
  }
  & + & {
    margin-top: 1rem;
  }
`;
const AvatarBlock = styled.div`
  margin: 0.7rem 1rem;
  display: flex;
  align-items: flex-end;
  div + div {
    margin-left: 0.5rem;
  }
  overflow-x: auto;
`;

const InnerTypo = styled(Typography)`
  min-width: fit-content;
  padding-left: 0.5rem;
`;

const TempData = [
  {
    boardId: 1,
    title: '부산여행 정산',
    description:
      'Consequat mauris nunc congue nisi vitae suscipit. Fringilla estullamcorper eget nulla facilisi etiam dignissim di. Consequat mauris nunc congue nisi vitae suscipit. Fringilla estullamcorper eget nulla facilisi etiam dignissim di.',
    startDate: '2020.01.01',
    endDate: '2020.01.10',
    writer: '장영준',
    participants: [
      { username: '하지수', url: require('../../assets/testImage/하지수.png') },
      { username: '아이린', url: require('../../assets/testImage/아이린.png') },
    ],
  },
  {
    boardId: 2,
    title: '샌프란시스코 정산',
    description:
      'Consequat mauris nunc congue nisi vitae suscipit. Fringilla estullamcorper eget nulla facilisi etiam dignissim di. Consequat mauris nunc congue nisi vitae suscipit. Fringilla estullamcorper eget nulla facilisi etiam dignissim di.',
    startDate: '2020.01.01',
    endDate: '2020.01.10',
    writer: '장영준',
    participants: [
      { username: '하지수', url: require('../../assets/testImage/하지수.png') },
      { username: '아이린', url: require('../../assets/testImage/아이린.png') },
    ],
  },
  {
    boardId: 3,
    title: '개발개발개발',
    description:
      'Consequat mauris nunc congue nisi vitae suscipit. Fringilla estullamcorper eget nulla facilisi etiam dignissim di. Consequat mauris nunc congue nisi vitae suscipit. Fringilla estullamcorper eget nulla facilisi etiam dignissim di.',
    startDate: '2020.01.01',
    endDate: '2020.01.10',
    writer: '장영준',
    participants: [
      { username: '하지수', url: require('../../assets/testImage/하지수.png') },
      { username: '아이린', url: require('../../assets/testImage/아이린.png') },
    ],
  },
];

const BoardPage = () => {
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleBoardClick = (id) => {
    history.push(`/board/${id}`);
  };
  return (
    <>
      <BoardLayout title="클립보드">
        <Grid container>
          <ButtonGrid container justify="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleDialogOpen}
              disableElevation
            >
              보드 추가하기
            </Button>
          </ButtonGrid>
          <Grid container>
            {TempData.map((data) => (
              <StyledCard key={data.boardId}>
                <CardActionArea onClick={() => handleBoardClick(data.boardId)}>
                  <CardContent>
                    <Typography variant="h5">{data.title}</Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      style={{ padding: '0.5rem 0' }}
                    >
                      {data.description}
                    </Typography>
                    <Typography variant="body2" align="left">
                      작성자: {data.writer}
                    </Typography>
                    <Typography variant="body2" align="left">
                      진행일자: {data.startDate} ~ {data.endDate}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Divider variant="middle"></Divider>
                <AvatarBlock>
                  {data.participants.map((participant) => (
                    <Avatar
                      key={participant.username}
                      alt={participant.username}
                      src={participant.url}
                    />
                  ))}
                  <InnerTypo variant="body2" align="center" display="block">
                    님과 함께 공유중입니다.
                  </InnerTypo>
                </AvatarBlock>
              </StyledCard>
            ))}
          </Grid>
        </Grid>
      </BoardLayout>
      <InsertDialog open={dialogOpen} onClose={handleDialogClose} />
    </>
  );
};

export default BoardPage;
