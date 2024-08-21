import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { ICharacterSheet } from "../../../interfaces/characterSheet";
import { Link } from "react-router-dom";

interface CharacterDetails {
  age: number;
}

interface CharacterData {
  [key: string]: CharacterDetails;
}

interface SimpleCharacter {
  name: string;
  age: number;
}

const Characters: React.FC = () => {
  const { isAuthenticated, isOnline } = useAuth();
  const [localSheets, setLocalSheets] = useState<ICharacterSheet[]>([]);
  const [simpleSheets, setSimpleSheets] = useState<SimpleCharacter[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sheetToDelete, setSheetToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchSheets();
  }, [isAuthenticated, isOnline]);

  const fetchSheets = async () => {
    if (isAuthenticated && isOnline) {
      try {
        const response = await fetch(
          "https://cyberpunk-react-default-rtdb.firebaseio.com/fichas.json"
        );
        const data: CharacterData = await response.json();

        // Transforme o objeto em um array
        const sheetsArray: SimpleCharacter[] = Object.entries(data).map(
          ([name, details]) => ({
            name,
            age: details.age,
          })
        );

        setSimpleSheets(sheetsArray);
      } catch (error) {
        console.error("Error fetching online sheets:", error);
      }
    } else {
      // Fetch offline sheets
      const storedSheets = localStorage.getItem("CharacterSheetsOffline");
      if (storedSheets) {
        // Convert the stored object to an array
        const storedSheetsArray: ICharacterSheet[] = Object.values(
          JSON.parse(storedSheets)
        );
        setLocalSheets(storedSheetsArray);
      } else {
        setLocalSheets([]);
      }
    }
  };

  const deleteSheet = () => {
    if (sheetToDelete !== null) {
      const updatedSheets = localSheets.filter((_, i) => i !== sheetToDelete);
      setLocalSheets(updatedSheets);
      localStorage.setItem("CharacterSheetsOffline", JSON.stringify(updatedSheets));
      setShowModal(false);
      setSheetToDelete(null);
    }
  };

  const handleDeleteClick = (index: number) => {
    setSheetToDelete(index);
    setShowModal(true);
  };

  return (
    <div className="bg-[url('../wallpapers/characters-list-wp.png')] bg-cover bg-center bg-fixed min-h-screen">
      <div className="flex flex-col items-left">
        {/* Online Sheets Section */}
        <h1 className="text-[3rem] bg-black/50 text-gray-300 p-2 m-2 w-[300px] text-center rounded-lg">
          Online Sheets
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {simpleSheets.map((sheet, index) => (
            <Link to={`/characters/${index}`} key={sheet.name}>
              <div className="bg-black/80 text-gray-300 p-4 m-2 rounded-lg">
                <h2>{sheet.name}</h2>
                <p>Age: {sheet.age}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Offline Sheets Section */}
        <h1 className="text-[3rem] bg-black/50 text-gray-300 p-2 m-2 w-[300px] text-center rounded-lg">
          Offline Sheets
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {localSheets.map((sheet, index) => (
            <div key={sheet.name} className="bg-black/80 text-gray-300 p-4 m-2 rounded-lg relative">
              <h2>{sheet.name}</h2>
              <p>Age: {sheet.age}</p>
              <button
                onClick={() => handleDeleteClick(index)}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg"
              >
                Delete
              </button>
              <Link to={`/characters/local-${index}`} className="block mt-2 text-blue-400">
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* Modal Confirmation */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
              <p>Are you sure you want to delete this character sheet?</p>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-black p-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteSheet}
                  className="bg-red-600 text-white p-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Characters;
