export class AppointmentConflictException extends Error {
  readonly doc: number;
  readonly appointmentDate: Date;

  constructor(doc: number, date: Date) {
    super(`Conflicto: ${doc} ya tiene una cita en ${date.toISOString()}`);
    this.name = 'AppointmentConflictException';
    this.doc = doc;
    this.appointmentDate = date;
  }
}