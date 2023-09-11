import React from 'react';

interface Props {
  position: number,
}

export const HoverCard: React.FC<Props> = ({ position }) => {
  const numColumns = 5;
  const row = Math.floor(position / numColumns) + 1;
  const column = (position % numColumns) + 1;

  return (
    <div className="hover-info__card">
      { `row ${row} col ${column}`}
    </div>
  );
};
