import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Divider,
  Button,
  Grid,
} from '@material-ui/core';
import MainLayout from '../../layouts/MainLayout';

const TempData = {
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
  receipts: [
    {
      receiptId: 12100,
      date: '2020-01-02',
      place: '해운대밀면',
      address: '부산 어딘가',
      country: 'KOR',
      currency: '원',
      image: '',
    },
    {
      receiptId: 12101,
      date: '2020-01-04',
      place: '남구 횟집',
      address: '부산 어딘가',
      country: 'KOR',
      currency: '원',
      image: '',
    },
    {
      receiptId: 12102,
      date: '2020-01-05',
      place: '서면 개미집',
      address: '부산 어딘가',
      country: 'KOR',
      currency: '원',
      image: '',
    },
  ],
};

const BoardMainPage = () => {
  const history = useHistory();
  const [value, setValue] = useState(0);
  useEffect(() => {}, []);

  const getBetweenDates = (startDate, endDate) => {
    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');
    var dates = [currDate.clone().format('YYYY.MM.DD(dd)')];
    while (currDate.add(1, 'days').diff(lastDate) <= 0) {
      dates.push(currDate.clone().format('YYYY.MM.DD(dd)'));
    }
    return dates;
  };

  const dateArray = getBetweenDates(TempData.startDate, TempData.endDate);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };
  const handleButtonClick = () => {
    history.push(`/board/${TempData.boardId}/insert`);
  };

  return (
    <MainLayout title={'BoardMain'}>
      <Grid container justify="flex-end">
        <Button
          variant="contained"
          color="primary"
          align="right"
          onClick={handleButtonClick}
        >
          영수증 추가
        </Button>
      </Grid>

      <Typography variant="h3">{TempData.title}</Typography>
      <Typography variant="body2">
        진행날짜: {TempData.startDate}~{TempData.endDate}
      </Typography>
      <Typography variant="body2">작성자: {TempData.writer}</Typography>
      <Typography variant="body2" color="textSecondary">
        {TempData.description}
      </Typography>
      <Divider />
      <Typography variant="body1">공유하는 사람 리스트</Typography>
      <Divider />
      <Tabs
        value={value}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {dateArray.map((strDate, idx) => (
          <Tab key={idx} label={strDate} value={idx} />
        ))}
      </Tabs>
      <Box p={2}>{dateArray[value]}</Box>
    </MainLayout>
  );
};

export default BoardMainPage;
