import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, TextField, Grid, Button, Paper } from '@material-ui/core';

import ResultItem from './ResultItem';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ResultPaper = styled(Paper)`
  width: 30rem;
  height: auto;
  padding: 1rem;
  flex-grow: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const LabelGrid = styled(Grid)`
  padding-right: 2rem;
`;
const InputGrid = styled(Grid)`
  padding-left: 2rem;
  padding-right: 2rem;
`;
const ItemBlock = styled.div`
  border: 1px solid gray;
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  .item-grid + .item-grid {
    margin-top: 0.5rem;
  }
`;

const Result = (props) => {
  const history = useHistory();
  const [resultStoreName, setResultStoreName] = useState('');
  const [resultDate, setResultDate] = useState('');
  const [resultItems, setResultItems] = useState([]);
  const [resultTotal, setResultTotal] = useState(0);

  useEffect(() => {
    setResultStoreName(props.title);
    setResultDate(props.date);
    setResultItems(props.itemList);
    setResultTotal(props.total);
    console.log(props.itemList);
  }, [props]);

  const nextId = useRef(
    Math.max.apply(
      null,
      resultItems.map((i) => i.item_id),
    ) + 1,
  );

  const onItemChange = (e, id) => {
    setResultItems(
      resultItems.map((i) =>
        i.item_id === id ? { ...i, item: e.target.value } : i,
      ),
    );
  };
  const onItemTranslatedChange = (e, id) => {
    setResultItems(
      resultItems.map((i) =>
        i.item_id === id ? { ...i, item_translated: e.target.value } : i,
      ),
    );
  };

  const onPriceChange = (e, id) => {
    setResultItems(
      resultItems.map((i) =>
        i.item_id === id ? { ...i, price: e.target.value } : i,
      ),
    );
  };

  const onItemRemove = (id) => {
    setResultItems(resultItems.filter((i) => i.item_id !== id));
  };

  const onItemCreate = () => {
    const tempItem = {
      item_id: nextId.current,
      item: '',
      item_translated: '',
      price: 0,
    };
    setResultItems([...resultItems, tempItem]);
    nextId.current += 1;
  };
  const handlePost = () => {
    let postSet = {
      board_id: props.boardId,
      title: resultStoreName,
      date: resultDate,
      items: resultItems,
      total: resultTotal,
      image: props.imageUrl,
      receipt_id: props.receiptId,
      country: props.country,
    };
    axios
      .post('http://i02a408.p.ssafy.io:8000/receipts/new/', postSet)
      .then(() => {
        history.push(`/board/${props.boardId}`);
      });
  };

  return (
    <ResultPaper>
      <Grid container direction="column" alignItems="center">
        <Grid container justify="flex-end">
          <Button variant="contained" color="secondary" onClick={onItemCreate}>
            항목 추가
          </Button>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <LabelGrid container item xs={4} justify="flex-end">
            <Typography>상호명 :</Typography>
          </LabelGrid>
          <InputGrid item xs={8}>
            <TextField
              id="resultStoreName"
              value={resultStoreName}
              fullWidth
              onChange={(e) => {
                setResultStoreName(e.target.value);
              }}
            />
          </InputGrid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <LabelGrid container item xs={4} justify="flex-end">
            <Typography>날짜 :</Typography>
          </LabelGrid>
          <InputGrid item xs={8}>
            <TextField
              id="resultDate"
              value={resultDate}
              fullWidth
              onChange={(e) => {
                setResultDate(e.target.value);
              }}
            />
          </InputGrid>
        </Grid>

        <ItemBlock>
          <Grid container direction="row">
            <Grid container item xs={4} justify="center">
              <Typography>원품목명</Typography>
            </Grid>
            <Grid container item xs={4} justify="center">
              <Typography>번역품목명</Typography>
            </Grid>
            <Grid container item xs={3} justify="center">
              <Typography>가격</Typography>
            </Grid>
            <Grid item xs={1} />
          </Grid>
          {resultItems.map((item) => (
            <ResultItem
              key={item.item_id}
              item={item}
              onItemChange={onItemChange}
              onItemTranslatedChange={onItemTranslatedChange}
              onPriceChange={onPriceChange}
              onItemRemove={onItemRemove}
            />
          ))}
        </ItemBlock>

        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ marginBottom: '1rem' }}
        >
          <LabelGrid container item xs={4} justify="flex-end">
            <Typography>총 금액 : </Typography>
          </LabelGrid>
          <InputGrid item xs={8}>
            <TextField
              type="number"
              id="resultTotal"
              value={resultTotal}
              fullWidth
              onChange={(e) => {
                setResultTotal(e.target.value);
              }}
            />
          </InputGrid>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handlePost}
      >
        결과 입력하기
      </Button>
    </ResultPaper>
  );
};

export default Result;
