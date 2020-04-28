import React, { useState } from 'react';
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
  const [resultItems, setResultItems] = useState([]);
  const [resultTotal, setResultTotal] = useState('');

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
        {resultItems.map((i) => (
          <ResultItem item={i.item} price={i.price} />
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
      </Grid>
    </ResultPaper>
  );
};

export default Result;
