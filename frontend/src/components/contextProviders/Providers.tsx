import { createElement } from 'react';

interface ProvidersProps {
  contexts: React.ElementType[];
  children: React.ReactNode;
}

export default function Providers({ contexts, children }: ProvidersProps) {
  const createProviders = contexts.reduce(
    (prev: React.ReactNode, context: React.ElementType) =>
      createElement(context, {
        children: prev,
      }),
    children
  );

  return <>{createProviders}</>;
}
