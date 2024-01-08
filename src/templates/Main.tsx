import type { ReactNode } from 'react';

interface IMainProps {
  meta?: ReactNode;
  children: ReactNode;
}

const Main = (props: IMainProps) => (
  <div>
    {props.meta}
    <main className="content p-2 text-xl">{props.children}</main>
  </div>
);

export { Main };
