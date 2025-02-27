import classNames from 'classnames';
import { useRouter } from 'next/navigation';

import AddIcon from '/public/icons/ui/add.svg';
import { Button } from 'components';

import './CreateOfferButton.scss';

interface CreateOfferButtonProps {
  isFloating?: boolean;
}

const CreateOfferButton = ({ isFloating }: CreateOfferButtonProps) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push('/offers/create')}
      className={classNames('create-offer-button anim--d125s shadow--b', {
        'create-offer-button--floating': isFloating,
      })}
    >
      <AddIcon />
      <div className="create-offer-button__tooltip-wrapper">
        <div className="create-offer-button__tooltip">Створити пропозицію</div>
      </div>
    </Button>
  );
};

export { CreateOfferButton };
