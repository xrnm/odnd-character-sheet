import {Loadable} from "./loadable";
import {Container} from "./container";
import {Item} from "./item";
import {Purse} from "./purse";
import {ExperienceBlock} from "./experience-block";
import {HitDiceHelper} from "./hit-dice-helper";

export class Character implements Loadable {
  name: string;
  class: string;
  race: string;
  age: number;
  sex: string;
  profession: string;
  origin: string;
  alignment: string;
  height: number;
  weight: number;
  eye_color: string;
  hair_color: string;
  hair_style: string;
  hair_length: string;
  skin_color: string;
  base_movement: number;
  current_hp: number;
  total_hp: number;
  armor_class: number;
  helmet: boolean;
  shield: boolean;
  abilities: {
    strength: number,
    intelligence: number,
    wisdom: number,
    dexterity: number,
    constitution: number,
    charisma: number,
  };
  saving_throws: {
    system_shock: number,
    poison: number,
    paralysis: number,
    petrification: number,
    dragon_breath: number,
    spell: number
  };
  experience: ExperienceBlock[];
  purse: Purse;
  magic_items: Item[];
  known_languages: String[];
  weapons: Item[];
  armor: Item[];
  slung_items: Container[];
  appearance: string;
  clothing: string;
  quests: string;

  constructor(init?: Partial<Character>) {
    Object.assign(this, init);
    this.experience = init.experience.map((experience)=>new ExperienceBlock(experience));
    this.purse = new Purse(init.purse)
    this.weapons = init.weapons.map((item)=>new Item(item));
    this.magic_items = init.magic_items.map((item)=>new Item(item));
    this.armor = init.armor.map((item)=>new Item(item));
    this.slung_items = init.slung_items.map((item)=>new Container(item));
  }

  hitDice() {
    switch (this.class) {
      case 'Fighter':
        return HitDiceHelper.fighterHitDice(this.getLevel());
      case 'Cleric':
        return HitDiceHelper.clericHitDice(this.getLevel());
      case 'Magic User':
        return HitDiceHelper.magiCUserHitDice(this.getLevel());
      default:
        return {base: -1, bonus: -1}
    }
  }

  load(): number {
    return this.weapons.concat(this.armor)
        .reduce((acc, item) => {
          return acc + item.weight
        }, 0) +
      this.slung_items.reduce((acc, container) => {
        return acc + container.load()
      }, 0)
      + this.purse.load()
  }

  maximumLoad() {
    return this.abilities.strength * 150
  }

  movementRating() {
    const encumbrance = this.load() / this.maximumLoad();
    if (encumbrance <= 0.25)
      return this.base_movement * 2;
    else if (encumbrance <= 0.333)
      return this.base_movement * 1.5;
    else if (encumbrance <= 0.50)
      return this.base_movement;
    else if (encumbrance <= 1)
      return this.base_movement / 2;
    else if (encumbrance <= 2)
      return this.base_movement / 4;
    else
      return 0
  }

  toHit(): number {
    let modifier = 0;
    if (this.hitDice().bonus > 0)
      return this.hitDice().base + 1;
    else if (this.hitDice().bonus < 0)
      return this.hitDice().base - 1;
    else
      return this.hitDice().base
  }

  missileToHit(): number {
    let modifier = 0;
    return this.toHit() + modifier;
  }

  meleeToHit(): number {
    let modifier = 0;
    return this.toHit() + modifier;
  }

  primeAbility() {
    switch (this.class) {
      case 'Fighter':
        return 'strength';
      case "Magic User":
        return "intelligence";
      case "Cleric":
        return "wisdom";
    }
  }

  adjustedStrength(): number {
    let modifier = 0;

    if (this.class == 'Fighter')
      modifier += 1;

    return this.abilities.strength + modifier;
  }

  adjustedDexterity(): number {
    let modifier = 0;

    return this.abilities.dexterity + modifier;
  }

  adjustedConstitution(): number {
    let modifier = 0;

    return this.abilities.dexterity + modifier;
  }

  precisionThrownWeight(): number {
    return 10 * (this.adjustedStrength() / 2);
  }

  precisionThrownDistance(): number {
    return this.adjustedDexterity() * 10;
  }

  maximumLift(): number {
    return this.adjustedStrength() * 250
  }

  continuousTravel(): number {
    return this.adjustedConstitution() + this.getLevel();
  }

  holdBreath(): number {
    return (this.adjustedConstitution() + this.getLevel()) * 10;
  }

  continuousMaximumEffort(): number {
    return this.adjustedConstitution() + this.getLevel();
  }

  getLevel(): number{
      return this.experience.map((item) =>{return item.currentLevel();})
      .filter((item) => !isNaN(item))
      .reduce((item, max) => item > max ? item : max,-1);
  }


  static classes(){
    return ['Fighter', 'Cleric', 'Magic User'];
  }

}
