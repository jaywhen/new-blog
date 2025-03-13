import React, { useRef, useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import { ImageZoom } from 'nextra/components';
import bj from '@/public/about/bj.jpg';
import cq from '@/public/about/cq.jpg';
import hkStreet from '@/public/about/hk-filming.jpg';
import hk from '@/public/about/hk.jpg';
import westlake from '@/public/about/hz.jpg';
import nj01 from '@/public/about/nj.jpg';
import sz from '@/public/about/sz.jpg';
import ikea from '@/public/about/ikea.jpeg';
import stb from '@/public/about/star-bucks.jpg';
import dejiPlaza from '@/public/about/deji-plaza.jpg';
import hzEast from '@/public/about/hz-east.jpg';

interface ImageItem {
  src: StaticImageData;
  alt: string;
}

interface Props {
  mainImg?: ImageItem;
  gridImgs?: ImageItem[];
}

const PhotoBox: React.FC<Props> = () => {
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
    {
      src: ikea,
      alt: 'IKEA clock wall',
    },
    {
      src: stb,
      alt: 'Starbucks',
    },
    {
      src: hzEast,
      alt: 'Hangzhou east railway station',
    },
    {
      src: dejiPlaza,
      alt: 'Restroom of Deji Plaza',
    },
  ];

  const [columns, setColumns] = useState<ImageItem[][]>([[], [], []]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const columnCount = width < 560 ? 2 : 3;
        const newColumns: ImageItem[][] = Array(columnCount)
          .fill([])
          .map(() => []);

        gridImgs.forEach((img) => {
          const shortestColumn = newColumns.reduce(
            (prev, curr, i) =>
              curr.length < newColumns[prev].length ? i : prev,
            0
          );

          newColumns[shortestColumn].push(img);
        });

        setColumns(newColumns);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <ImageZoom
        priority={true}
        className="w-full h-full object-cover m-0"
        src={mainImg.src}
        alt={mainImg.alt}
        placeholder="blur"
      />

      <div
        ref={containerRef}
        className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4"
      >
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {column.map((img, imgIndex) => (
              <ImageZoom
                key={imgIndex}
                className="w-full h-auto object-cover m-0 shadow-md hover:shadow-xl transition-shadow duration-300"
                src={img.src}
                quality={85}
                placeholder="blur"
                alt={img.alt}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoBox;
