'use client';
import React from 'react';
import Image from 'next/image';

interface UserProfileProps {
    name: string;
    email: string;
    avatar: string;
    joinDate: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, email, avatar, joinDate }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-4">
                <div className="relative h-16 w-16">
                    <Image
                        src={avatar}
                        alt={name}
                        fill
                        className="rounded-full object-cover"
                        sizes="(max-width: 768px) 64px, 64px"
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                    <p className="text-gray-600">{email}</p>
                    <p className="text-sm text-gray-500">Member since {joinDate}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile; 