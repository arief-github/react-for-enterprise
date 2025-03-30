import BussinessCardForm from '@/components/BussinessCard/BussinessCardForm';
import BussinessCardPreview from '@/components/BussinessCard/BussinessCardPreview';
import React, { useState } from 'react';

type BussinessCardState = {
  avatarFile?: File | null;
  name: string;
  phoneNumber: string;
  description: string;
  address: string;
};

const BussinessCard = () => {
  const [avatarPreview, setAvatarPreview] = useState('');

  const [form, setForm] = useState<BussinessCardState>({
    avatarFile: null,
    name: '',
    phoneNumber: '',
    description: '',
    address: '',
  });

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setForm((state) => ({
      ...state,
      avatarFile: file,
    }));

    if (!file) {
      setAvatarPreview('');
      return;
    }

    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        const avatarPreview = reader.result as string;
        setAvatarPreview(avatarPreview);
      },
      false
    );

    reader.readAsDataURL(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='p-8 container mx-auto grid grid-cols-2 gap-8'>
      <BussinessCardForm
        onFileUpload={onFileUpload}
        onInputChange={onInputChange}
        name={form.name}
        phoneNumber={form.phoneNumber}
        description={form.description}
        address={form.address}
      />
      <BussinessCardPreview
        avatar={avatarPreview}
        name={form.name}
        phoneNumber={form.phoneNumber}
        description={form.description}
        address={form.address}
      />
    </div>
  );
};

export default BussinessCard;
