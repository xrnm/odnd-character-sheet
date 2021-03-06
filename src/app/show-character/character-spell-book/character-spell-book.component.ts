import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../character";
import {Spell} from "../../spell";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {SpellDialogComponent} from "./spell-dialog/spell-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {GameService} from "../../game.service";

@Component({
  selector: 'character-spell-book',
  templateUrl: './character-spell-book.component.html',
  styleUrls: ['./character-spell-book.component.sass']
})
export class CharacterSpellBookComponent implements OnInit {
  @Input() character: Character;
  constructor(public dialog: MatDialog, private gameService: GameService) { }

  ngOnInit(): void {
  }

  spellContainingBlocks(){
    return [...this.character.getAllMagicUserBlocks(), ...this.character.getAllClericBlocks()]
  }
  openSpellDialog(spellbook, spell, level){
    if(this.gameService.lock)
      return;
    const dialogRef = this.dialog.open(SpellDialogComponent,{
      data: {
        spellbook: spellbook,
        spell: spell,
        level: level
      }
    });
  }

  removeSpell(block, spell){
    block.spellbook.removeSpell(spell);
  }

  memorizeSpell(block, spell){
    block.spells[spell.level-1].insert(spell);
  }
  drop(event: CdkDragDrop<Spell[]>){
    if(this.gameService.lock)
      return;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
