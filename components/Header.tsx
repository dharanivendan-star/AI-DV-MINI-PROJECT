
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center my-6">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 dark:from-sky-400 dark:to-indigo-500">
                AI Powered Sudoku
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
                Generate puzzles and let the AI assist you.
            </p>
        </header>
    );
};

export default Header;
