'use client';
import { useState, useEffect } from 'react';
import { FaRuler } from 'react-icons/fa';

function KitchenCalculator() {
    const [width, setWidth] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);
    const [isCalculating, setIsCalculating] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // Base price per square meter in Egyptian Pounds
    const BASE_PRICE = 1500;

    const validateInput = (value: string): boolean => {
        const regex = /^\d*\.?\d*$/;
        return regex.test(value);
    };

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (validateInput(value)) {
            setWidth(value);
            setError('');
        }
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (validateInput(value)) {
            setHeight(value);
            setError('');
        }
    };

    useEffect(() => {
        if (width && height) {
            const widthNum = parseFloat(width);
            const heightNum = parseFloat(height);

            if (widthNum > 0 && heightNum > 0) {
                setIsCalculating(true);
                const timer = setTimeout(() => {
                    const area = widthNum * heightNum;
                    const totalPrice = area * BASE_PRICE;
                    setResult(totalPrice);
                    setIsCalculating(false);
                }, 500);

                return () => clearTimeout(timer);
            } else {
                setError('Please enter valid dimensions greater than 0');
                setResult(null);
            }
        } else {
            setResult(null);
        }
    }, [width, height]);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 sm:p-8"> {/* Balanced padding */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7"> {/* Balanced gap */}
                <div className="bg-[#F7F3E9] p-5 rounded-lg shadow-md"> {/* Neutral light background */}
                    <div className="flex items-center mb-4">
                        <FaRuler className="w-6 h-6 text-[#C19A6B] mr-3" /> {/* Warm brown icon color */}
                        <label htmlFor="width" className="text-lg font-semibold text-gray-900"> {/* Darker text for better contrast */}
                            Kitchen Width
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            id="width"
                            value={width}
                            onChange={handleWidthChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C19A6B] focus:border-[#C19A6B] text-gray-800 text-lg transition duration-150 ease-in-out" /* Neutral border and focus colors */
                            placeholder="Enter width"
                            inputMode="decimal"
                        />
                        {width && (
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-base"> {/* Neutral text color */}
                                meters
                            </span>
                        )}
                    </div>
                </div>

                <div className="bg-[#F7F3E9] p-5 rounded-lg shadow-md"> {/* Neutral light background */}
                    <div className="flex items-center mb-4">
                        <FaRuler className="w-6 h-6 text-[#C19A6B] mr-3" /> {/* Warm brown icon color */}
                        <label htmlFor="height" className="text-lg font-semibold text-gray-900"> {/* Darker text for better contrast */}
                            Kitchen Height
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            id="height"
                            value={height}
                            onChange={handleHeightChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-[#C19A6B] focus:border-[#C19A6B] text-gray-800 text-lg transition duration-150 ease-in-out" /* Neutral border and focus colors */
                            placeholder="Enter height"
                            inputMode="decimal"
                        />
                        {height && (
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-base"> {/* Neutral text color */}
                                meters
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md text-center shadow-sm"> {/* Subtle error styling */}
                    <p className="text-red-700 text-base font-medium">{error}</p>
                </div>
            )}

            {isCalculating && width && height && (
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center justify-center p-3"> {/* Balanced padding */}
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#C19A6B]"></div> {/* Warm brown spinner color */}
                        <span className="ml-3 text-base text-gray-800 font-medium">Calculating...</span>
                    </div>
                </div>
            )}

            {result !== null && !isCalculating && !error && (
                <div className="mt-6 p-5 bg-[#F7F3E9] rounded-lg shadow-md text-gray-900"> {/* Neutral light background and darker text */}
                    <p className="text-3xl sm:text-4xl font-bold text-center mb-3">
                        {result.toLocaleString()} EGP
                    </p>
                    <div className="text-center text-gray-700">
                        <p className="text-base">
                            Don&#39;t worry! This is an initial estimate based on standard materials
                        </p>
                        <p className="text-base mt-1">
                            Final price may vary based on your specific requirements
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default KitchenCalculator;