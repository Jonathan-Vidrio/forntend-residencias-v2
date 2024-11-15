import { Status } from '@/interfaces';

export interface StatusesState {
  statuses?: Status[];

  setStatuses(statuses: Status[]): void;
  resetStatuses(): void;

  reset(): void;
}
