import Image from 'next/image';
import { memo } from 'react';

const TechnologyItem = memo(({ src, alt, invert = false }: { src: string; alt: string; invert?: boolean }) => (
  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center p-3 hover:scale-110 transition-transform">
    <Image
      src={src}
      alt={alt}
      width={48}
      height={48}
      className={invert ? "invert" : ""}
      loading="lazy"
      quality={75}
    />
  </div>
));

TechnologyItem.displayName = 'TechnologyItem';

const firstRowTech = [
  { src: '/javascript.svg', alt: 'Javascript', invert: true },
  { src: '/next.svg', alt: 'Next.js', invert: true },
  { src: '/react.svg', alt: 'React' },
  { src: '/typescript.svg', alt: 'TypeScript' },
  { src: '/tailwind.svg', alt: 'TailwindCSS' },
  { src: '/nodejs.svg', alt: 'Node.js' }
];

const secondRowTech = [
  { src: '/python.svg', alt: 'Python' },
  { src: '/postgresql.svg', alt: 'PostgreSQL' },
  { src: '/git-scm.svg', alt: 'Git' },
  { src: '/docker.svg', alt: 'Docker' },
  { src: '/amazon_aws.svg', alt: 'AWS' }
];

function TechnologyStack() {
  return (
    <div className="relative optimize-animation">
      {/* First row - moving left */}
      <div className="flex space-x-8 mb-8 animate-scroll-left">
        <div className="flex space-x-8">
          {firstRowTech.map((tech) => (
            <TechnologyItem key={tech.alt} {...tech} />
          ))}
        </div>
        <div className="flex space-x-8">
          {firstRowTech.map((tech) => (
            <TechnologyItem key={tech.alt + '-dup'} {...tech} />
          ))}
        </div>
      </div>

      {/* Second row - moving right */}
      <div className="flex space-x-8 animate-scroll-right">
        <div className="flex space-x-8">
          {secondRowTech.map((tech) => (
            <TechnologyItem key={tech.alt} {...tech} />
          ))}
        </div>
        <div className="flex space-x-8">
          {secondRowTech.map((tech) => (
            <TechnologyItem key={tech.alt + '-dup'} {...tech} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(TechnologyStack);
