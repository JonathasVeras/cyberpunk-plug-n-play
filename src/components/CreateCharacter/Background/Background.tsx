import React from "react";

interface BackgroundProps {
    background: string;
    setBackground: (background: string) => void;
}

const Background: React.FC<BackgroundProps> = ({ background, setBackground }) => {
    return (
        <>
            <label
                htmlFor="antecedente"
                className="block text-2xl font-bold mb-4 text-center"
            >
                Background
            </label>
            <p className="text-lg text-[#ef767a] mb-4">
                Your Background will define who you were before the adventure began; it doesn't have to represent your current occupation:
            </p>
            <select
                id="selectBackground"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="block w-full bg-black text-[#00ffff] p-2 rounded-lg text-lg mb-6"
            >
                <option value="">Select...</option>
                <option value="idol">Idol</option>
                <option value="media">Media</option>
                <option value="netrunner">Netrunner</option>
                <option value="nomad">Nomad</option>
                <option value="cop">Cop</option>
                <option value="solo">Solo</option>
                <option value="techno-mancer">Techno-Mancer</option>
                <option value="techno-medical">Techno-Medical</option>
                <option value="athlete">Athlete</option>
                <option value="bruiser">Bruiser</option>
                <option value="corporate">Corporate</option>
                <option value="criminal">Criminal</option>
            </select>

        </>
    )
}

export default Background;