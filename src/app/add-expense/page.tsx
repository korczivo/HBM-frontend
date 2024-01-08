import { SpendList } from '@/features/SpendList/components/SpendList';
import { Main } from '@/templates/Main';

const Home = () => {
  return (
    <Main>
      <SpendList isEditable />
    </Main>
  );
};

export default Home;
