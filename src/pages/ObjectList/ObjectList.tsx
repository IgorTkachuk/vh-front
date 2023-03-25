import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useGetObjectsByPNQuery } from '../../api/objectAPI/objectApi';

const ObjectList: FC<{ pn: string }> = ({ pn }) => {
  const { data, isLoading } = useGetObjectsByPNQuery(pn);

  if (isLoading) return <div>Loading ...</div>;

  if (data === null || data === undefined)
    return <span>No data fetching!</span>;

  return (
    <>
      <Link to="/component">To component</Link>

      <ul>
        {data.map((obj) => (
          <li key={obj.id}>
            <ul>
              {(Object.keys(obj) as Array<keyof typeof obj>).map((k) => (
                <li key={k}>
                  {k}:{obj[k]}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ObjectList;
