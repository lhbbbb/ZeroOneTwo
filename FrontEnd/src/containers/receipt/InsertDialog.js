import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ReceiptInsertForm from '../../components/receipt/receiptInsertForm';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const InsertDialog = ({ open, onClose, boardId }) => {
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(null);
  const [language, setLanguage] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
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
    formData.append('image', image);
    formData.append('date', moment(date).format('YYYY-MM-DDT') + '12:00:00');
    formData.append('country', language);
    formData.append('board', Number(boardId));

    try {
      axios
        .post('http://13.124.235.236:8000/receipts/', formData)
        .then((res) => {
          if (res.data.result) {
            setErrorMessage(res.data.result);
          } else {
            history.push({
              pathname: '/result',
              state: {
                data: JSON.stringify(res),
                date: moment(date).format('YYYY-MM-DD'),
                image: URL.createObjectURL(image),
                boardId: boardId,
              },
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>영수증 추가</DialogTitle>
      <DialogContent>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
