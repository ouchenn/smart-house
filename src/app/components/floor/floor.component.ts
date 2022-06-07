import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Floor } from 'src/app/models/floor';
import { FloorsroomsService } from 'src/app/services/floorsrooms.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css'],
})
export class FloorComponent implements OnInit {
  constructor(
    private appComponent: AppComponent,
    private floorService: FloorsroomsService
  ) {}

  ngOnInit(): void {
    this.getALL();
  }
  addButton = true;
  modalForm: Floor = {};
  floorsList: Floor[] = [];
  editeIndex: number = 0;

  getALL() {
    this.floorService.findfloors().subscribe((floors) => {
      this.floorsList = floors;
    });
  }

  add() {
    this.floorService.addfloors(this.modalForm).subscribe((added) => {
      // spread operator
      this.floorsList = [added, ...this.floorsList];
    });
  }

  delete(id: number | undefined) {
    this.floorService.deletefloors(id).subscribe(() => {
      this.floorsList = this.floorsList.filter((ele) => ele.id != id);
    });
  }

  edite(floor: any, i: number) {
    this.modalForm = floor;
    this.addButton = false;
    this.editeIndex = i;
  }
  update() {
    this.floorService.updatefloors(this.modalForm).subscribe((Updated) => {
      this.addButton = true;
      this.floorsList[this.editeIndex] = Updated;
      this.modalForm = {};
    });
  }
  open(content: any) {
    this.appComponent.open(content);
  }
}
