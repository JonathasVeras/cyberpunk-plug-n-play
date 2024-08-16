import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICharacterSheet } from '../../../../interfaces/characterSheet';
import { Weapon } from '../../../../interfaces/IWeapon';
import WeaponsListSheet from '../../../../components/WeaponsList/WeaponsListSheet';
import weaponsData from '../../../../jsons/Weapons-Cyberpunk.json';
import ActionsSidebar from '../../../../components/ActionsSidebar/ActionsSidebar';

const Character: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<ICharacterSheet | null>(null);
    const [weaponList, setWeaponList] = useState<Weapon[]>([]);

    useEffect(() => {
        const formattedData: Weapon[] = weaponsData.map((weapon) => ({
            Category: weapon.Category,
            Manufacturer: weapon.Manufacturer,
            Name: weapon.Name,
            WeaponSkill: weapon["Weapon Skill"],
            Damage: weapon.Damage,
            AccuracyBonus: weapon["Accuracy Bonus"],
            Magazine: weapon.Magazine,
            RateOfFire: weapon["Rate of Fire"],
            HandsRequired: weapon["Hands Required"],
            Availability: weapon.Availability,
            Concealment: weapon.Concealment,
            Quality: weapon.Quality,
            Cost: weapon.Cost,
            AdditionalInfo: weapon["Additional Info"],
            Description: weapon.Description,
        }));

        setWeaponList(formattedData);
    }, []);

    useEffect(() => {
        fetchCharacter();
    }, [id]);

    const handleAddWeapon = (weapon: Weapon) => {
        if (character) {
            const newWeapon: Weapon = {
                Category: weapon.Category || null,
                Manufacturer: weapon.Manufacturer || null,
                Name: weapon.Name || '',
                WeaponSkill: weapon.WeaponSkill || null,
                Damage: weapon.Damage || '',
                AccuracyBonus: weapon.AccuracyBonus || null,
                Magazine: weapon.Magazine || null,
                RateOfFire: weapon.RateOfFire || null,
                HandsRequired: weapon.HandsRequired || null,
                Availability: weapon.Availability || null,
                Concealment: weapon.Concealment || null,
                Quality: weapon.Quality || null,
                Cost: weapon.Cost || null,
                AdditionalInfo: weapon.AdditionalInfo || null,
                Description: weapon.Description || null,
            };

            const updatedCharacter = { ...character, weapons: [...character.weapons, newWeapon] };
            setCharacter(updatedCharacter);

            if (id?.startsWith('local-')) {
                const localIndex = parseInt(id.replace('local-', ''), 10);
                const storedSheets = localStorage.getItem('CharacterSheetsOffline');
                if (storedSheets) {
                    const sheets = JSON.parse(storedSheets) as ICharacterSheet[];
                    sheets[localIndex] = updatedCharacter;
                    localStorage.setItem('CharacterSheetsOffline', JSON.stringify(sheets));
                }
            }
        }
    };

    const handleRemoveWeapon = (index: number) => {
        if (character) {
            const newWeapons = [...character.weapons];
            newWeapons.splice(index, 1);
            const updatedCharacter = { ...character, weapons: newWeapons };
            setCharacter(updatedCharacter);

            if (id?.startsWith('local-')) {
                const localIndex = parseInt(id.replace('local-', ''), 10);
                const storedSheets = localStorage.getItem('CharacterSheetsOffline');
                if (storedSheets) {
                    const sheets = JSON.parse(storedSheets) as ICharacterSheet[];
                    sheets[localIndex] = updatedCharacter;
                    localStorage.setItem('CharacterSheetsOffline', JSON.stringify(sheets));
                }
            }
        }
    };

    const fetchCharacter = () => {
        if (id?.startsWith('local-')) {
            const localIndex = parseInt(id.replace('local-', ''), 10);
            const storedSheets = localStorage.getItem('CharacterSheetsOffline');
            if (storedSheets) {
                const sheets = JSON.parse(storedSheets) as ICharacterSheet[];
                setCharacter(sheets[localIndex]);
            }
        } else {
            // TO DO - Fazer a lógica para fichas online
            const storedSheets: any = [];
            setCharacter(storedSheets[parseInt(id || '0', 10)]);
        }
    };

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-[url('../wallpapers/character-sheet-play-wallpaper.jpg')] bg-cover bg-center bg-fixed min-h-screen text-white flex flex-col sm:grid sm:grid-cols-3">
            <div className="container mx-auto p-8 bg-black/50 rounded-lg sm:col-span-2">
                <header className="mb-6 text-center">
                    <h1 className="text-3xl font-bold">{character.name}</h1>
                    <p className="text-lg">Age: {character.age}</p>
                    <p>Gender: {character.gender}</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Attributes Section */}
                    <div className="lg:col-span-1 bg-gray-800/70 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Attributes</h2>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(character.attributes).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                    <span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Character Stats Section */}
                    <div className="lg:col-span-2 bg-gray-800/70 p-4 rounded-lg space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Character Stats</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex justify-between">
                                <span>Identity:</span>
                                <span>{character.identity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Max Weight:</span>
                                <span>{character.maxWeight}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Base Speed:</span>
                                <span>{character.baseSpeed}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Movement:</span>
                                <span>{character.movement}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Run:</span>
                                <span>{character.run}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Wounded & Overloaded:</span>
                                <span>{character.woundedAndOverloaded}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Difficult Terrain Movement:</span>
                                <span>{character.difficultTerrainMovement}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Passive Perception:</span>
                                <span>{character.passivePerception}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Max Health:</span>
                                <span>{character.maxHealth}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Max Sanity:</span>
                                <span>{character.maxSanity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Damage Reduction:</span>
                                <span>{character.damageReduction}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Token Health Points:</span>
                                <span>{character.tokenHealthPoints}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items, Weapons, Cyberware, and Skills */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <WeaponsListSheet
                        weapons={character.weapons}
                        onAddWeapon={handleAddWeapon}
                        onRemoveWeapon={handleRemoveWeapon}
                        availableWeapons={weaponList}
                    />

                    <div className="bg-gray-800/70 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Items</h2>
                        <div className="space-y-2">
                            {/* Example of an item */}
                            <div className="flex justify-between bg-gray-900 p-2 rounded-lg">
                                <span>Item Name</span>
                                <span>Quantity: 3</span>
                            </div>
                            {/* Additional items */}
                        </div>
                    </div>

                    <div className="bg-gray-800/70 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Cyberware</h2>
                        <div className="space-y-2">
                            {/* Example of cyberware */}
                            <div className="flex justify-between bg-gray-900 p-2 rounded-lg">
                                <span>Cyberware Name</span>
                                <span>Effect: Enhanced Strength</span>
                            </div>
                            {/* Additional cyberware */}
                        </div>
                    </div>

                    <div className="bg-gray-800/70 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Skills</h2>
                        <div className="space-y-2">
                            {/* Example of a skill */}
                            <div className="flex justify-between bg-gray-900 p-2 rounded-lg">
                                <span>Skill Name</span>
                                <span>Level: 4</span>
                            </div>
                            {/* Additional skills */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Actions Sidebar */}
            <ActionsSidebar weapons={character.weapons} />
        </div>
    );
};

export default Character;
