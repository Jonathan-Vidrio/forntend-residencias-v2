import { Client, User, UserType, Worker, WorkerType } from '@/interfaces';

export interface UsersState {
  users?: User[];
  userTypes?: UserType[];

  // workers
  workers?: Worker[];
  workerTypes?: WorkerType[];

  // clients
  clients?: Client[];

  setUsers: (users: User[]) => void;
  resetUsers: () => void;

  setUserTypes: (userTypes: UserType[]) => void;
  resetUserTypes: () => void;

  setWorkers: (workers: Worker[]) => void;
  resetWorkers: () => void;

  setWorkerTypes: (workerTypes: WorkerType[]) => void;
  resetWorkerTypes: () => void;

  setClients: (clients: Client[]) => void;
  resetClients: () => void;

  reset: () => void;
}
