export interface CreateTicketDto {
  title: string;
  description: string | null;
  contactInfo: string;
  status: string;
}
export interface ITicket extends CreateTicketDto {
  id: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateTicketDto extends Partial<ITicket> {
  newOrder: number;
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
