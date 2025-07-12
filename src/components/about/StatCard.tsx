'use client';
import React from 'react';

interface StatCardProps {
    number: React.ReactNode; // Changed from string to ReactNode to support styled elements
    label: string;
}

function StatCard({ number, label }: StatCardProps) {
    return (
        <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#0C1C2D] mb-2">
                {number}
            </div>
            <p className="text-gray-600 text-lg">
                {label}
            </p>
        </div>
    );
}

export default React.memo(StatCard);