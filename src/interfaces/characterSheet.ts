import { ICyberware } from "./ICyberware";
import { Weapon } from "./IWeapon";

export interface IAttributes {
  acceptance: number;
  agility: number;
  selfControl: number;
  blocking: number;
  fighting: number;
  body: number;
  destiny: number;
  dexterity: number;
  empathy: number;
  dodge: number;
  faith: number;
  focus: number;
  strength: number;
  humanity: number;
  intelligence: number;
  intimidation: number;
  hacking: number;
  leadership: number;
  narrative: number;
  protection: number;
  endurance: number;
  wisdom: number;
  seduction: number;
  luck: number;
  invasion: number;
  block: number,
  fight: number,
}

export interface ICharacterSheet {
  background: string;
  attributes: IAttributes;
  difficultTerrainMovement: number;
  run: number;
  woundedAndOverloaded: number;
  userId: string;
  age: string;
  identity: number;
  movement: number;
  name: string;
  passivePerception: number;
  maxWeight: number;
  tokenHealthPoints: number;
  damageReduction: number;
  maxSanity: number;
  gender: string;
  baseSpeed: number;
  maxHealth: number;
  weapons: Weapon[];
  cyberware: ICyberware[];
}
