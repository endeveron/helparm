'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/store';
import { IOffer, IOfferFormData } from 'features/offers/types';
import { useFetch } from 'hooks/useFetch';
import { Button } from 'components';
import { OfferForm } from 'features/offers/components/OfferForm/OfferForm';
import { addOfferToStore } from 'features/offers/utils';
import { selectOfferList } from 'features/offers/store';

import './CreateOfferClient.scss';
import { Heading } from 'components/Heading';

const CreateOfferClient = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const offers = useAppSelector(selectOfferList);
  const { data } = useSession();
  const userId = data?.user.id;
  const userName = data?.user.name;

  const [isSuccess, setIsSuccess] = useState(false);

  const [createOffer, isLoading] = useFetch<IOffer>();

  const configureDataForRequest = (data: IOfferFormData) => {
    if (!data) throw new Error('Помилка отримання даних форми');
    if (!userId || !userName) throw new Error('Ви не авторизовані');

    // Add phones to an array
    let phones: string[] = [data.phone];
    if (data?.phone2) phones.push(data.phone2);
    // Remove spaces
    phones = phones.map((phone) => phone.replace(/\s/g, ''));

    // Configure the offer object
    const reqData: IOffer = {
      author: {
        _id: userId as string,
        name: userName as string,
      },
      content: {
        title: data.title,
        text: data.textarea,
      },
      category: data.category,
      contacts: {
        phones,
      },
    };

    return reqData;
  };

  const handleSubmit = async (offerFormData: IOfferFormData) => {
    const offerData = configureDataForRequest(offerFormData);
    const { data, error } = await createOffer('/api/offers', {
      method: 'POST',
      body: JSON.stringify({ offerData }),
    });

    if (error) console.error(error);
    const success = !!data?._id;
    setIsSuccess(success);
    if (success) {
      addOfferToStore({ newOffer: data, offers, dispatch });
    }
  };

  const successContent = (
    <div className="create-offer__success">
      <div className="create-offer__success__title">Створено!</div>
      <div className="create-offer__success__message">
        Ваше оголошення успішно долучене до бази.
      </div>
      <Button
        className="create-offer__success__button"
        onClick={() => router.push('/offers')}
      >
        Перейти до оголошень
      </Button>
    </div>
  );

  return (
    <div className="create-offer anim">
      {isSuccess && successContent}
      {!isSuccess && (
        <>
          <Heading as="h1" className="create-offer__title view-title">
            Нове оголошення
          </Heading>
          <OfferForm
            isLoading={isLoading}
            onSubmitted={handleSubmit}
            isSuccess={isSuccess}
          />
        </>
      )}
    </div>
  );
};

export { CreateOfferClient };
