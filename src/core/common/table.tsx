'use client';

import Link from 'next/link';
import { Spinner } from './spinner/spinner';
import { useUiStore } from '@/store';

interface Props {
  columns: { key: string; value: string }[];
  data: any[];
  details?: boolean;
  href?: string;
  isClient?: boolean;
  isWorker?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const Table = ({ columns, data, details = false, href, isClient = false, isWorker = false, isLoading = false, className }: Props) => {
  const { showLoading } = useUiStore(state => state);

  return (
    <div className={`w-full ${className}`}>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='border-b'>
            {columns.map(
              (column, index) =>
                column.value !== 'ID' &&
                column.value !== 'User ID' && (
                  <th key={index} className='text-center px-4 py-2'>
                    {column.value}
                  </th>
                )
            )}

            {details && <th className='text-center px-4 py-2'>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={columns.length + (details ? 1 : 0)} className='p-0'>
                <div className='w-full py-20 flex items-center justify-center'>
                  <Spinner />
                </div>
              </td>
            </tr>
          )}

          {!isLoading && !data.length && (
            <tr>
              <td colSpan={columns.length + (details ? 1 : 0)} className='text-center py-10'>
                No data available
              </td>
            </tr>
          )}

          {!isLoading &&
            data.length > 0 &&
            data.map((row, index) => (
              <tr key={index} className='border-b'>
                {columns.map(
                  column =>
                    column.value !== 'ID' &&
                    column.value !== 'User ID' && (
                      <td key={column.key} className='text-center p-3'>
                        {row[column.key] || '-'}
                      </td>
                    )
                )}

                {details && (
                  <td className='text-center p-3'>
                    <Link
                      href={
                        isClient || isWorker
                          ? `/users/${isClient || isWorker ? `${row['user.id']}` : href ? `${href}/${row.id}` : `details/${row.id}`}`
                          : href
                            ? `${href}/${row.id}`
                            : `details/${row.id}`
                      }
                      className='text-blue-500 hover:underline'
                      onClick={() => showLoading()}
                    >
                      Details
                    </Link>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
