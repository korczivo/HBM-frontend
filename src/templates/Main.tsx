import type { ReactNode } from 'react';

interface IMainProps {
  meta?: ReactNode;
  children: ReactNode;
}

const Main = (props: IMainProps) => (
  <div>
    {props.meta}
    <main className="content py-5 text-xl">{props.children}</main>
  </div>
);

export { Main };
