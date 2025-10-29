
import React from 'react';
import type { Difficulty } from '../types';

interface ControlsProps {
    difficulty: Difficulty;
    onDifficultyChange: (level: Difficulty) => void;
    onGenerate: () => void;
    onSolve: () => void;
    onClear: () => void;
    isLoading: boolean;
}

const Controls: React.FC<ControlsProps> = ({
    difficulty,
    onDifficultyChange,
    onGenerate,
    onSolve,
    onClear,
    isLoading
}) => {
    const buttonClasses = "w-full sm:w-auto flex-grow px-4 py-2 rounded-md font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";

    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md mb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <label htmlFor="difficulty" className="font-semibold text-slate-600 dark:text-slate-300">Difficulty:</label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
                    className="w-full sm:w-auto px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                    <option>Expert</option>
                </select>
                <button
                    onClick={onGenerate}
                    disabled={isLoading}
                    className={`${buttonClasses} bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500`}
                >
                    {isLoading ? 'Generating...' : 'New Puzzle'}
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                <button onClick={onSolve} className={`${buttonClasses} bg-green-600 hover:bg-green-700 focus:ring-green-500`}>Solve</button>
                <button onClick={onClear} className={`${buttonClasses} bg-red-500 hover:bg-red-600 focus:ring-red-500`}>Clear</button>
            </div>
        </div>
    );
};

export default Controls;