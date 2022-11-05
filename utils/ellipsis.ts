/**
 * 
 * @param s string
 * @param len length of the string
 * @returns cut string and place at the end '...' if it cutted
 */
const ellipsis = (s: string, len: number = 100): string => {
  return s.slice(0, len - 1) + (s.length > len ? '...' : '');
};
export default ellipsis;
