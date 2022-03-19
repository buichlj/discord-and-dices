import { DndSpell } from "../models/dnd-spell";
import { RequestService } from "../request-service/request.service";

export class SpellLookup {
    private readonly dndApiUrl = 'https://www.dnd5eapi.co/api/spells/';

    public async lookupSpell(spell: string): Promise<string> {
        let returnString = '';
        spell = spell.replace('$spell ', '').replace(' ', '-');

        try {
            let requestService = new RequestService();
            let apiSpell = await requestService.get(this.dndApiUrl + spell);
            let dndSpell = this.convertSpell(apiSpell);

            returnString = `${dndSpell.name}\n
            Range: ${dndSpell.range}     Components: ${dndSpell.components.join(', ')}\n
            Casting Time: ${dndSpell.catstingTime}     Consentration: ${dndSpell.concentration}\n
            Ritual: ${dndSpell.ritual}     Damage Type: ${dndSpell.damage.damageType.name}\n
            Classes: ${dndSpell.classes.map(x => x.name).join(', ')}    Subclasses: ${dndSpell.subclasses.map(x => x.name).join(', ')}\n
            School: ${dndSpell.school.name}\n
            ${dndSpell.description}\n
            ${dndSpell.higherLevel}`
        } catch (ex) {
            returnString = 'Something went wrong getting the spell.';
        }

        return returnString;
    }

    private convertSpell(apiSpell): DndSpell {
        let returnValue: DndSpell
        try {
            returnValue = apiSpell;
            returnValue.id = apiSpell._id;
            returnValue.description = apiSpell.desc;
            returnValue.higherLevel = apiSpell.higher_level;
            returnValue.catstingTime = apiSpell.casting_time;
            returnValue.attackType = apiSpell.attack_type;
            returnValue.damage.damageType = apiSpell.damage.damage_type;
            returnValue.damage.damageAtSlotLevel = apiSpell.damage.damage_at_slot_level;
        } finally {
            return returnValue;
        }

    }
}