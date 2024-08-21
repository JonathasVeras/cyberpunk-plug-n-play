import React, { useState } from 'react';
import { ICyberware } from '../../interfaces/ICyberware';
import CyberwareSelectionModal from './CyberwareSelectModal';

interface CyberwareListSheetProps {
    cyberwares: ICyberware[];
    availableCyberware: ICyberware[];
    onAddCyberware: (cyberware: ICyberware) => void;
    onRemoveCyberware: (index: number) => void;
}

const CyberwareListSheet: React.FC<CyberwareListSheetProps> = ({ cyberwares, availableCyberware, onAddCyberware, onRemoveCyberware }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectCyberware = (cyberware: ICyberware) => {
        onAddCyberware(cyberware);
        setIsModalOpen(false);
    };

    return (
        <div className="bg-gray-800/70 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Cyberware</h2>
            <div className="space-y-2 max-h-[400px] overflow-y-scroll">
                {cyberwares.map((cyberware, index) => (
                    <div key={index} className="flex flex-col bg-gray-900 p-4 rounded-lg">
                        <div className="flex justify-between">
                            <span className="font-semibold">{cyberware.Title}</span>
                            <button onClick={() => onRemoveCyberware(index)} className="text-red-500">Remove</button>
                        </div>
                        <div className="mt-2 text-sm">
                            <div><strong>Category:</strong> {cyberware.Category}</div>
                            <div><strong>Manufacturer:</strong> {cyberware.Manufacturer || 'N/A'}</div>
                            <div><strong>Description:</strong> {cyberware.Description}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 bg-green-500 text-white rounded-md"
                >
                    Add Cyberware
                </button>
            </div>

            {isModalOpen && (
                <CyberwareSelectionModal
                    cyberwares={availableCyberware}
                    onSelectCyberware={handleSelectCyberware}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default CyberwareListSheet;
