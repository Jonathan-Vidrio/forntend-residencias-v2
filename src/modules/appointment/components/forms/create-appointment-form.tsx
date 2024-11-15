'use client';

import { useAuthStore, useUiStore, useUsersStore, useVehiclesStore } from '@/store';
import { Appointment, User, Vehicle } from '@/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { appointmentSchema } from '../../schemas/appointment.schema';
import { fetchCreateAppointment, fetchGetAvailableDates } from '../../fetching/appointments';
import { Calendar, CustomButton, CustomInput, Select, SelectWithSearch } from '@/core';
import { AppointmentFormValues } from '../../types/appointment-form-values';
import { fetchGetUsers } from '@/modules/users/fetching/users';
import Link from 'next/link';
import { fetchGetVehicle, fetchGetVehicleByLicensePlate, fetchGetVehicles, fetchGetVehiclesByClient } from '@/modules/vehicles/fetching/vehicles';

export const CreateAppointmentForm = ({ className }: { className?: string }) => {
  const { user, permissions } = useAuthStore(state => state);
  const { vehicles } = useVehiclesStore(state => state);
  const { hideLoading } = useUiStore(state => state);
  const { users } = useUsersStore(state => state);

  const [availableDates, setAvailableDates] = useState<any[]>([]);

  const [showClients, setShowClients] = useState<boolean>(false);
  const [showVehicles, setShowVehicles] = useState<boolean>(false);

  const [clientsOptions, setClientsOptions] = useState<{ key: string; value: string }[]>([]);
  const [vehiclesOptions, setVehiclesOptions] = useState<{ key: string; value: string }[]>([]);

  const [selectedClient, setSelectedClient] = useState<User | null>();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>();

  const dropdownRefClients = useRef<HTMLDivElement>(null);
  const dropdownRefVehicles = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
  });

  const scheduleTime = useWatch({
    control,
    name: 'scheduleTime',
  });

  const loadData = async () => {
    try {
      if (!users && ['superAdmin', 'admin', 'receptionist'].some(role => permissions?.includes(role))) await fetchGetUsers();
      if (!vehicles || !vehicles.length) {
        if (['superAdmin', 'admin', 'receptionist'].some(role => permissions?.includes(role))) await fetchGetVehicles();
        if (user && user.client && user.client.id && ['client'].some(role => permissions?.includes(role)))
          await fetchGetVehiclesByClient(user?.client?.id);
      }

      if (['client'].some(role => permissions?.includes(role))) setSelectedClient(user?.client);

      const fetchedAvailableDate = await fetchGetAvailableDates(90);
      setAvailableDates(fetchedAvailableDate);
    } catch {}
  };

  const onSubmit = async (data: AppointmentFormValues) => {
    if (!selectedClient || !selectedVehicle) return;

    const appointmentData: Appointment = {
      scheduleDate: new Date(data.scheduleDate).toISOString(),
      scheduleTime: data.scheduleTime,
      client: {
        id: selectedClient?.client?.id,
      },
      vehicle: {
        id: selectedVehicle?.id,
      },
    };

    try {
      const appointment = await fetchCreateAppointment({ ...appointmentData });
      if (appointment) router.push(`/appointments/details/${appointment.id}`);
    } catch {}
  };

  // Handle clicks outside to close the filters
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRefClients.current && !dropdownRefClients.current.contains(event.target as Node)) {
      setShowClients(false);
    }
  };

  useEffect(() => {
    hideLoading();
  }, [hideLoading]);

  useEffect(() => {
    loadData();
  }, [permissions, user]);

  useEffect(() => {
    if (vehicles && selectedClient && !['client'].some(role => permissions?.includes(role))) {
      setVehiclesOptions(
        vehicles
          .filter(vehicle => vehicle.client?.id === selectedClient.client?.id)
          .map(vehicle => ({
            key: vehicle.licensePlate || '',
            value: `${vehicle.model?.brand?.description} - ${vehicle.model?.description}`,
          }))
      );
    } else if (vehicles) {
      setVehiclesOptions(
        vehicles.map(vehicle => ({
          key: vehicle.licensePlate || '',
          value: `${vehicle.model?.brand?.description} - ${vehicle.model?.description}`,
        }))
      );
    }
  }, [vehicles, selectedClient]);

  useEffect(() => {
    if (users) {
      setClientsOptions(
        users
          .filter(user => user.userType?.description === 'client' && user.client?.vehicles && user.client?.vehicles?.length > 0)
          .map(client => ({
            key: client.email || '',
            value: `${client.firstName} ${client.firstSurname} ${client.secondSurname}`,
          }))
      );
    }
  }, [users]);

  useEffect(() => {
    if (selectedClient) {
      reset({
        ...getValues(),
        client: `${selectedClient.firstName} ${selectedClient.firstSurname} ${selectedClient.secondSurname}`,
      });
    }
  }, [selectedClient]);

  useEffect(() => {
    if (selectedVehicle) {
      reset({
        ...getValues(),
        vehicle: `${selectedVehicle.licensePlate} - ${selectedVehicle.model?.brand?.description} ${selectedVehicle.model?.description}`,
      });
    }
  }, [selectedVehicle]);

  useEffect(() => {
    if (showClients) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          setShowClients(false);
        }
      });
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showClients]);

  if (['client'].some(role => permissions?.includes(role))) {
    if (!vehicles || !vehicles.length) {
      return (
        <div>
          <span>No vehicles found, </span>
          <Link href={'/vehicles/create'} className='text-blue-500 hover:underline'>
            register
          </Link>
          <span> a vehicle first</span>
        </div>
      );
    }

    if (!availableDates || !availableDates.length) {
      return (
        <div>
          <span>No available dates found, </span>
          <Link href={'/appointments'} className='text-blue-500 hover:underline'>
            try again later
          </Link>
        </div>
      );
    }
  }

  if (['superAdmin', 'admin', 'receptionist'].some(role => permissions?.includes(role))) {
    if (!users || !users.length) {
      return (
        <div>
          <span>No clients and workers found, </span>
          <Link href={'/users/create'} className='text-blue-500 hover:underline'>
            register
          </Link>
          <span> a user first</span>
        </div>
      );
    }

    if (!users.some(user => user.userType?.description === 'client')) {
      return (
        <div>
          <span>No clients found, </span>
          <Link href={'/users/create'} className='text-blue-500 hover:underline'>
            register
          </Link>
          <span> a client first</span>
        </div>
      );
    }

    if (!vehicles || !vehicles.length) {
      return (
        <div>
          <span>No vehicles found, </span>
          <Link href={'/vehicles/create'} className='text-blue-500 hover:underline'>
            register
          </Link>
          <span> a vehicle first</span>
        </div>
      );
    }

    if (
      !users.some(user => user.userType?.description === 'worker') &&
      !users.some(user => user.worker?.workerType?.description !== 'receptionist')
    ) {
      return (
        <div>
          <span>No workers and clients found, </span>
          <Link href={'/users/create'} className='text-blue-500 hover:underline'>
            register
          </Link>
          <span> a user first</span>
        </div>
      );
    }
  }

  return (
    <form className={`flex flex-col gap-y-5 ${className}`} onSubmit={handleSubmit(onSubmit)}>
      {clientsOptions.length > 0 && (
        <div>
          <div className='flex flex-row items-end gap-x-5'>
            <CustomInput className='w-full' label='Client' {...register('client')} disabled />

            <div ref={dropdownRefClients}>
              <CustomButton onClick={() => setShowClients(prev => !prev)}>
                <Search />
              </CustomButton>

              {showClients && (
                <div className='absolute right-0 w-1/2 flex self-center px-10 mt-3'>
                  <SelectWithSearch
                    className='w-full'
                    columns={['Email', 'Client']}
                    options={clientsOptions}
                    onSelect={(option: any) => {
                      const client = users?.find(user => user.email === option.key);
                      setSelectedClient(client);
                      setShowClients(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {errors.client && typeof errors.client.message === 'string' && <span className='text-red-500 text-sm'>{errors.client.message}</span>}
        </div>
      )}

      {vehiclesOptions.length > 0 && selectedClient && (
        <div>
          <div className='flex flex-row items-end gap-x-5'>
            <CustomInput className='w-full' label='Vehicle' {...register('vehicle')} disabled />

            <div ref={dropdownRefVehicles}>
              <CustomButton onClick={() => setShowVehicles(prev => !prev)}>
                <Search />
              </CustomButton>

              {showVehicles && (
                <div className='absolute right-0 w-1/2 flex self-center px-10 mt-3'>
                  <SelectWithSearch
                    className='w-full'
                    columns={['License Plate', 'Model']}
                    options={vehiclesOptions}
                    onSelect={async (option: any) => {
                      const vehicle = await fetchGetVehicleByLicensePlate(option.key);
                      setSelectedVehicle(vehicle);
                      setShowVehicles(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {errors.vehicle && typeof errors.vehicle.message === 'string' && <span className='text-red-500 text-sm'>{errors.vehicle.message}</span>}
        </div>
      )}

      {availableDates.length > 0 && (
        <div>
          <label className='mb-1 font-semibold text-sm'>Select a Date</label>
          <Calendar
            availableDates={availableDates}
            onSelectDate={date => {
              setValue('scheduleDate', date.toISOString());
              console.log(date.toISOString());
            }}
            startDate={new Date()}
            endDate={new Date(new Date().setDate(new Date().getDate() + 90))}
          />

          {errors.scheduleDate && typeof errors.scheduleDate.message === 'string' && (
            <span className='text-red-500 text-sm'>{errors.scheduleDate.message}</span>
          )}
        </div>
      )}

      <div>
        <Controller
          name='scheduleTime'
          control={control}
          render={({ field }) => (
            <Select
              label='Time'
              options={[
                { key: 'morning', value: 'Morning' },
                { key: 'afternoon', value: 'Afternoon' },
              ]}
              {...field}
            />
          )}
        />
        {errors.scheduleTime && typeof errors.scheduleTime.message === 'string' && (
          <span className='text-red-500 text-sm'>{errors.scheduleTime.message}</span>
        )}
      </div>

      <div>
        <CustomInput className='w-full' label='Description (optional)' {...register('description')} />
        {errors.description && typeof errors.description.message === 'string' && (
          <span className='text-red-500 text-sm'>{errors.description.message}</span>
        )}
      </div>

      <CustomButton type='submit'>Save</CustomButton>
    </form>
  );
};
