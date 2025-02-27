'use client';

import classNames from 'classnames';
import moment from 'moment';
import 'moment/dist/locale/uk';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { v4 as uid } from 'uuid';

import { Spacer } from 'components';
import { IOffer } from 'features/offers/types';
import { useFetch } from 'hooks/useFetch';
import CloseIcon from '/public/icons/ui/close.svg';
import RemoveIcon from '/public/icons/ui/delete.svg';
import DoneIcon from '/public/icons/ui/done.svg';
import PhoneIcon from '/public/icons/ui/call.svg';
import PersonIcon from '/public/icons/ui/person.svg';
import ProgressIcon from '/public/icons/ui/progress.svg';

import './OfferCard.scss';

interface OfferCardProps extends IOffer {
  onDeleted: (_id: string) => void;
}

const OfferCard = ({
  _id,
  category,
  author,
  contacts,
  content,
  updated,
  onDeleted,
}: OfferCardProps) => {
  const { data } = useSession();
  const userId = data?.user.id;
  const userRole = data?.user.role;

  // const [deleteOffer, { data: resData, isLoading, error, isSuccess }] =
  //   useDeleteOfferMutation();

  const [deleteOffer, isLoading] = useFetch<string>();

  const [showRemovePrompt, setShowRemovePrompt] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const date = moment(updated).locale('uk').fromNow();
  // Allow remove the offer only if user is ovner or admin
  const isUserOwner = author?._id === userId;
  const isAdmin = userRole && userRole.index > 2;
  const allowRemove = isUserOwner || isAdmin;

  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleRemoveIconClick = () => {
    if (!allowRemove) return;
    setShowRemovePrompt(true);
  };

  const handleRemoveAccept = async () => {
    if (!_id) return;
    const { data, error } = await deleteOffer(`api/offers?_id=${_id}`, {
      method: 'DELETE',
    });

    if (data === _id) {
      onDeleted(_id);
      setShowRemovePrompt(false);
    }

    if (error) {
      console.error('error', error);
    }
  };

  const handleRemoveCancel = () => {
    setShowRemovePrompt(false);
  };

  const acceptIcon = (
    <div
      className="offer-card__icon card-prompt__icon"
      onClick={handleRemoveAccept}
    >
      <DoneIcon />
    </div>
  );

  const cancelIcon = (
    <div
      className="offer-card__icon card-prompt__icon"
      onClick={handleRemoveCancel}
    >
      <CloseIcon />
    </div>
  );

  const phoneIcon = (
    <div className="offer-card__icon offer-card__icon--mr">
      <PhoneIcon />
    </div>
  );

  const personIcon = (
    <div className="offer-card__icon offer-card__icon--mr">
      <PersonIcon />
    </div>
  );

  const removeIcon = (
    <div className="offer-card__icon action" onClick={handleRemoveIconClick}>
      <RemoveIcon />
    </div>
  );

  const loadingEl = (
    <div className="offer-card__loading card-prompt__loading anim">
      <ProgressIcon className="anim--loading" />
    </div>
  );

  const contactsEl = isOpen && (
    <div className="offer-card__contacts">
      <div className="offer-card__phones">
        {phoneIcon}
        {contacts?.phones?.map((phone) => (
          <a
            className="offer-card__phone inline-link"
            href={`tel:${phone}`}
            key={uid()}
          >
            {phone}
          </a>
        ))}
      </div>
    </div>
  );

  const headerPromptEl = (
    <div className="offer-card__prompt card-prompt anim">
      {isLoading ? (
        loadingEl
      ) : (
        <>
          <div className="offer-card__prompt-question card-prompt__question">
            Видалити?
          </div>
          {acceptIcon}
          {cancelIcon}
        </>
      )}
    </div>
  );

  const headerContentEl = (
    <div className="offer-card__title anim" onClick={handleOpenClick}>
      {content.title}
    </div>
  );

  return (
    <div
      className={classNames('offer-card anim', {
        'offer-card--open': isOpen,
      })}
    >
      <div className="offer-card__content-box shadow--a">
        <div className="offer-card__content">
          <div className="offer-card__header">
            {showRemovePrompt && headerPromptEl}
            {!showRemovePrompt && headerContentEl}

            {allowRemove && !showRemovePrompt && (
              <div className="offer-card__toolbar">{removeIcon}</div>
            )}
          </div>

          <div className="offer-card__message" onClick={handleOpenClick}>
            {content.text}
          </div>
        </div>
        <Spacer />
        {contactsEl}
        <div className="offer-card__footer">
          {personIcon}
          <div className="offer-card__author-name">{author.name}</div>
          <Spacer />
          <div className="offer-card__date">{date}</div>
        </div>
      </div>
    </div>
  );
};

export { OfferCard };
