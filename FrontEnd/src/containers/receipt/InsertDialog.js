import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import ReceiptInsertForm from '../../components/receipt/receiptInsertForm';

const InsertDialog = ({ open, onClose }) => {
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(null);
  const onChangeDate = (date) => {
    setDate(date);
  };

  const onChangeImage = (e) => {
    let image = e.target.files[0];
    setImage(image);
  };
  const onRemoveImage = () => {
    setImage(null);
  };

  const handleReceiptInsert = (e) => {
    e.preventDefault();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>영수증 추가</DialogTitle>
      <DialogContent>
        <ReceiptInsertForm
          image={image}
          date={date}
          onChangeDate={onChangeDate}
          onChangeImage={onChangeImage}
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
