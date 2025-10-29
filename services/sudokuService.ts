
import type { Board, Difficulty } from '../types';

const findEmpty = (board: Board): [number, number] | null => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return null;
};

export const valid = (board: Board, num: number, pos: [number, number]): boolean => {
    const [row, col] = pos;

    // Check row
    for (let j = 0; j < 9; j++) {
        if (board[row][j] === num) {
            return false;
        }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }

    // Check 3x3 box
    const boxX = Math.floor(col / 3);
    const boxY = Math.floor(row / 3);
    for (let i = boxY * 3; i < boxY * 3 + 3; i++) {
        for (let j = boxX * 3; j < boxX * 3 + 3; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }
    return true;
};

export const solve = (board: Board): boolean => {
    const find = findEmpty(board);
    if (!find) {
        return true;
    }
    const [row, col] = find;

    for (let i = 1; i < 10; i++) {
        if (valid(board, i, [row, col])) {
            board[row][col] = i;
            if (solve(board)) {
                return true;
            }
            board[row][col] = 0;
        }
    }
    return false;
};

const shuffle = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const solveRandom = (board: Board): boolean => {
    const find = findEmpty(board);
    if (!find) {
        return true;
    }
    const [row, col] = find;

    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (const num of nums) {
        if (valid(board, num, [row, col])) {
            board[row][col] = num;
            if (solveRandom(board)) {
                return true;
            }
            board[row][col] = 0;
        }
    }
    return false;
};

export const generateFullBoard = (): Board => {
    const board = Array(9).fill(0).map(() => Array(9).fill(0));
    solveRandom(board);
    return board;
};

export const removeCells = (board: Board, level: Difficulty): Board => {
    const levels: Record<Difficulty, number> = {
        "Easy": 35,
        "Medium": 45,
        "Hard": 55,
        "Expert": 60
    };
    let cellsToRemove = levels[level] || 35;
    const newBoard = JSON.parse(JSON.stringify(board)); // Deep copy

    let count = 0;
    while (count < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (newBoard[row][col] !== 0) {
            newBoard[row][col] = 0;
            count++;
        }
    }
    return newBoard;
};

export const hasConflict = (board: Board, row: number, col: number): boolean => {
    const num = board[row][col];
    if (num === 0) {
        return false; // Empty cells can't have conflicts
    }

    // Check row for conflict
    for (let j = 0; j < 9; j++) {
        if (j !== col && board[row][j] === num) {
            return true;
        }
    }

    // Check column for conflict
    for (let i = 0; i < 9; i++) {
        if (i !== row && board[i][col] === num) {
            return true;
        }
    }

    // Check 3x3 box for conflict
    const boxX = Math.floor(col / 3);
    const boxY = Math.floor(row / 3);
    for (let i = boxY * 3; i < boxY * 3 + 3; i++) {
        for (let j = boxX * 3; j < boxX * 3 + 3; j++) {
            if ((i !== row || j !== col) && board[i][j] === num) {
                return true;
            }
        }
    }

    return false;
};
