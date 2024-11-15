'use client';

import { useUiStore } from '@/store';
import { CustomButton } from './custom-button';
import { useRouter } from 'next/navigation';

interface Props {
  isActivated?: boolean;
  href?: string;
  canUpdate?: boolean;
  canDelete?: boolean;
  handleDelete?: () => void;
}

export const ActionsDetails = ({ isActivated, href, canUpdate, canDelete, handleDelete }: Props) => {
  const { showLoading } = useUiStore(state => state);

  const router = useRouter();

  return (
    <div className='space-y-5'>
      {canDelete && (
        <CustomButton color={isActivated ? '' : 'red'} onClick={handleDelete}>
          {isActivated ? 'Activate' : 'Delete'}
        </CustomButton>
      )}

      {canUpdate && !isActivated && href && (
        <CustomButton
          onClick={() => {
            router.push(href);
            showLoading();
          }}
        >
          Update
        </CustomButton>
      )}
    </div>
  );
};
