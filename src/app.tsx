import { useSearchPostsQuery } from 'hooks';
import React from 'react';

function App() {
  const { data } = useSearchPostsQuery();
  console.log(data);

  return (
    <main>
      <div>Posts</div>
      <div>Search</div>
      <div>Table</div>
    </main>
  );
}

export default App;
