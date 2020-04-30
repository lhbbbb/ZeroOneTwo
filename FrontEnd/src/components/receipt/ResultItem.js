import React from 'react';
import styled from 'styled-components';
import { TextField, Grid, Button } from '@material-ui/core';

const InputGrid = styled(Grid)`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const ResultItem = (props) => {
  return (
    <Grid
      className="item-grid"
      container
      direction="row"
      justify="space-evenly"
      alignItems="center"
    >
      <InputGrid item xs={4}>
        <TextField
          id="itemName"
          value={props.item.item}
          fullWidth
          onChange={(e) => {
            props.onItemChange(e, props.item.item_id);
          }}
        />
      </InputGrid>
      <InputGrid item xs={4}>
        <TextField
          id="itemTranslateName"
          value={props.item.item_translated}
          fullWidth
          onChange={(e) => {
            props.onItemTranslatedChange(e, props.item.item_id);
          }}
        />
      </InputGrid>
      <InputGrid item xs={3}>
        <TextField
          id="itemPrice"
          type="number"
          fullWidth
          value={props.item.price}
          onChange={(e) => {
            props.onPriceChange(e, props.item.item_id);
          }}
        />
      </InputGrid>
      <Grid item xs={1}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            props.onItemRemove(props.item.item_id);
          }}
        >
          삭제
        </Button>
      </Grid>
    </Grid>
  );
};

export default ResultItem;
