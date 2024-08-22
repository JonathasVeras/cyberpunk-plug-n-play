import React, { useState } from 'react';
import { ICharacterSheet } from '../../interfaces/characterSheet';
import Attributes from '../CreateCharacter/Attributes/Attributes';

interface EditCharacterSheetProps {
    character: ICharacterSheet | null;
    setCharacter: React.Dispatch<React.SetStateAction<ICharacterSheet | null>>;
    onClose: () => void;
    saveCharacter: (formState: any) => void;
}

const EditCharacterSheet: React.FC<EditCharacterSheetProps> = ({ character, setCharacter, onClose, saveCharacter }) => {
    const [formState, setFormState] = useState<ICharacterSheet | null>(character);

    const handleInputChange = (e: any) => {
        if (formState) {
            setFormState({
                ...formState,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleInputChangeAge = (e: any) => {
        if (formState) {
            setFormState({
                ...formState,
                age: e.target.value,
            });
        }
    };

    const handleInputChangeGender = (e: any) => {
        if (formState) {
            setFormState({
                ...formState,
                gender: e.target.value,
            });
        }
    };

    const handleAttributeChange = (updatedAttributes: ICharacterSheet['attributes']) => {
        if (formState) {
            setFormState({
                ...formState,
                attributes: updatedAttributes,
            });
        }
    };

    const handleStatsChange = (updatedStats: Partial<ICharacterSheet>) => {
        if (formState) {
            setFormState({
                ...formState,
                ...updatedStats,
            });
        }
    };

    const handleSave = () => {
        if (formState) {
            setCharacter(formState);
            saveCharacter(formState);
            onClose();
        }
    };

    if (!formState) return null;

    return (
        <div className="p-6 rounded-lg shadow-lg mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Edit Character</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Age:</label>
                <input
                    type="text"
                    name="idade"
                    value={formState.age}
                    onChange={handleInputChangeAge}
                    className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Gender:</label>
                <select
                    name="sexo"
                    value={formState.gender}
                    onChange={handleInputChangeGender}
                    className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700"
                >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                </select>
            </div>
            <Attributes
                attributes={formState.attributes}
                setAttributes={handleAttributeChange}
                setStats={handleStatsChange}
                removeLimit={true}
            />
            <div className="flex justify-end space-x-4 mt-6">
                <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition"
                >
                    Save
                </button>
                <button
                    onClick={onClose}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditCharacterSheet;
