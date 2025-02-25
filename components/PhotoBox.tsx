import { ImageZoom } from 'nextra/components';
import bj from '@/public/about/bj.jpg';
import cq from '@/public/about/cq.jpg';
import hkStreet from '@/public/about/hk-filming.jpg';
import hk from '@/public/about/hk.jpg';
import westlake from '@/public/about/hz.jpg';
import nj00 from '@/public/about/nj-long.jpg';
import nj01 from '@/public/about/nj.jpg';
import sz from '@/public/about/sz.jpg';

const PhotoBox: React.FC = () => {
  const mainImg = {
    src: bj,
    alt: 'Beijing',
  };

  const gridImgs = [
    {
      src: hk,
      alt: 'HongKong',
    },
    {
      src: hkStreet,
      alt: 'HongKong Street',
    },
    {
      src: nj00,
      alt: 'Nanjing',
    },
    {
      src: nj01,
      alt: 'Nanjing',
    },
    {
      src: sz,
      alt: 'Suzhou',
    },
    {
      src: westlake,
      alt: 'Westlake',
    },
    {
      src: cq,
      alt: 'Chongqing',
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2">
      <ImageZoom
        priority={true}
        className="w-full h-full object-cover m-0"
        src={mainImg.src}
        alt={mainImg.alt}
        placeholder='blur'
      />

      <div className="w-full h-full grid grid-cols-3 gap-2 items-center">
        {gridImgs.map((img, index) => (
          <ImageZoom
            key={index}
            className="w-full h-full object-contain m-0"
            src={img.src}
            quality={85}
            placeholder='blur'
            alt={img.alt}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoBox;
