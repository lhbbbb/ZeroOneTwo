import React, {useState} from 'react';
import MainLayout from '../../layouts/MainLayout';
import ReactPageScroller from 'react-page-scroller';

import Member from '../../components/main/Members';
import Zero from '../../components/main/Zero';
import One from '../../components/main/One';
import Two from '../../components/main/Two';
import Pagination from '../../modules/pagination';

const MainPage = () => {
  const [page, setPage] = useState(0)

  return (
  <MainLayout title="Main">
    <ReactPageScroller
      pageOnChange={setPage}
      customPageNumber={page}
      containerHeight='80vh'
      containerWidth='100%'
      animationTimer={500}
    >
      <Zero />
      <One />
      <Two />
      <Member />
    </ReactPageScroller>
    <Pagination dots={4} index={page} onChangeIndex={setPage}/>
  </MainLayout>
  );
};

export default MainPage;
