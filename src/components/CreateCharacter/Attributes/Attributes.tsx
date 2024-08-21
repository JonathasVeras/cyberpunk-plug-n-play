import React, { useState, useEffect } from 'react';
import { ICharacterStats } from '../../../pages/Player/Characters/NewCharacter/NewCharacter';
import { IAttributes } from '../../../interfaces/characterSheet';

interface AttributesProps {
    attributes: IAttributes;
    setAttributes: (attributes: IAttributes) => void;
    setStats: (stats: ICharacterStats) => void;
}

const Attributes: React.FC<AttributesProps> = ({ attributes, setAttributes, setStats }) => {
    const [tempValues, setTempValues] = useState<IAttributes>(attributes);

    useEffect(() => {
        setTempValues(attributes);
    }, [attributes]);

    useEffect(() => {
        const {
            endurance,
            strength,
            selfControl,
            wisdom,
            dexterity,
            agility,
            humanity,
        } = tempValues;

        setStats({
            maxHealth: endurance + strength,
            tokenHealthPoints: (endurance + strength) * 10,
            maxSanity: selfControl + wisdom,
            passivePerception: (dexterity + wisdom) / 2,
            maxWeight: 4 + (strength + endurance) * 5,
            identity: humanity * 3 + 20,
            baseSpeed: (agility + dexterity) / 2,
            movement: agility / 2,
            runSpeed: (agility / 2) * 4,
            walkAndDifficultTerrain: (agility / 2) * 2,
            woundedAndOverloadedPenalty: (agility / 2) * 1,
            damageReduction: endurance / 2,
        });
    }, [tempValues]);

    const handleAttributeChange = (name: keyof IAttributes, value: number) => {
        setTempValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBlur = (name: keyof IAttributes) => {
        const validatedValue = validateValue(tempValues[name]);
        const newAttributes = {
            ...attributes,
            [name]: validatedValue,
        };
        setAttributes(newAttributes);
    };

    const validateValue = (value: number): number => {
        if (value < 2) {
            alert("Only values from 2 to 10 are allowed.");
            return 2;
        }
        if (value > 10) {
            alert("Only values from 2 to 10 are allowed.");
            return 10;
        }
        return value;
    };

    return (
        < div className="bg-[#220425] text-blue-punk border-blue-punk border-3 p-6 rounded-lg w-full" >
            <h3 className="text-3xl font-bold text-center mb-4">Attributes</h3>
            <p className="text-xl text-pinkish-red mb-2">
                Each of the following 6 attributes will have 4 sub-attributes. You can
                define your character's affinity with each of these by distributing
                72 points among all 24.
            </p>
            <p className="text-xl text-pinkish-red mb-5">
                *Remember, the minimum value for each attribute is 2 points and the maximum is 10 points.
            </p>
            <div className="flex justify-center mb-5">
                <label className="text-xl text-pinkish-red mr-5">
                    Points remaining:
                </label>
                <input
                    type="text"
                    className="bg-black text-blue-punk w-20 text-center"
                    value={72 - Object.values(tempValues).reduce((sum, val) => sum + val, 0)}
                    readOnly
                />
            </div>
            <div className="flex flex-row space-y-5">
                {/* Row 1: Physical, Combat, Mental */}
                {["Physical", "Combat", "Mental", "Social", "Techno", "Occult"].map(category => (
                    <div key={category} className="flex-1">
                        <h4 className="font-bold text-xl border-[#05b8e9] border-3 rounded-md text-center mb-2 bg-[#220425] p-2">
                            {category}
                        </h4>
                        <div className="flex flex-col space-y-2">
                            {[
                                ["agility", "body", "strength", "endurance"],
                                ["block", "fight", "dodge", "focus"],
                                ["selfControl", "dexterity", "intelligence", "wisdom"],
                                ["empathy", "intimidation", "leadership", "seduction"],
                                ["acceptance", "humanity", "invasion", "protection"],
                                ["destiny", "faith", "narrative", "luck"]
                            ][["Physical", "Combat", "Mental", "Social", "Techno", "Occult"].indexOf(category)].map(subAttr => (
                                <div key={subAttr} className="flex items-center">
                                    <label className="text-lg mr-2">
                                        {subAttr.charAt(0).toUpperCase() + subAttr.slice(1)}:
                                    </label>
                                    <input
                                        type="number"
                                        className="bg-black text-blue-punk w-20"
                                        value={tempValues[subAttr as keyof IAttributes]}
                                        onChange={(e) =>
                                            handleAttributeChange(
                                                subAttr as keyof IAttributes,
                                                parseInt(e.target.value, 10) || 0
                                            )
                                        }
                                        onBlur={() => handleBlur(subAttr as keyof IAttributes)}
                                        min={2}
                                        max={10}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Attributes;
