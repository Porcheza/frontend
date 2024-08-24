export interface ITicket {
  id: number;
  title: string;
  description: string | null;
  contactInfo: string;
  status: string;
}
export interface Board {
  name: string;
  tickets: ITicket[];
}

export enum Status {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
}
