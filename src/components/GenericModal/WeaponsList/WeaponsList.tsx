import React, { useState, useEffect } from 'react';
import data from '../../../jsons/Weapons-Cyberpunk.json';

interface Weapon {
    Category: string | null;
    Manufacturer: string | null;
    Name: string | null;
    WeaponSkill: string | null;
    Damage: string | null;
    AccuracyBonus: string | null;
    Magazine: string | null;
    RateOfFire: string | null;
    HandsRequired: number | null;
    Availability: string | null;
    Concealment: string | null;
    Quality: string | null;
    Cost: string | null;
    AdditionalInfo?: string | null;
    Description?: string | null;
}

const WeaponsList: React.FC = () => {
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [filteredWeapons, setFilteredWeapons] = useState<Weapon[]>([]);
    const [search, setSearch] = useState<string>('');
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        const formattedData: Weapon[] = data.map((weapon) => ({
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

        setWeapons(formattedData);
        setFilteredWeapons(formattedData);
    }, []);

    useEffect(() => {
        const filteredWeapons = weapons.filter((weapon) =>
            weapon.Name?.toLowerCase().includes(search.toLowerCase()) &&
            (filter ? weapon.Category === filter : true)
        );
        setFilteredWeapons(filteredWeapons);
    }, [search, filter, weapons]);

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm w-1/2"
                />
                <select
                    value={filter || ''}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm w-1/4"
                >
                    <option value="">All Categories</option>
                    {[...new Set(data.map((weapon) => weapon.Category || 'Unknown'))].map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white/50 p-2">
                {filteredWeapons.map((weapon, index) => (
                    <li key={index} className="p-4 border border-gray-300 rounded-md shadow-sm">
                        <h2 className="font-bold text-lg">{weapon.Name}</h2>
                        <p><strong>Category:</strong> {weapon.Category}</p>
                        <p><strong>Manufacturer:</strong> {weapon.Manufacturer}</p>
                        <p><strong>Damage:</strong> {weapon.Damage}</p>
                        <p><strong>Accuracy Bonus:</strong> {weapon.AccuracyBonus}</p>
                        <p><strong>Rate of Fire:</strong> {weapon.RateOfFire}</p>
                        <p><strong>Quality:</strong> {weapon.Quality}</p>
                        <p><strong>Cost:</strong> {weapon.Cost}</p>
                        {weapon.AdditionalInfo && <p><strong>Additional Info:</strong> {weapon.AdditionalInfo}</p>}
                        {weapon.Description && <p><strong>Description:</strong> {weapon.Description}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WeaponsList;
