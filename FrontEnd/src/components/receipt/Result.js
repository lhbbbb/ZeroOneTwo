import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Typography, TextField, Grid, Button, Paper } from '@material-ui/core';

import ResultItem from './ResultItem';

const ResultPaper = styled(Paper)`
  width: 30rem;
  height: auto;
`;

const Result = () => {
  const [resultStoreName, setResultStoreName] = useState('');
  const [resultDate, setResultDate] = useState('');
  const [resultItems, setResultItems] = useState([
    { item_id: 1, item: '땅콩', price: 300 },
    { item_id: 2, item: '땅콩', price: 500 },
  ]);
  const [resultTotal, setResultTotal] = useState('');

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
      price: 0,
    };
    setResultItems([...resultItems, tempItem]);
    nextId.current += 1;
  };

  return (
    <ResultPaper>
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Typography>상호명 :</Typography>
          <TextField
            id="resultStoreName"
            value={resultStoreName}
            onChange={(e) => {
              setResultStoreName(e.target.value);
            }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Typography>날짜 :</Typography>
          <TextField
            id="resultDate"
            value={resultDate}
            onChange={(e) => {
              setResultDate(e.target.value);
            }}
          />
        </Grid>
        {resultItems.map((item) => (
          <ResultItem
            key={item.item_id}
            item={item}
            onItemChange={onItemChange}
            onPriceChange={onPriceChange}
            onItemRemove={onItemRemove}
          />
        ))}
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Typography>총 금액 : </Typography>
          <TextField
            id="resultTotal"
            value={resultTotal}
            onChange={(e) => {
              setResultTotal(e.target.value);
            }}
          />
        </Grid>
        <Typography onClick={onItemCreate}>항목 추가</Typography>
      </Grid>
    </ResultPaper>
  );
};

export default Result;
