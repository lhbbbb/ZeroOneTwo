import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardLayout from '../../layouts/BoardLayout';
import { useHistory } from 'react-router-dom';
import Result from '../../components/receipt/Result';
import Jang from '../../assets/장영준.jpg';

const ResultBlock = styled.div`
  display: flex;
`;
const ImageBlock = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ResponseImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const ReceiptResultPage = () => {
  const history = useHistory();
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [total, setTotal] = useState(0);
  const [boardId, setBoardId] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [receiptId, setReceiptId] = useState(0);
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (history.location.state && history.location.state.data) {
      const state = history.location.state;
      const data = JSON.parse(state.data);
      setBoardId(state.boardId);
      setDate(state.date);
      setTitle(data.data.title);
      setItemList(data.data.items);
      setTotal(Number(data.data.total));
      setReceiptId(data.data.receipt_id);
      setImageUrl(data.data.image);
      setCountry(data.data.country);
    }
  }, []);

  return (
    <BoardLayout>
      <ResultBlock>
        <ImageBlock>
          {imageUrl !== null && <ResponseImage src={imageUrl} />}
        </ImageBlock>
        <Result
          boardId={boardId}
          date={date}
          title={title}
          itemList={itemList}
          total={total}
          imageUrl={imageUrl}
          receiptId={receiptId}
          country={country}
        />
      </ResultBlock>
    </BoardLayout>
  );
};

export default ReceiptResultPage;
