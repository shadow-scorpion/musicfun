export const isErrorWithDetail = (error: unknown): error is { errors: { detail: string }[] } => {
  if (typeof error !== 'object' || error === null) return false;
  if (!('errors' in error)) return false;

  const errors = (error as Record<string, unknown>).errors;
  if (!Array.isArray(errors) || errors.length === 0) return false;

  const firstError = errors[0];
  if (typeof firstError !== 'object' || firstError === null) return false;
  if (!('detail' in firstError)) return false;

  const detail = (firstError as Record<string, unknown>).detail;
  return typeof detail === 'string';
};
