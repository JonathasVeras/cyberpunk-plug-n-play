import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { ICharacterSheet } from "../../../interfaces/characterSheet";
import { Link } from "react-router-dom";
import characterPic from "../../../../public/characterPic.jpg"; // Certifique-se de que o caminho está correto

interface CharacterDetails {
  age: any;
}

interface CharacterData {
  [key: string]: CharacterDetails;
}

interface SimpleCharacter {
  name: string | null;
  age: any;
}

const Characters: React.FC = () => {
  const { isAuthenticated, isOnline } = useAuth();
  const [localSheets, setLocalSheets] = useState<ICharacterSheet[]>([]);
  const [simpleSheets, setSimpleSheets] = useState<SimpleCharacter[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sheetToDelete, setSheetToDelete] = useState<number | null>(null);
  const [sheetDeleteName, setSheetDeleteName] = useState<string | null>(null);
  const [isOnlineSheet, setIsOnlineSheet] = useState<boolean | null>(null);

  useEffect(() => {
    fetchSheets();
  }, [isAuthenticated, isOnline]);

  const fetchSheets = async () => {
    if (isAuthenticated && isOnline) {
      const username = localStorage.getItem('username');
      try {
        const response = await fetch(
          "https://cyberpunk-react-default-rtdb.firebaseio.com/fichas.json"
        );
        const data: any = await response.json();

        const userSheets = Object.keys(data)
          .filter(key => data[key].userId === username)
          .reduce((result: any, key: any) => {
            result[key] = data[key];
            return result;
          }, {});

        console.log(userSheets)

        const sheetsArray = Object.entries(userSheets).map(
          ([name, details]: [any, any]) => ({
            name,
            age: details.age,
          })
        );

        setSimpleSheets(sheetsArray);
      } catch (error) {
        console.error("Error fetching online sheets:", error);
      }
    } else {
      const storedSheets = localStorage.getItem("CharacterSheetsOffline");
      if (storedSheets) {
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
    if (
      isOnlineSheet !== null &&
      (sheetToDelete !== null || sheetDeleteName !== null)
    ) {
      if (isOnlineSheet) {
        // Aqui você adicionaria a lógica para deletar a ficha online, por exemplo:
        // Lógica para deletar do Firebase

        const deleteUrl = `https://cyberpunk-react-default-rtdb.firebaseio.com/fichas/${sheetDeleteName}.json`;
        fetch(deleteUrl, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Erro na requisição DELETE: " + response.statusText
              );
            }
            return response.json();
          })
          .then(() => {
            console.log(`Ficha ${sheetDeleteName} removida com sucesso.`);
            alert(`Ficha ${sheetDeleteName} removida com sucesso.`);

            setSimpleSheets((prevSheets) =>
              prevSheets.filter((sheet) => sheet.name !== sheetDeleteName)
            );
          })
          .catch((error) => {
            console.error("Erro ao remover a ficha:", error);
          });
      } else {
        const updatedSheets = localSheets.filter((_, i) => i !== sheetToDelete);
        setLocalSheets(updatedSheets);
        localStorage.setItem(
          "CharacterSheetsOffline",
          JSON.stringify(updatedSheets)
        );
      }

      setShowModal(false);
      setSheetToDelete(null);
      setSheetDeleteName(null);
      setIsOnlineSheet(null);
      fetchSheets();
    }
  };

  const handleDeleteClick = (index: any, onOrOff: any, name: any) => {
    setIsOnlineSheet(onOrOff);
    console.log("isOnlineSheet: " + isOnlineSheet);

    if (onOrOff) {
      setSheetDeleteName(name);
      console.log("nome da ficha pra ser deletada: " + sheetDeleteName);
    } else {
      setSheetToDelete(index);
    }
    setShowModal(true);
  };

  return (
    <div className="bg-[url('../wallpapers/characters-list-wp.png')] bg-cover bg-center bg-fixed min-h-screen">
      <div className="p-6">
        <h1 className="text-4xl bg-black/50 text-gray-300 p-4 mb-6 w-full text-center rounded-lg shadow-lg">
          Online Sheets
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simpleSheets.map((sheet, index) => (
            <div
              key={sheet.name}
              className="bg-black/80 text-gray-300 p-6 rounded-lg shadow-lg relative overflow-hidden"
            >
              <img
                src={characterPic}
                alt="Character"
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-semibold mb-2">{sheet.name}</h2>
              <p className="text-gray-400">Age: {sheet.age}</p>
              <button
                onClick={() => handleDeleteClick(-1, true, sheet.name)}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg shadow-md"
              >
                Delete
              </button>
              <Link
                to={`/characters/${index}`}
                className="block mt-2 text-blue-400 underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        <h1 className="text-4xl bg-black/50 text-gray-300 p-4 mt-8 mb-6 w-full text-center rounded-lg shadow-lg">
          Offline Sheets
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localSheets.map((sheet, index) => (
            <div
              key={sheet.name}
              className="bg-black/80 text-gray-300 p-6 rounded-lg shadow-lg relative overflow-hidden"
            >
              <img
                src={characterPic}
                alt="Character"
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-semibold mb-2">{sheet.name}</h2>
              <p className="text-gray-400">Age: {sheet.age}</p>
              <button
                onClick={() => handleDeleteClick(index, false, "")}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg shadow-md"
              >
                Delete
              </button>
              <Link
                to={`/characters/local-${index}`}
                className="block mt-2 text-blue-400 underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

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
