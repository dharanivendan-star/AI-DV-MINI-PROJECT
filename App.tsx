
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SudokuGrid from './components/SudokuGrid';
import Controls from './components/Controls';
import { generateFullBoard, removeCells, solve, valid, getHint } from './services/sudokuService';
import type { Board, Difficulty } from './types';
import { produce } from 'immer';

const App: React.FC = () => {
    const [board, setBoard] = useState<Board>(Array(9).fill(Array(9).fill(0)));
    const [initialBoard, setInitialBoard] = useState<Board>(Array(9).fill(Array(9).fill(0)));
    const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
    const [isAiMode, setIsAiMode] = useState<boolean>(false);

    const generateNewPuzzle = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            const fullBoard = generateFullBoard();
            const puzzle = removeCells(fullBoard, difficulty);
            setInitialBoard(puzzle);
            setBoard(puzzle);
            setSelectedCell(null);
            setIsAiMode(false); // Reset to manual mode on new puzzle
            setIsLoading(false);
        }, 50); // Timeout to allow UI update
    }, [difficulty]);

    useEffect(() => {
        generateNewPuzzle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGenerate = () => {
        generateNewPuzzle();
    };

    const handleSolve = () => {
        const boardToSolve = JSON.parse(JSON.stringify(initialBoard));
        if (solve(boardToSolve)) {
            setBoard(boardToSolve);
            setSelectedCell(null);
        } else {
            // In a real app, you might show an alert to the user.
            console.warn("Could not solve the puzzle.");
        }
    };
    
    const handleClear = () => {
        setBoard(initialBoard);
        setSelectedCell(null);
    };

    const handleAiStep = () => {
        setIsLoading(true);
        // Use a timeout to allow the loader to show
        setTimeout(() => {
            const hint = getHint(board);
            if (hint) {
                const { row, col, value } = hint;
                const newBoard = produce(board, draft => {
                    draft[row][col] = value;
                });
                setBoard(newBoard);
                setSelectedCell({ row, col });
            } else {
                alert("The puzzle is complete or no further moves are possible!");
            }
            setIsLoading(false);
        }, 20); 
    };

    const handleCellChange = (row: number, col: number, value: number) => {
        if (isAiMode) return; // Prevent manual changes in AI mode

        const newBoard = produce(board, draft => {
            const oldValue = draft[row][col];
            if (value === oldValue) return; // No change

            // Phase 1: Clean up. 
            // Clear all non-initial numbers that are either the old value (if one existed)
            // or the new value. This prepares the board for a fresh autofill.
            for (let r = 0; r < 9; r++) {
                for (let c = 0; c < 9; c++) {
                    if (initialBoard[r][c] === 0) { // Only clear user-editable cells
                        const cellValue = draft[r][c];
                        if ((oldValue !== 0 && cellValue === oldValue) || (value !== 0 && cellValue === value)) {
                            draft[r][c] = 0;
                        }
                    }
                }
            }

            // Phase 2: Apply the user's direct change.
            draft[row][col] = value;

            // Phase 3: Autofill the new number, if the user entered one (not deleted).
            if (value !== 0) {
                for (let r = 0; r < 9; r++) {
                    for (let c = 0; c < 9; c++) {
                        // Check if the cell is empty and user-editable
                        if (draft[r][c] === 0 && initialBoard[r][c] === 0) {
                            // Check if it's valid to place the new number here
                            if (valid(draft, value, [r, c])) {
                                draft[r][c] = value;
                            }
                        }
                    }
                }
            }
        });
        setBoard(newBoard);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans text-slate-800 dark:text-slate-200">
            <div className="w-full max-w-md mx-auto">
                <Header />
                <main>
                    <Controls
                        difficulty={difficulty}
                        onDifficultyChange={setDifficulty}
                        onGenerate={handleGenerate}
                        onSolve={handleSolve}
                        onClear={handleClear}
                        isLoading={isLoading}
                        isAiMode={isAiMode}
                        onAiModeChange={setIsAiMode}
                        onAiStep={handleAiStep}
                    />
                    <SudokuGrid
                        board={board}
                        initialBoard={initialBoard}
                        onCellChange={handleCellChange}
                        selectedCell={selectedCell}
                        onSelectCell={setSelectedCell}
                        isLoading={isLoading}
                        isAiMode={isAiMode}
                    />
                </main>
            </div>
        </div>
    );
};

export default App;
