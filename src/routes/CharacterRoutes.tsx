import { Routes, Route } from "react-router-dom"
import Characters from "../pages/Player/Characters/Characters"
import Character from "../pages/Player/Characters/Character/Character"
import NewCharacter from "../pages/Player/Characters/NewCharacter/NewCharacter"

export function CharacterRoutes() {
  return (
    <Routes>
      <Route>
        <Route index element={<Characters />} />
        <Route path=":id" element={<Character />} />
        <Route path="new-character" element={<NewCharacter />} />
      </Route>
    </Routes>
  )
}