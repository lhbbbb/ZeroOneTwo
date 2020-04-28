import React from 'react';
import styled from 'styled-components';
import { TextField, Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import typography from '../../theme/typography';

const LineGrid = styled(Grid)`
  & + & {
    margin-top: 1rem;
  }
`;
const LabelGrid = styled(Grid)`
  padding-right: 1rem;
`;

const InsertForm = ({ form, onChange, setStartDate, setEndDate }) => {
  return (
    <Grid container>
      <LineGrid container>
        <LabelGrid item container xs={3} alignItems="center" justify="flex-end">
          <typography variant="h6">보드 제목</typography>
        </LabelGrid>
        <Grid item xs={9}>
          <TextField
            placeholder="보드 제목"
            fullWidth
            name="title"
            value={form.title}
            onChange={onChange}
          ></TextField>
        </Grid>
      </LineGrid>
      <LineGrid container>
        <LabelGrid item container xs={3} justify="flex-end">
          <typography variant="h6">보드 내용</typography>
        </LabelGrid>
        <Grid item xs={9}>
          <TextField
            name="description"
            placeholder="보드 설명"
            variant="outlined"
            multiline
            fullWidth
            rows={2}
            value={form.description}
            onChange={onChange}
          ></TextField>
        </Grid>
      </LineGrid>
      <LineGrid container>
        <LabelGrid item container xs={3} alignItems="center" justify="flex-end">
          <typography variant="h6">보드 날짜</typography>
        </LabelGrid>
        <Grid item xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="startDate"
              format="YYYY.MM.DD"
              value={form.startDate}
              onChange={setStartDate}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid container item xs={1} alignItems="center" justify="center">
          ~
        </Grid>
        <Grid item xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="endDate"
              format="YYYY.MM.DD"
              value={form.endDate}
              onChange={setEndDate}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </LineGrid>
    </Grid>
  );
};

export default InsertForm;
