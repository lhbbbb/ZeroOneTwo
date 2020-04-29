import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import ReceiptInsertForm from '../../components/receipt/receiptInsertForm';
import axios from 'axios';
import moment from 'moment';

const InsertDialog = ({ open, onClose, boardId }) => {
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(null);
  const [language, setLanguage] = useState('');
  const onChangeDate = (date) => {
    setDate(date);
  };
  const onChangeImage = (e) => {
    let image = e.target.files[0];
    setImage(image);
  };
  const onChangeLanguage = (e) => {
    setLanguage(e.target.value);
  };
  const onRemoveImage = () => {
    setImage(null);
  };

  const handleReceiptInsert = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', image);
    console.log(formData);
    let postData = {
      date: moment(date).format('YYYY-MM-DDT') + '12:00:00',
      country: language,
      image: formData,
      board: Number(boardId),
    };
    console.log(postData);
    try {
      axios.post('http://13.124.235.236:8000/api/Receipts/', postData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>영수증 추가</DialogTitle>
      <DialogContent>
        <ReceiptInsertForm
          image={image}
          date={date}
          language={language}
          onChangeDate={onChangeDate}
          onChangeImage={onChangeImage}
          onChangeLanguage={onChangeLanguage}
          onRemoveImage={onRemoveImage}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          취소
        </Button>
        <Button onClick={handleReceiptInsert} color="primary">
          생성
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InsertDialog;
