
import React from 'react';
import type { Difficulty } from '../types';

interface ControlsProps {
    difficulty: Difficulty;
    onDifficultyChange: (level: Difficulty) => void;
    onGenerate: () => void;
    onSolve: () => void;
    onClear: () => void;
    isLoading: boolean;
    isAiMode: boolean;
    onAiModeChange: (enabled: boolean) => void;
    onAiStep: () => void;
}

const Controls: React.FC<ControlsProps> = ({
    difficulty,
    onDifficultyChange,
    onGenerate,
    onSolve,
    onClear,
    isLoading,
    isAiMode,
    onAiModeChange,
    onAiStep,
}) => {
    const buttonClasses = "w-full sm:w-auto flex-grow px-4 py-2 rounded-md font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";
    const toggleBgClasses = isAiMode ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600';
    const toggleIndicatorClasses = isAiMode ? 'translate-x-5' : 'translate-x-0';

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
            <div className="flex flex-wrap items-center gap-2">
                 <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">Manual</span>
                     <button
                        type="button"
                        className={`${toggleBgClasses} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800`}
                        role="switch"
                        aria-checked={isAiMode}
                        onClick={() => onAiModeChange(!isAiMode)}
                    >
                        <span
                            aria-hidden="true"
                            className={`${toggleIndicatorClasses} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                        />
                    </button>
                    <span className="font-semibold text-slate-600 dark:text-slate-300">AI</span>
                </div>
                <div className="flex-grow flex flex-wrap gap-2 sm:justify-end">
                    {isAiMode && (
                         <button onClick={onAiStep} className={`${buttonClasses} bg-sky-500 hover:bg-sky-600 focus:ring-sky-500`}>AI Step</button>
                    )}
                    <button onClick={onSolve} className={`${buttonClasses} bg-green-600 hover:bg-green-700 focus:ring-green-500`}>Solve</button>
                    <button onClick={onClear} className={`${buttonClasses} bg-red-500 hover:bg-red-600 focus:ring-red-500`}>Clear</button>
                </div>
            </div>
        </div>
    );
};

export default Controls;
