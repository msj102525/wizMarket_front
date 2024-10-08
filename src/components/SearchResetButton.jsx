import React from 'react';

const SearchResetButtons = ({ onSearch, onReset, flexStart }) => {
    return (
        <div className={flexStart ? `flex gap-4 justify-start` : `flex gap-4 justify-center`}>
            <div className="w-20 h-10 mb:w-1/2 mb:h-20">
                <button
                    onClick={onReset}
                    className="w-full h-full border bg-[#ffffff] text-black rounded  text-xs mb:text-5xl"
                >
                    초기화
                </button>
            </div>
            <div className="w-20 h-10 mb:w-1/2 mb:h-20">
                <button
                    onClick={onSearch}
                    className="w-full h-full border bg-[#000000] text-white rounded  text-xs mb:text-5xl"
                >
                    검색
                </button>
            </div>
        </div>
    );
};

export default SearchResetButtons;
