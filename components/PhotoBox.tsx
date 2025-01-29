import { ImageZoom } from 'nextra/components';

const PhotoBox: React.FC = () => {
  const mainImgInfo = {
    src: '/about/bj.jpg',
    alt: 'beijing.jpeg',
  };

  const subImgInfo = {
    src: '/about/hk.jpg',
    alt: 'hongkong',
  };

  const gridImgInfos = [
    {
      src: '/about/hk.jpg',
      alt: 'hongkong',
    },
    {
      src: '/about/hk-filming.jpg',
      alt: 'filming-store-hk',
    },
    {
      src: '/about/nj-long.jpg',
      alt: 'nanjing',
    },
    {
      src: '/about/nj.jpg',
      alt: 'nanjing',
    },
    {
      src: '/about/sz.jpg',
      alt: 'suzhou',
    },
    {
      src: '/about/hz.jpg',
      alt: 'hangzhou',
    },
    {
      src: '/about/cq.jpg',
      alt: 'chongqing',
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2">
      <ImageZoom
        className="w-full h-full object-cover m-0"
        src={mainImgInfo.src}
        alt={mainImgInfo.alt}
      />

      <div className="w-full h-full grid grid-cols-3 gap-2 items-center">
        {gridImgInfos.map((img) => (
          <ImageZoom
            className="w-full h-full object-contain m-0"
            src={img.src}
            alt={img.alt}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoBox;
