import { Component, OnInit, Input } from '@angular/core';
import {ExperienceBlock} from "../../experience-block";
import {Experience} from "../../experience";

@Component({
  selector: 'adventure-log-experience-blocks',
  templateUrl: './experience-blocks.component.html',
  styleUrls: ['./experience-blocks.component.sass']
})
export class ExperienceBlocksComponent implements OnInit {
  @Input() blocks: ExperienceBlock[];
  constructor() { }

  ngOnInit(): void {
  }

  addExperience(block: ExperienceBlock){

  }
  deleteExperience(experience: Experience, block: ExperienceBlock){

  }

}
