import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date) => {
  return format(new Date(date), 'MMM d, yyyy');
};

export const formatRelativeDate = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}; 