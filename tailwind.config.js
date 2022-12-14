module.exports = {
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./Error.{js,ts,vue}`,
    `./error.{js,ts,vue}`,
    `./entities/**/*.{vue,js,ts}`,
    `./widgets/**/*.{vue,js,ts}`,
    `./features/**/*.{vue,js,ts}`,
  ],
  darkMode: 'class',
  theme: {
    colors: {
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      info: 'rgb(var(--color-info) / <alpha-value>)',
      success: 'rgb(var(--color-success) / <alpha-value>)',
      warning: 'rgb(var(--color-warning) / <alpha-value>)',
      danger: 'rgb(var(--color-danger) / <alpha-value>)',
      white: '#fff',
      gray: '#E4E4E4',
      gray2: '#959595',
      gray3: '#202020',
      grayDark: '#222831',
      grayDarkContent: 'rgba(57, 62, 70, 1)',
      lightBg: '#F2F5FA',
      red: '#FF6B00',
      yellow: 'rgb(231 208 0 / <alpha-value>)',
    }
  },
}