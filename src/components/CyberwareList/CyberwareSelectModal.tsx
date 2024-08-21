import React, { useState } from 'react';
import { ICyberware } from '../../interfaces/ICyberware';

interface CyberwareSelectionModalProps {
    cyberwares: ICyberware[];
    onSelectCyberware: (cyberware: ICyberware) => void;
    onClose: () => void;
}

const CyberwareSelectionModal: React.FC<CyberwareSelectionModalProps> = ({ cyberwares, onSelectCyberware, onClose }) => {
    const [filter, setFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('');

    const filteredCyberwares = cyberwares.filter(cyberware => {
        const nameMatch = cyberware.Title?.toLowerCase().includes(filter.toLowerCase());
        const categoryMatch = categoryFilter ? cyberware.Category === categoryFilter : true;
        return nameMatch && categoryMatch;
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-4 rounded-lg max-w-lg w-full">
                <h2 className="text-xl font-semibold mb-4">Select a Cyberware</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Filter cyberware by name"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md shadow-sm mb-2 w-full bg-gray-800"
                    />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md shadow-sm w-full bg-gray-800"
                    >
                        <option value="">All Categories</option>
                        {[...new Set(cyberwares.map(cyberware => cyberware.Category || 'Unknown'))].map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="max-h-60 overflow-y-auto">
                    {filteredCyberwares.map((cyberware, index) => (
                        <div
                            key={index}
                            className="flex justify-between bg-gray-900 p-2 rounded-lg mb-2 cursor-pointer"
                            onClick={() => onSelectCyberware(cyberware)}
                        >
                            <span>{cyberware.Title}</span>
                            <span>Category: {cyberware.Category}</span>
                        </div>
                    ))}
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 p-2 bg-red-500 text-white rounded-md w-full"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default CyberwareSelectionModal;
