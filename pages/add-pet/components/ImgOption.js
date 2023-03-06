import React from 'react';
import style from 'styles/AddPet.module.scss';
import Image from 'next/image';

const ImgOption = React.forwardRef(({ item, field, width, ...props }, ref) => {
  const { onChange, value = '' } = field || {};
  return (
    <div
      className={`${value == item?.value ? style.active : ''} ${style.VisualOption}`}
      onClick={() => onChange(item?.value)}
      {...props}
      {...field}
    >
      <div className={`${value == item?.value ? 'block' : 'hidden'}`}>
        <Image
          src={item?.activeIconUrl}
          alt={item?.value}
          layout="fixed"
          width={width > 1280 ? 72 : 50}
          height={width > 1280 ? 72 : 50}
          priority
        />
      </div>
      <div className={`${value != item?.value ? 'block' : 'hidden'}`}>
        <Image
          src={item?.iconUrl}
          alt={item?.value}
          layout="fixed"
          width={width > 1280 ? 72 : 50}
          height={width > 1280 ? 72 : 50}
          priority
        />
      </div>
    </div>
  );
});

export default ImgOption;
