import React, { useState } from 'react';
import { Weapon } from '../../interfaces/IWeapon';

interface WeaponSelectionModalProps {
    weapons: Weapon[];
    onSelectWeapon: (weapon: Weapon) => void;
    onClose: () => void;
}

const WeaponSelectionModal: React.FC<WeaponSelectionModalProps> = ({ weapons, onSelectWeapon, onClose }) => {
    const [filter, setFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [damageFilter, setDamageFilter] = useState<string>('');

    const filteredWeapons = weapons.filter(weapon => {
        const nameMatch = weapon.Name?.toLowerCase().includes(filter.toLowerCase());
        const categoryMatch = categoryFilter ? weapon.Category === categoryFilter : true;
        const damageMatch = damageFilter ? weapon.Damage?.toLowerCase().includes(damageFilter.toLowerCase()) : true;
        return nameMatch && categoryMatch && damageMatch;
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-4 rounded-lg max-w-lg w-full">
                <h2 className="text-xl font-semibold mb-4">Select a Weapon</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Filter weapons by name"
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
                        {[...new Set(weapons.map(weapon => weapon.Category || 'Unknown'))].map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Filter by damage (e.g., 1d8, 2d4)"
                        value={damageFilter}
                        onChange={(e) => setDamageFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md shadow-sm mt-2 w-full bg-gray-800"
                    />
                </div>
                <div className="max-h-60 overflow-y-auto">
                    {filteredWeapons.map((weapon, index) => (
                        <div
                            key={index}
                            className="flex justify-between bg-gray-900 p-2 rounded-lg mb-2 cursor-pointer"
                            onClick={() => onSelectWeapon(weapon)}
                        >
                            <span>{weapon.Name}</span>
                            <span>Damage: {weapon.Damage}</span>
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

export default WeaponSelectionModal;
