import React from 'react';
import cn from 'classnames';

interface Props {
  cellIndex: number,
  isHovered: boolean,
  onHover: (index: number) => void,
}

export const FieldCell : React.FC<Props> = ({ cellIndex, onHover, isHovered }) => {
  return (
    <div
      className={cn(
        'field-cell',
        { 'field-cell--hovered': isHovered },
      )}
      onMouseEnter={() => {
        onHover(cellIndex);
      }}
    >
    </div>
  );
};
