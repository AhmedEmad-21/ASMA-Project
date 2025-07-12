'use client';
import React from 'react';

interface ProcessStepProps {
    number: string;
    title: string;
    description: string;
}

export default function ProcessStep({ number, title, description }: ProcessStepProps) {
    return (
        <div className="text-center">
            <div className="w-16 h-16 bg-[#F7931E] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {number}
            </div>
            <h3 className="text-xl font-semibold text-[#0C1C2D] mb-2">
                {title}
            </h3>
            <p className="text-gray-600">
                {description}
            </p>
        </div>
    );
} 