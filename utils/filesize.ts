export default (size: number) => {
  const mult = Math.floor(Math.log(size) / Math.log(1024));
  const sizes = ['Б', 'Кб', 'Мб', 'Гб', 'Тб', 'Птб'];
  return [Math.round(size / 1024 ** mult * 100) / 100, sizes[mult]].join(' ');
};