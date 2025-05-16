import { ReactNode } from 'react';

export type PropsWithChildren<T> = T & { children?: ReactNode };
