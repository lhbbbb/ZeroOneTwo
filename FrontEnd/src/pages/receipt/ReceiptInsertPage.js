import React, { useState } from 'react';
import styled from 'styled-components';
import MainLayout from '../../layouts/MainLayout';
import {
  Grid,
  Typography,
  TextField,
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

const InsertWrapper = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
`;
const PreviewCard = styled(Card)`
  width: inherit;
  margin: 0.5rem;
`;
const PreviewCardMedia = styled(CardMedia)`
  width: inherit;
  height: 20vh;
`;
const TitleCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem !important;
`;
const ReceiptInsertPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [imageFiles, setImageFiles] = useState([]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleImageInsert = (e) => {
    let tempArr = [];
    for (let file of e.target.files) {
      console.log(file);
      tempArr.push({
        file: file,
        previewUrl: URL.createObjectURL(file),
      });
    }
    setImageFiles([...imageFiles, ...tempArr]);
  };
  const handleImageDelete = (url) => {
    setImageFiles(imageFiles.filter((file) => file.previewUrl !== url));
  };
  const handlePost = () => {
    // const formData = new FormData();
    // for(let file of imageFiles){
    //   formData.append('file', file.file);
    // }
    // return axios.post("/api/upload", formData).then(res => {
    //   alert('성공')
    // }).catch(err => {
    //   alert('실패')
    // })
  };

  return (
    <MainLayout title="영수증 추가">
      <InsertWrapper>
        <Grid container>
          <Grid container item xs={3}>
            <Typography variant="h6">날짜:</Typography>
          </Grid>
          <Grid container item xs={9}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                format="YYYY.MM.DD"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid container item xs={3}>
            <Typography variant="h6">이미지</Typography>
          </Grid>
          <Grid container item xs={9}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleImageInsert}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                이미지 추가
              </Button>
            </label>
          </Grid>
          <Grid container>
            {imageFiles.length !== 0 &&
              imageFiles.map((item, idx) => (
                <Grid container item xs={3} key={idx}>
                  <PreviewCard>
                    <PreviewCardMedia image={item.previewUrl} />
                    <TitleCardContent>
                      <Typography variant="body2" noWrap={true}>
                        {item.file.name}
                      </Typography>
                      <IconButton
                        aria-label="previewImageClear"
                        onClick={() => handleImageDelete(item.previewUrl)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </TitleCardContent>
                  </PreviewCard>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Button fullWidth variant="contained" color="primary">
          전송
        </Button>
      </InsertWrapper>
    </MainLayout>
  );
};

export default ReceiptInsertPage;
