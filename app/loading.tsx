'use client';

import useColorMode from '@/hooks/useColorMode';
import { Loader } from '@/views/common/Loader';

export default function Loading() {
  const [colorMode] = useColorMode();
  return <Loader colorMode={colorMode} />;
}
