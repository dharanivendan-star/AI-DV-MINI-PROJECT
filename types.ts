
export type Board = number[][];

export type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";

export interface SudokuCellProps {
    value: number;
    row: number;
    col: number;
    isInitial: boolean;
    isSelected: boolean;
    isPeer: boolean;
    isSameValue: boolean;
    isIncorrect: boolean;
    onSelect: () => void;
    onChange: (value: number) => void;
}
