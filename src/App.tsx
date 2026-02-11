import React, { useState } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';
import { ItemsList } from './components/ItemsList/ItemsList';
import { SelectPerPage } from './components/SelectPerPage/SelectPerPage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    perPage: '5',
  });
  const [currentPage, setCurrentPage] = useState(
    +(searchParams.get('page') as string),
  );
  const [perPage, setPerPage] = useState(5);
  const first = (currentPage - 1) * perPage + 1;
  const last = first + perPage - 1;
  const countItems = items.length;

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {first} -{' '}
        {last <= countItems ? last : countItems} of {countItems})
      </p>

      <SelectPerPage changeValue={setPerPage} resetPage={setCurrentPage} />

      <Routes>
        <Route
          path="/"
          element={
            <Pagination
              total={countItems}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={page => {
                setCurrentPage(page);
                setSearchParams({
                  page: String(page),
                  perPage: String(perPage),
                });
              }}
            />
          }
        />
      </Routes>
      <ItemsList items={items} currentPage={currentPage} perPage={perPage} />
    </div>
  );
};

export default App;
