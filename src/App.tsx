import { FC } from 'react';

import { BaseLayout } from 'components/layout/BaseLayout';
import { Container } from 'components/Container';

const App: FC = () => {
  return (
    <BaseLayout>
      <Container>
        <p>Hello World</p>
      </Container>
    </BaseLayout>
  );
};

export default App;
