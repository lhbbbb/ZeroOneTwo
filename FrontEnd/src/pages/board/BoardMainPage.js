import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Divider,
  Button,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  const [tabIndex, setTabIndex] = useState(-1);
  const [boardId, setBoardId] = useState(null);
  const [boardInfo, setBoardInfo] = useState(null);
  const [dateList, setDateList] = useState([]);
  const [receiptList, setReceiptList] = useState([]);
  const [focusList, setFocusList] = useState([]);
  const [receiptData, setReceiptData] = useState(null);
  const [receiptOpen, setReceiptOpen] = useState(false);

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
    const loadData = async () => {
      await axios
        .get(`http://13.124.235.236:8000/api/Boards/${match.params.id}/`)
        .then((res) => {
          setDateList(getBetweenDates(res.data.startdate, res.data.enddate));
          setBoardInfo(res.data);
          console.log(res);
        });
      await axios
        .get(`http://13.124.235.236:8000/boards/${match.params.id}/`)
        .then((res) => {
          if (res.data && res.data.data) {
            setReceiptList(res.data.data);
          }
        });
    };
    loadData();
  }, []);

  const handleTabChange = (e, newValue) => {
    setTabIndex(newValue);

    const findDate = dateList[newValue];
    let newFocusData = [];
    for (let receipt of receiptList) {
      if (moment(receipt.date).format('YYYY.MM.DD(dd)') === findDate) {
        newFocusData.push(receipt);
      }
    }
    console.log(newFocusData);
    setFocusList(newFocusData);
  };
  const handleReceiptInsertOpen = () => {
    setReceiptDialogOpen(true);
  };
  const handleReceiptInsertClose = () => {
    setReceiptDialogOpen(false);
  };
  const handleCloseReceipt = () => {
    setReceiptOpen(false);
  };
  const handleOpenReceipt = (receipt) => {
    console.log(receipt);
    axios
      .get(`http://i02a408.p.ssafy.io:8000/receipts/${receipt.receipt_id}/`)
      .then((res) => {
        let tempData = {
          title: receipt.place,
          items: res.data.data,
        };
        setReceiptData(tempData);
        setReceiptOpen(true);
      });
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
      <Paper elevation={0} style={{ marginBottom: '1rem' }}>
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
              <Tab
                key={idx}
                label={strDate}
                value={idx}
                disabled={
                  receiptList.find(
                    (item) =>
                      moment(item.date).format('YYYY.MM.DD(dd)') === strDate,
                  ) === undefined
                    ? true
                    : false
                }
              />
            ))}
        </Tabs>
      </Paper>
      {focusList.length !== 0 &&
        focusList.map((receipt) => (
          <Card key={receipt.receipt_id}>
            <CardActionArea
              style={{ display: 'flex' }}
              onClick={() => {
                handleOpenReceipt(receipt);
              }}
            >
              <CardMedia
                image={receipt.image}
                style={{
                  height: '20vh',
                  flexGrow: '1',
                  backgroundSize: 'contain',
                }}
              ></CardMedia>
              <CardContent style={{ flexGrow: '1' }}>
                <Typography variant="h5">{receipt.place}</Typography>
                <Typography variant="body1">
                  날짜: {moment(receipt.date).format('YYYY.MM.DD(dd)')}
                </Typography>
                <Typography variant="body1">나라: {receipt.country}</Typography>
                <Typography variant="body1">
                  총 사용금액: {receipt.total}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      <ReceiptDialog
        open={receiptDialogOpen}
        onClose={handleReceiptInsertClose}
        boardId={boardId}
      />
      <Dialog onClose={handleCloseReceipt} open={receiptOpen} maxWidth="xl">
        {receiptData && (
          <>
            <DialogTitle>{receiptData.title}</DialogTitle>
            <DialogContent>
              <Grid container direction="column">
                <Grid container direction="row">
                  <Grid item xs={5}>
                    원품목
                  </Grid>
                  <Grid item xs={5}>
                    번역품목
                  </Grid>
                  <Grid item xs={2}>
                    가격
                  </Grid>
                </Grid>
                {receiptData.items.map((item) => (
                  <Grid container direction="row">
                    <Grid item xs={5}>
                      {item.origin_name}
                    </Grid>
                    <Grid item xs={5}>
                      {item.trans_name}
                    </Grid>
                    <Grid item xs={2}>
                      {item.price}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={handleCloseReceipt}
                color="primary"
                variant="outlined"
              >
                닫기
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </BoardLayout>
  );
};

export default BoardMainPage;
