"use client"

import React, { useState, useMemo } from 'react';
import PaginationControllers from './pagination-controllers';

const generateMockData = (count: number) => {
    const mockData = [];
    for (let i = 1; i <= count; i++) {
        mockData.push({ id: i, name: `Mock Data Item #${i}`, detail: `This is detail text for item ${i}.` });
    }
    return mockData;
};

const ITEMS_PER_PAGE = 10;

export default function Pagination(){
    const [data] = useState(() => generateMockData(150));
    // State for the current page number
    const [currentPage, setCurrentPage] = useState(1);

    // --- Derived State (Memoized Calculations) ---

    // Calculate total pages
    const totalPages = useMemo(() => Math.ceil(data.length / ITEMS_PER_PAGE), [data.length]);

    // Calculate the items to display on the current page
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage]);

    // --- UI Helpers ---
    const getPageInfo = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const displayedEnd = Math.min(endIndex, data.length);
        const displayedStart = Math.min(startIndex + 1, displayedEnd); // Handle case where list is empty or starts at 0

        if (data.length === 0) {
            return 'No items in the dataset.';
        }
        return `Page ${currentPage} of ${totalPages} | Showing ${displayedStart} - ${displayedEnd} of ${data.length} items`;
    };

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col items-center bg-gray-50">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-6 md:p-10 ring-4 ring-indigo-50">
                <h1 className="text-3xl font-extrabold text-indigo-800 mb-2">React Pagination Challenge</h1>
                <p className="text-gray-500 mb-6">Built using functional components and hooks for efficient rendering.</p>

                {/* Current Page / Item Info */}
                <div id="info" className="text-center text-sm font-semibold text-gray-600 mb-4 p-2 bg-indigo-50 rounded-md">
                    {getPageInfo()}
                </div>

                {/* Item List Container */}
                <div id="item-list" className="space-y-3 mb-8">
                    {currentItems.map(item => (
                        <div key={item.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm transition hover:bg-indigo-50 flex justify-between items-center">
                            <span className="font-bold text-gray-800">{item.name}</span>
                            <span className="text-sm text-gray-500 hidden sm:block">{item.detail}</span>
                            <span className="text-xs font-mono text-indigo-500">ID: {item.id}</span>
                        </div>
                    ))}
                    {currentItems.length === 0 && (
                        <p className="text-center text-gray-400 p-8">No items found.</p>
                    )}
                </div>

                {/* Pagination Controls Container */}
                <PaginationControllers handleCurrentPage = {setCurrentPage} currentPage = {currentPage} totalPages ={totalPages}/>
            </div>
        </div>
    );
};
