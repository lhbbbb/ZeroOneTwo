import React from 'react';
import styled from 'styled-components';
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  CardMedia,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import DateFnsUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const PreviewCard = styled(Card)`
  width: inherit;
  margin: 0.5rem;
`;
const PreviewCardMedia = styled(CardMedia)`
  width: inherit;
  height: 30vh;
`;
const TitleCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem !important;
`;
const LabelGrid = styled(Grid)`
  padding-right: 1rem;
`;
const LineGrid = styled(Grid)`
  & + & {
    margin-top: 1rem;
  }
`;

const receiptInsertForm = ({
  date,
  image,
  onChangeDate,
  onChangeImage,
  onRemoveImage,
}) => {
  return (
    <Grid container>
      <LineGrid container>
        <LabelGrid container item xs={3} alignItems="center" justify="flex-end">
          <Typography variant="body2">영수증 날짜</Typography>
        </LabelGrid>
        <Grid item xs={9}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="startDate"
              format="YYYY.MM.DD"
              fullWidth
              value={date}
              onChange={onChangeDate}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </LineGrid>
      <LineGrid container>
        <LabelGrid container item xs={3} alignItems="center" justify="flex-end">
          <Typography variant="body2">이미지</Typography>
        </LabelGrid>
        <Grid item xs={9}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            type="file"
            onChange={onChangeImage}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              이미지 추가
            </Button>
          </label>
        </Grid>
      </LineGrid>
      <LineGrid container>
        <Grid item xs={12}>
          {image !== null && (
            <PreviewCard>
              <PreviewCardMedia image={URL.createObjectURL(image)} />
              <TitleCardContent>
                <Typography variant="body2" noWrap={true}>
                  {image.name}
                </Typography>
                <IconButton
                  aria-label="previewImageClear"
                  onClick={onRemoveImage}
                >
                  <ClearIcon />
                </IconButton>
              </TitleCardContent>
            </PreviewCard>
          )}
        </Grid>
      </LineGrid>
    </Grid>
  );
};

export default receiptInsertForm;
