import { Component, Input, OnInit } from '@angular/core';
import { Missing } from 'src/app/_models/missing';

@Component({
  selector: 'app-missing-card',
  templateUrl: './missing-card.component.html',
  styleUrls: ['./missing-card.component.css']
})
export class MissingCardComponent implements OnInit {
  @Input() missing: Missing;

  constructor() { }

  ngOnInit(): void {
  }

}
