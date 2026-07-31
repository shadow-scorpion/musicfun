import type { ZodType } from 'zod';
import { errorToast } from '@/common/utils/errorToast.ts';
import type { NamedSchemaError } from '@reduxjs/toolkit/query';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export const withZodCatch = <T extends ZodType>(schema: T) => {
  return {
    responseSchema: schema,
    catchSchemaFailure: (error: NamedSchemaError): FetchBaseQueryError => {
      errorToast('ZOD error. Details in the console.', error.issues);
      return {
        status: 'CUSTOM_ERROR',
        error: 'Schema validation failed',
      };
    },
  };
};
