export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateSimple = (dateString: string) => new Date(dateString).toLocaleDateString();
