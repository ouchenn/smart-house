import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private http: HttpClient) {}

  apiUrl = 'https://smarthousebackend.herokuapp.com/device/';
  // json-server --watch dbDevices.json --port 5000

  findAll() {
    return this.http.get<Device[]>(
      'https://smarthousebackend.herokuapp.com/device/'
    );
  }
  changeStatus(device: Device) {
    device.status = this.getinverse(device.status);
    return this.http.patch<Device>(
      `${this.apiUrl}${device.id}`,
      device.status
      //patch for update one element
      // status: this.getinverse(device.status),
    );
  }
  add(device: Device) {
    return this.http.post<Device>(this.apiUrl, device);
  }
  delete(id: number | undefined) {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
  update(device: Device) {
    return this.http.put<Device>(`${this.apiUrl}${device.id}`, device);
  }

  getinverse(value: any) {
    switch (value) {
      case 'ON':
        return 'OFF';
      case 'OFF':
        return 'ON';
      default:
        return 'ON';
    }
  }
}
