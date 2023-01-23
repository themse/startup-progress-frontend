import { FC } from 'react';

import { BaseLayout } from 'components/layout/BaseLayout';
import { Container } from 'components/Container';
import { ProgressSteps } from 'app/components/progress-steps';
import { AlertProvider } from 'context/alert';

const App: FC = () => {
  return (
    <AlertProvider>
      <BaseLayout>
        <Container>
          <div className="flex justify-center">
            <ProgressSteps />
          </div>
        </Container>
      </BaseLayout>
    </AlertProvider>
  );
};

export default App;
