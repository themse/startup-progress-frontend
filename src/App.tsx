import { FC } from 'react';

import { BaseLayout } from 'components/layout/BaseLayout';
import { Container } from 'components/Container';
import { ProgressSteps } from 'app/components/progress-steps';

const App: FC = () => {
  return (
    <BaseLayout>
      <Container>
        <div className="flex justify-center">
          <ProgressSteps />
        </div>
      </Container>
    </BaseLayout>
  );
};

export default App;
