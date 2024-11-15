import { Service, ServiceType } from '@/interfaces';

export interface ServicesState {
  services?: Service[];
  history?: Service[];
  serviceTypes?: ServiceType[];

  setServices(services: Service[]): void;
  resetServices(): void;

  setHistory(history: Service[]): void;
  resetHistory(): void;

  setServiceTypes(servicesTypes: ServiceType[]): void;
  resetServiceTypes(): void;

  reset(): void;
}
