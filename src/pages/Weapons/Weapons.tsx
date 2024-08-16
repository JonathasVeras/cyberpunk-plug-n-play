import React from "react";
import WeaponsList from "../../components/GenericModal/WeaponsList/WeaponsList";

const Weapons: React.FC = () => {
    return (
        <>
            <div className="bg-[url('../wallpapers/weapons-list-wallpaper.jpg')] bg-cover bg-center bg-fixed min-h-screen text-white">
                <WeaponsList />
            </div>
        </>
    )
}

export default Weapons;