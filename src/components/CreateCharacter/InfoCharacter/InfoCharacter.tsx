import React from "react";

const InfoCharacter: React.FC<any> = ({ characterName, setCharacterName, age, setAge, gender, setGender }) => {
    const handleCharacterName = (e: any) => {
        setCharacterName(e.target.value)
    }
    const handleAge = (e: any) => {
        setAge(e.target.value)
    }
    const handleGender = (e: any) => {
        setGender(e.target.value)
    }

    return (
        <>
            <div className="flex justify-center mt-4 mb-4">
                <form className="bg-dark-purple text-blue-punk w-full max-w-5xl p-5">
                    <h3 className="text-2xl font-bold text-blue-punk mb-4">
                        Personal Info
                    </h3>
                    <div className="flex space-x-4">
                        <div>
                            <label className="text-lg font-bold text-pinkish-red">
                                Character name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={characterName}
                                onChange={handleCharacterName}
                                className="ml-5 inputFicha p-2 bg-black text-blue-punk"
                            />
                        </div>
                        <div>
                            <label className="text-lg font-bold text-pinkish-red">
                                Age:
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={age}
                                onChange={handleAge}
                                className="ml-5 inputFicha p-2 bg-black text-blue-punk"
                            />
                        </div>
                        <div>
                            <label className="text-lg font-bold text-pinkish-red">
                                Gender:
                            </label>
                            <select
                                name="gender"
                                value={gender}
                                onChange={handleGender}
                                className="ml-5 inputFicha p-2 bg-black text-blue-punk"
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-binary">Non-binary</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default InfoCharacter;
