
import React from 'react';
import SudokuCell from './SudokuCell';
import type { Board } from '../types';
import { hasConflict } from '../services/sudokuService';

interface SudokuGridProps {
    board: Board;
    initialBoard: Board;
    onCellChange: (row: number, col: number, value: number) => void;
    selectedCell: { row: number, col: number } | null;
    onSelectCell: (cell: { row: number, col: number } | null) => void;
    isLoading: boolean;
    isAiMode: boolean;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ board, initialBoard, onCellChange, selectedCell, onSelectCell, isLoading, isAiMode }) => {

    const isPeer = (r1: number, c1: number, r2: number, c2: number) => {
        if (r1 === r2 && c1 === c2) return false;
        if (r1 === r2 || c1 === c2) return true;
        if (Math.floor(r1 / 3) === Math.floor(r2 / 3) && Math.floor(c1 / 3) === Math.floor(c2 / 3)) return true;
        return false;
    };

    return (
        <div className="relative">
            <div className="grid grid-cols-9 aspect-square bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border-2 border-slate-700 dark:border-slate-600">
                {board.map((row, rowIndex) =>
                    row.map((value, colIndex) => {
                        const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                        const isInitial = initialBoard[rowIndex][colIndex] !== 0;
                        const isIncorrect = !isInitial && value !== 0 && hasConflict(board, rowIndex, colIndex);

                        const selectedValue = selectedCell ? board[selectedCell.row][selectedCell.col] : 0;
                        const isSameValue = !isInitial && value !== 0 && selectedValue !== 0 && value === selectedValue;
                        const cellIsPeer = selectedCell ? isPeer(rowIndex, colIndex, selectedCell.row, selectedCell.col) : false;

                        return (
                            <SudokuCell
                                key={`${rowIndex}-${colIndex}`}
                                value={value}
                                row={rowIndex}
                                col={colIndex}
                                isInitial={isInitial}
                                isSelected={isSelected}
                                isPeer={cellIsPeer}
                                isSameValue={isSameValue}
                                isIncorrect={isIncorrect}
                                isAiMode={isAiMode}
                                onSelect={() => onSelectCell({ row: rowIndex, col: colIndex })}
                                onChange={(val) => onCellChange(rowIndex, colIndex, val)}
                            />
                        );
                    })
                )}
            </div>
            {isLoading && (
                <div className="absolute inset-0 bg-slate-500/30 dark:bg-slate-800/50 flex items-center justify-center rounded-lg backdrop-blur-sm">
                    <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default SudokuGrid;
