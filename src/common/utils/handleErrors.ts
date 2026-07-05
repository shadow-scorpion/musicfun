import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { errorToast } from '@/common/utils/errorToast.ts';
import { isErrorWithProperty } from '@/common/utils/isErrorWithProperty.ts';
import { isErrorWithDetail } from '@/common/utils/isErrorWithDetail.ts';
import { trimToMaxLength } from '@/common/utils/trimToMaxLength.ts';

export const handleErrors = (error: FetchBaseQueryError) => {
  switch (error.status) {
    case 'FETCH_ERROR':
    case 'PARSING_ERROR':
    case 'CUSTOM_ERROR':
    case 'TIMEOUT_ERROR':
      errorToast(error.error);
      break;
    case 404:
      if (isErrorWithProperty(error.data, 'error')) {
        errorToast(error.data.error);
      }
      break;
    case 429:
      if (isErrorWithProperty(error.data, 'message')) {
        errorToast(error.data.message);
      }
      break;
    case 400:
      if (isErrorWithDetail(error.data)) {
        const errorMessage = error.data.errors[0].detail;
        if (errorMessage.includes('refresh')) return;
        errorToast(trimToMaxLength(error.data.errors[0].detail));
      }
      break;
    case 403:
      if (isErrorWithDetail(error.data)) {
        errorToast(trimToMaxLength(error.data.errors[0].detail));
      }
      break;
    default:
      if (error.status >= 500 && error.status < 600) {
        errorToast('Server error occurred. Please try again later.');
      } else {
        errorToast('An unexpected error occurred');
      }
  }
};
