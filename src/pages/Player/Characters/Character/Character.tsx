import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICharacterSheet } from '../../../../interfaces/characterSheet';

const Character: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<ICharacterSheet | null>(null);

    useEffect(() => {
        fetchCharacter();
    }, [id]);

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
        <div className="bg-[url('../wallpapers/character-sheet-play-wallpaper.jpg')] bg-cover bg-center bg-fixed min-h-screen text-white">
            <div className="container mx-auto p-8 bg-black/50 rounded-lg">
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
                    <div className="bg-gray-800/70 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Weapons</h2>
                        <div className="space-y-2">
                            {/* Example of a weapon item */}
                            <div className="flex justify-between bg-gray-900 p-2 rounded-lg">
                                <span>Weapon Name</span>
                                <span>Damage: 10</span>
                            </div>
                            {/* Additional weapon items */}
                        </div>
                    </div>

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
        </div>
    );
};

export default Character;
