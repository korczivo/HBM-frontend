'use client';

interface ILoaderProps {
  colorMode?: string | ((arg: string) => void);
}

export const Loader = ({ colorMode }: ILoaderProps) => {
  return (
    <div
      className={`flex h-screen items-center justify-center ${colorMode === 'light' ? 'bg-white' : 'box-dark2'}`}
    >
      <div className="size-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" />
    </div>
  );
};
