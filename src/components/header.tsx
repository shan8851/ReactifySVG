import React from 'react';
import { api } from '~/utils/api';

export const Header = () => {
  const { data: count } = api.svg.getCount.useQuery();
  return (
    <div className="flex gap-6 items-center justify-between h-[90px] px-6">
      <p className="text-6xl font-bold text-white">ReactifySVG</p>
      {count && <p className="text-lg underline">{`${count?.transformationCount.toLocaleString()} SVGs transformed!`}</p>}
    </div>
  );
}
