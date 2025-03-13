import dss from '@/public/about/dsshare.svg';
import hcReader from '@/public/about/hc-reader.png';
import Image from 'next/image';
import { useTheme } from 'nextra-theme-blog';

export default function Projects() {
  const { theme } = useTheme();

  const cards = [
    {
      icon: dss,
      title: 'DeepSeek Share',
      description:
        'A chrome extension that helps you export your DeepSeek chat list',
      link: 'https://chromewebstore.google.com/detail/deepseek-share/kdjdffoakknocbeicphnagoaidjembfd',
      width: 180,
      height: 26,
    },
    {
      icon: hcReader,
      title: 'Hacker News Reader',
      description: 'Just another Hacker News clone',
      link: 'https://hackernews-plum.vercel.app',
      width: 40,
      height: 40,
    },
  ];

  const onClickCard = (card) => {
    window.open(card.link, '_blank');
  };

  return (
    <div className="flex flex-col gap-4">
      {cards.map((card, index) => (
        <div
          onClick={() => onClickCard(card)}
          key={index}
          className={`flex flex-col items-start cursor-pointer transition ease-in-out delay-50 duration-300 ${
            theme === 'dark' && 'invert'
          } bg-white lg:hover:scale-105 rounded-lg p-4 lg:hover:-translate-y-1`}
        >
          <Image
            className="m-0"
            width={card.width}
            height={card.height}
            src={card.icon}
            alt={card.title}
          />
          <div className="font-semibold mt-2 text-slate-800">{card.title}</div>
          <div className="text-gray-600 text-sm">{card.description}</div>
        </div>
      ))}
    </div>
  );
}
