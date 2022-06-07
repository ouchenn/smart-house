import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  constructor(private activatedroute: ActivatedRoute) {}
  image1: string = './src/assets/images/pfkeby.jpg';
  device: Device | any = {};
  idDEive: any;
  addButton = false;
  ngOnInit(): void {
    this.getINfos();
  }
  getINfos() {
    this.activatedroute.paramMap.subscribe((params) => {
      this.device.id = params.get('id');
      this.device.nom = params.get('nom');
      this.device.floor = params.get('floor');
      this.device.room = params.get('room');
      this.device.status = params.get('status');
    });
  }

  getBoolean(value: any) {
    switch (value) {
      case true:
      case 'true':
      case 1:
      case '1':
      case 'on':
      case 'yes':
        return true;
      default:
        return false;
    }
  }
}
