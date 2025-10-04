export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
  });
};

export const formatTime = (timeString: string): string => {
  return timeString.slice(0, 5);
};

