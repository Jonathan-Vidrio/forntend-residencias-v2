'use client';

import { useState } from 'react';
import { CustomInput } from './custom-input';
import { SearchIcon } from 'lucide-react';
import { CustomButton } from './custom-button';

interface Props {
  withSearchButton?: boolean;
  className?: string;
  onSearch: (value: string) => void;
  onReset: () => void;
}

export const Search = ({ withSearchButton = true, className, onSearch, onReset }: Props) => {
  const [search, setSearch] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    onSearch(value); // Llamar a onSearch mientras el usuario escribe
  };

  const handleReset = () => {
    setSearch('');
    onReset();
  };

  return (
    <div className='flex gap-x-2'>
      <CustomInput className={className} value={search} onChange={handleChange} />

      {withSearchButton && (
        <div style={{ width: 'auto' }}>
          <CustomButton>
            <SearchIcon />
          </CustomButton>
        </div>
      )}
    </div>
  );
};
