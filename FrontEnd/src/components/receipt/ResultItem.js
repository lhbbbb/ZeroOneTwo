import React from 'react';
import { Typography, TextField, Grid } from '@material-ui/core';

const ResultItem = (props) => {
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      <TextField
        id="itemName"
        value={props.item.item}
        onChange={(e) => {
          props.onItemChange(e, props.item.item_id);
        }}
      />
      <TextField
        id="itemPrice"
        value={props.item.price}
        onChange={(e) => {
          props.onPriceChange(e, props.item.item_id);
        }}
      />
      <Typography
        onClick={() => {
          props.onItemRemove(props.item.item_id);
        }}
      >
        삭제
      </Typography>
    </Grid>
  );
};

export default ResultItem;
