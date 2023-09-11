/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import './App.scss';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { getFieldModes } from './api/fields';
import { FieldMode } from './types/FieldMode';
import { FieldCell } from './components/FieldCell';
import { HoverCard } from './components/HoverCard';

export const App: React.FC = () => {
  const [fieldsModes, setFieldModes] = useState<FieldMode[]>([]);
  const [selectedFieldMode, setSelectedFieldMode] = useState<FieldMode | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [hoveredPositions, setHoveredPositions] = useState<number[]>([]);

  const loadFieldMods = async () => {
    const fieldModsFromServer = await getFieldModes<FieldMode[]>();

    setFieldModes(fieldModsFromServer);
  };

  useEffect(() => {
    loadFieldMods();
  }, []);

  const onSelectedModeChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    const fieldMode = fieldsModes.find(mode => (mode.name === value));

    if (!fieldMode) {
      return;
    }

    setSelectedFieldMode(fieldMode);
    console.log(selectedFieldMode?.name);
    setIsStarted(false);
    setHoveredPositions([]);
  };

  const onStart = () => {
    setIsStarted(true);
  };

  const onCellHover = (cellIndex: number) => {
    let newPositions = [...hoveredPositions];

    if (newPositions.includes(cellIndex)) {
      newPositions = newPositions.filter(pos => pos !== cellIndex);
    } else {
      newPositions.push(cellIndex);
    }

    setHoveredPositions([...newPositions]);
  };

  return (
    <div className="hover-squares-app">
      <div className="field">
        <div className="field__control-form">
          <FormControl sx={{ minWidth: '240px' }}>
            <InputLabel id="select-label">
              Pick mode
            </InputLabel>

            <Select
              labelId="select-label"
              label="Pick mode"
              value={selectedFieldMode ? selectedFieldMode.name : ''}
              onChange={onSelectedModeChange}
            >
              {fieldsModes.length > 0
                && fieldsModes.map(fieldMode => {
                  const { id, name } = fieldMode;

                  return (
                    <MenuItem key={id} value={name}>
                      {name}
                    </MenuItem>
                  );
                })}

            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={onStart}
          >
            Start
          </Button>
        </div>

        <div className="field__board">
          {(selectedFieldMode && isStarted)
          && (new Array(selectedFieldMode?.field).fill(null).map((_, i) => {
            const isHovered = hoveredPositions.includes(i);

            return (
              <FieldCell
                key={uuidv4()}
                cellIndex={i}
                onHover={onCellHover}
                isHovered={isHovered}
              />
            );
          }))}
        </div>
      </div>

      <div className="hover-info">
        <h2 className="hover-info__title">
          Hover squares
        </h2>

        <div className="hover-info__cards">
          {hoveredPositions.length > 0 && (
            hoveredPositions.map((hoverPosition) => (
              <HoverCard
                key={uuidv4()}
                position={hoverPosition}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
