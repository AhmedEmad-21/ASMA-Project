'use client';
import React from 'react';
import Image from 'next/image';

interface TeamMemberProps {
    name: string;
    role: string;
    image: string;
}

export default function TeamMember({ name, role, image }: TeamMemberProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
            <div className="relative h-64">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0C1C2D] mb-1">
                    {name}
                </h3>
                <p className="text-gray-600">
                    {role}
                </p>
            </div>
        </div>
    );
} 