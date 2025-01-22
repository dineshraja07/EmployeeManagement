import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown',

  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  isClicked=false;
  isDownClicked=false;
  // isInactiveClicked=false;
  // isActiveClicked=true;
  @Input() activeFlag!:boolean;
  @Output() isChanged=new EventEmitter<boolean>();
  click()
  {
    this.isClicked=true;

  }
  downClick(){
    this.isClicked=false;
    console.log("down clickes...");

  }
  onActive(){
    // this.isInactiveClicked=false;
    // this.isActiveClicked=true;
    this.isClicked=false;
    // console.log(this.isActiveClicked ,this.isInactiveClicked);
    this.isChanged.emit(true);
  }
  onInActive(){
  //  this.isInactiveClicked=true;
   this.isClicked=false;
  //  this.isActiveClicked=false;
  //  console.log(this.isActiveClicked ,this.isInactiveClicked);
   this.isChanged.emit(false);
  }
}
