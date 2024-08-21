import React, { useState, useEffect } from 'react';
import { ICharacterStats } from '../../../pages/Player/Characters/NewCharacter/NewCharacter';
import { IAttributes } from '../../../interfaces/characterSheet';

interface AttributesProps {
  attributes: IAttributes;
  setAttributes: (attributes: IAttributes) => void;
  setStats: (stats: ICharacterStats) => void;
  removeLimit: boolean;
}

const MIN_ATTRIBUTE_VALUE = 2;
const MAX_ATTRIBUTE_VALUE = 10;
const TOTAL_POINTS = 78;

const attributeCategories = {
  Physical: ["agility", "body", "strength", "endurance"],
  Combat: ["block", "fight", "dodge", "focus"],
  Mental: ["selfControl", "dexterity", "intelligence", "wisdom"],
  Social: ["empathy", "intimidation", "leadership", "seduction"],
  Techno: ["acceptance", "humanity", "invasion", "protection"],
  Occult: ["destiny", "faith", "narrative", "luck"],
};

const Attributes: React.FC<AttributesProps> = ({
  attributes,
  setAttributes,
  setStats,
  removeLimit = false,
}) => {
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
    const validatedValue = removeLimit
      ? value
      : Math.min(Math.max(value, MIN_ATTRIBUTE_VALUE), MAX_ATTRIBUTE_VALUE);

    const updatedAttributes = {
      ...tempValues,
      [name]: validatedValue,
    };

    setTempValues(updatedAttributes);
    setAttributes(updatedAttributes);
  };

  const remainingPoints = removeLimit
    ? null
    : TOTAL_POINTS - Object.values(tempValues).reduce((sum, val) => sum + val, 0);

  return (
    <div className="bg-[#220425] text-blue-punk border-blue-punk border-3 p-6 rounded-lg w-full">
      <h3 className="text-3xl font-bold text-center mb-4">Attributes</h3>
      {!removeLimit && <>
        <p className="text-xl text-pinkish-red mb-2">
          Each of the following 6 attributes will have 4 sub-attributes. You can
          define your character's affinity with each of these by distributing 24
          points among all 24 of them.
        </p>
        <p className="text-xl text-pinkish-red mb-5">
          *Remember, the minimum value for each attribute is 2 points{!removeLimit && " and the maximum is 10 points."}
        </p>
      </>}
      {!removeLimit && (
        <div className="flex justify-center mb-5">
          <label className="text-xl text-pinkish-red mr-5">
            Points remaining:
          </label>
          <input
            type="text"
            className="bg-black text-blue-punk w-20 text-center"
            value={remainingPoints ?? ""}
            readOnly
          />
        </div>
      )}
      <div className="flex flex-row space-y-5">
        {Object.entries(attributeCategories).map(
          ([category, subAttributes]) => (
            <div key={category} className="flex-1">
              <h4 className="font-bold text-xl border-[#05b8e9] border-3 rounded-md text-center mb-2 bg-[#220425] p-2">
                {category}
              </h4>
              <div className="flex flex-col space-y-2">
                {subAttributes.map((subAttr) => (
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
                          parseInt(e.target.value, 10)
                        )
                      }
                      min={MIN_ATTRIBUTE_VALUE}
                      {...(!removeLimit && { max: MAX_ATTRIBUTE_VALUE })}
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Attributes;
