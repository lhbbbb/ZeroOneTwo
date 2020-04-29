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
  Paper,
} from '@material-ui/core';
import BoardLayout from '../../layouts/BoardLayout';
import ReceiptDialog from '../../containers/receipt/InsertDialog';
import axios from 'axios';

const MidDivider = styled(Divider)`
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
`;

const BoardMainPage = ({ match }) => {
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [boardId, setBoardId] = useState(null);
  const [boardInfo, setBoardInfo] = useState(null);
  const [dateList, setDateList] = useState([]);

  const getBetweenDates = (startDate, endDate) => {
    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');
    var dates = [currDate.clone().format('YYYY.MM.DD(dd)')];
    while (currDate.add(1, 'days').diff(lastDate) <= 0) {
      dates.push(currDate.clone().format('YYYY.MM.DD(dd)'));
    }
    return dates;
  };

  useEffect(() => {
    setBoardId(match.params.id);
    const loadData = async () =>
      await axios
        .get(`http://13.124.235.236:8000/api/Boards/${match.params.id}/`)
        .then((res) => {
          setDateList(getBetweenDates(res.data.startdate, res.data.enddate));
          setBoardInfo(res.data);
        });
    loadData();
  }, []);

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
    <BoardLayout title="보드 상세보기">
      <Grid container justify="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleReceiptInsertOpen}
        >
          영수증 추가
        </Button>
      </Grid>

      <Typography variant="h3">{boardInfo ? boardInfo.title : null}</Typography>
      <Typography variant="body2">
        진행날짜: {boardInfo ? boardInfo.startdate : null}~
        {boardInfo ? boardInfo.enddate : null}
      </Typography>
      <Typography variant="body2">
        작성자: {boardInfo ? boardInfo.register : null}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {boardInfo ? boardInfo.description : null}
      </Typography>
      <MidDivider />
      <Paper elevation={0}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {dateList &&
            dateList.map((strDate, idx) => (
              <Tab key={idx} label={strDate} value={idx} />
            ))}
        </Tabs>
      </Paper>
      <Box p={2}></Box>
      <ReceiptDialog
        open={receiptDialogOpen}
        onClose={handleReceiptInsertClose}
        boardId={boardId}
      />
    </BoardLayout>
  );
};

export default BoardMainPage;
