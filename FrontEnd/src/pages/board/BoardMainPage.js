import React, { useState } from 'react';
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
import BoardLayout from '../../layouts/BoardLayout';
import ReceiptDialog from '../../containers/receipt/InsertDialog';

const TempData = {
  boardId: 1,
  title: '부산여행 정산',
  description:
    'Consequat mauris nunc congue nisi vitae suscipit. Fringilla estullamcorper eget nulla facilisi etiam dignissim di. Consequat mauris nunc congue nisi vitae suscipit. Fringilla estullamcorper eget nulla facilisi etiam dignissim di.',
  startDate: '2020.01.01',
  endDate: '2020.01.10',
  writer: '장영준',
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
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

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
    setTabIndex(newValue);
  };
  const handleReceiptInsertOpen = () => {
    setReceiptDialogOpen(true);
  };
  const handleReceiptInsertClose = () => {
    setReceiptDialogOpen(false);
  };

  return (
    <BoardLayout title={'BoardMain'}>
      <Grid container justify="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleReceiptInsertOpen}
        >
          영수중 추가
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
      <Tabs
        value={tabIndex}
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
      <Box p={2}>{dateArray[tabIndex]}</Box>
      <ReceiptDialog
        open={receiptDialogOpen}
        onClose={handleReceiptInsertClose}
      />
    </BoardLayout>
  );
};

export default BoardMainPage;
