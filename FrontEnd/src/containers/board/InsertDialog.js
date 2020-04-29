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
import axios from 'axios';
import moment from 'moment';

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
    try {
      axios.post('http://13.124.235.236:8000/boards/', {
        title: form.title,
        startdate: moment(form.startDate).format('YYYY-MM-DD'),
        enddate: moment(form.endDate).format('YYYY-MM-DD'),
        description: form.description,
      });
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
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
