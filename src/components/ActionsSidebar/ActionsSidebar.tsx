import { Weapon } from "../../interfaces/IWeapon";

const ActionsSidebar: React.FC<{ weapons: Weapon[] }> = ({ weapons }) => {
    const handleRollDamage = (damage: string | null) => {
        // TO DO Lógica para rolar o dano (pode ser randomizado ou fixo)
        console.log(`Rolling damage for ${damage}`);
    };

    return (
        <div className="bg-gray-800/70 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            {weapons.map((weapon, index) => (
                <div key={index} className="flex justify-between bg-gray-900 p-2 rounded-lg">
                    <span>{weapon.Name}</span>
                    <button onClick={() => handleRollDamage(weapon.Damage)} className="bg-red-500 p-2 rounded-md">
                        Roll Damage
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ActionsSidebar;