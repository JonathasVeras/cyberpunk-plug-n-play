import React, { useState } from 'react';
import { Weapon } from '../../interfaces/IWeapon';
import WeaponSelectionModal from './WeaponSelectModal';

interface WeaponsListSheetProps {
    weapons: Weapon[];
    availableWeapons: Weapon[];
    onAddWeapon: (weapon: Weapon) => void;
    onRemoveWeapon: (index: number) => void;
}

const WeaponsListSheet: React.FC<WeaponsListSheetProps> = ({ weapons, availableWeapons, onAddWeapon, onRemoveWeapon }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelectWeapon = (weapon: Weapon) => {
        onAddWeapon(weapon);
        setIsModalOpen(false);
    };

    return (
        <div className="bg-gray-800/70 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Weapons</h2>
            <div className="space-y-2 max-h-[400px] overflow-y-scroll">
                {weapons.map((weapon, index) => (
                    <div key={index} className="flex flex-col bg-gray-900 p-4 rounded-lg">
                        <div className="flex justify-between">
                            <span className="font-semibold">{weapon.Name}</span>
                            <button onClick={() => onRemoveWeapon(index)} className="text-red-500">Remove</button>
                        </div>
                        <div className="mt-2 text-sm">
                            <div><strong>Damage:</strong> {weapon.Damage}</div>
                            <div><strong>Accuracy Bonus:</strong> {weapon.AccuracyBonus}</div>
                            <div><strong>Category:</strong> {weapon.Category}</div>
                            <div><strong>Manufacturer:</strong> {weapon.Manufacturer || 'N/A'}</div>
                            <div><strong>Rate of Fire:</strong> {weapon.RateOfFire}</div>
                            <div><strong>Weapon Skill:</strong> {weapon.WeaponSkill}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 bg-green-500 text-white rounded-md"
                >
                    Add Weapon
                </button>
            </div>

            {isModalOpen && (
                <WeaponSelectionModal
                    weapons={availableWeapons}
                    onSelectWeapon={handleSelectWeapon}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default WeaponsListSheet;
