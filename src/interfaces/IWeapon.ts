export interface Weapon {
    Category: string | null;
    Manufacturer: string | null;
    Name: string | null;
    WeaponSkill: string | null;
    Damage: string | null;
    AccuracyBonus: string | null;
    Magazine: string | null;
    RateOfFire: string | null;
    HandsRequired: number | null;
    Availability: string | null;
    Concealment: string | null;
    Quality: string | null;
    Cost: string | null;
    AdditionalInfo?: string | null;
    Description?: string | null;
}