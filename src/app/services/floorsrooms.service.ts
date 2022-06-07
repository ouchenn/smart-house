import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Floor } from '../models/floor';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root',
})
export class FloorsroomsService {
  constructor(private http: HttpClient) {}

  apiUrlFloor = 'https://smarthousebackend.herokuapp.com/floor/';
  apiUrlRoom = 'https://smarthousebackend.herokuapp.com/room/';

  findfloors() {
    return this.http.get<Floor[]>(this.apiUrlFloor);
  }
  addfloors(floor: Floor) {
    return this.http.post<Floor>(this.apiUrlFloor, floor);
  }
  deletefloors(id: number | undefined) {
    return this.http.delete(`${this.apiUrlFloor}/${id}`);
  }
  updatefloors(floor: Floor) {
    return this.http.put<Floor>(`${this.apiUrlFloor}/${floor.id}`, floor);
  }
  findromms() {
    return this.http.get<Room[]>(this.apiUrlRoom);
  }
  addromms(room: Room) {
    return this.http.post<Room>(this.apiUrlRoom, room);
  }
  deleteromms(id: number | undefined) {
    return this.http.delete(`${this.apiUrlRoom}/${id}`);
  }
  updateromms(room: Room) {
    return this.http.put<Room>(`${this.apiUrlRoom}/${room.id}`, room);
  }
}
