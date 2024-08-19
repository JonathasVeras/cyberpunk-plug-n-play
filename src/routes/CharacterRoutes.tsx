import { Routes, Route } from "react-router-dom"
import Characters from "../pages/Player/Characters/Characters"
import Character from "../pages/Player/Characters/Character/Character"
import NewCharacter from "../pages/Player/Characters/NewCharacter/NewCharacter"
import NewCharacter2 from "../pages/Player/Characters/NewCharacter/NewCharacter2";
import NewCharacter3 from "../pages/Player/Characters/NewCharacter/NewCharacter3";

export function CharacterRoutes() {
  return (
    <Routes>
      <Route>
        <Route index element={<Characters />} />
        <Route path=":id" element={<Character />} />
        <Route path="new-character" element={<NewCharacter />} />
        <Route path="new-character2" element={<NewCharacter2 />} />
        <Route path="new-character3" element={<NewCharacter3 />} />
      </Route>
    </Routes>
  );
}