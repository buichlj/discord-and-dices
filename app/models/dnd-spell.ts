// https://www.dnd5eapi.co/
export interface DndSpell {
    id: string;
    index: string;
    name: string;
    description: string[];
    higherLevel: string[];
    range: string;
    components: string[];
    material: string;
    ritual: boolean;
    duration: "Instantaneous";
    concentration: boolean;
    catstingTime: string;
    level: number;
    attackType: string;
    damage: Damage;
    school: Type;
    classes: Type[];
    subclasses: Type[];
    url: string;
}

export interface Type {
    index: string;
    name: string;
    url: string;
}

export interface Damage {
    damageType: Type;
    damageAtSlotLevel: {
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
    }
}