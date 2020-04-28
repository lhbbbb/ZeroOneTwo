import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import { changeField, initializeForm } from '../../modules/board';
import InsertForm from '../../components/board/InsertForm';

const InsertDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { form } = useSelector(({ board }) => ({ form: board.insert }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'insert',
        key: name,
        value,
      }),
    );
  };
  const onChagneStartDate = (date) => {
    dispatch(
      changeField({
        form: 'insert',
        key: 'startDate',
        value: date,
      }),
    );
  };
  const onChagneEndDate = (date) => {
    dispatch(
      changeField({
        form: 'insert',
        key: 'endDate',
        value: date,
      }),
    );
  };
  const handleBoardInsert = (e) => {
    e.preventDefault();
  };
  const handleClose = (e) => {
    e.preventDefault();
    dispatch(initializeForm('insert'));
    onClose();
  };

  useEffect(() => {
    dispatch(initializeForm('insert'));
  }, [dispatch]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>보드 추가</DialogTitle>
      <DialogContent>
        <InsertForm
          form={form}
          onChange={onChange}
          setStartDate={onChagneStartDate}
          setEndDate={onChagneEndDate}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
        <Button onClick={handleBoardInsert} color="primary">
          생성
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InsertDialog;
