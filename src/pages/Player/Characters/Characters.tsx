import React from "react";

const Characters: React.FC = () => {
  return (
    <>
      <div
        className="
        bg-[url('../wallpapers/characters-list-wp.png')] 
        bg-cover bg-center bg-fixed min-h-screen
        "
      >
        <div className="flex">
          <h1 className="text-[3rem] bg-black/50 text-gray-300 p-2 m-2 w-[300px] text-center rounded-lg ">
            Characters
          </h1>
        </div>
      </div>
    </>
  );
};

export default Characters;
