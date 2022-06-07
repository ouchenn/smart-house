export interface Device {
  id?: number;
  nom?: string;
  status?: statusType | any;
  room?: string;
  floor?: string;
}

enum statusType {
  ON = 'ON',
  OFF = 'OFF',
}
