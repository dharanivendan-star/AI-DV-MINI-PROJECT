
import React from 'react';
import type { SudokuCellProps } from '../types';

const SudokuCell: React.FC<SudokuCellProps> = ({
    value,
    row,
    col,
    isInitial,
    isSelected,
    isPeer,
    isSameValue,
    isIncorrect,
    onSelect,
    onChange
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (/^[1-9]$/.test(val) || val === '') {
            onChange(val === '' ? 0 : parseInt(val, 10));
        }
    };

    const baseClasses = "flex items-center justify-center w-full h-full text-2xl font-medium text-center focus:outline-none transition-colors duration-150";

    const borderClasses = `
        ${row % 3 === 2 && row !== 8 ? 'border-b-2' : 'border-b'}
        ${col % 3 === 2 && col !== 8 ? 'border-r-2' : 'border-r'}
        border-slate-300 dark:border-slate-600
        border-collapse
    `;
    
    let colorClasses = '';
    if (isInitial) {
        colorClasses = 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold';
    } else {
        colorClasses = 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 cursor-pointer';
    }
    
    if (isSelected) {
        colorClasses = 'bg-indigo-200 dark:bg-indigo-900';
    } else if(isPeer) {
        colorClasses = isInitial ? 'bg-slate-200 dark:bg-slate-600' : 'bg-slate-100 dark:bg-slate-700/50';
    }

    if(isSameValue && !isSelected) {
        colorClasses = 'bg-sky-100 dark:bg-sky-900';
    }

    if (isIncorrect) {
        colorClasses += ' !bg-red-200 dark:!bg-red-800 !text-red-700 dark:!text-red-200';
    }

    return (
        <div
            className={`aspect-square ${borderClasses}`}
            onClick={!isInitial ? onSelect : undefined}
        >
            <input
                type="text"
                pattern="[1-9]"
                maxLength={1}
                value={value === 0 ? '' : value}
                onChange={handleChange}
                onFocus={!isInitial ? onSelect : undefined}
                readOnly={isInitial}
                className={`${baseClasses} ${colorClasses}`}
                aria-label={`Sudoku cell at row ${row + 1}, column ${col + 1}`}
            />
        </div>
    );
};

export default SudokuCell;
