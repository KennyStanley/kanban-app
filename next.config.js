module.exports = {
  reactStrictMode: false, 
  // Setting reactStrictMode: true, breaks react-beautiful-dnd
  // Apparently enabling strict mode causes multiple renders and it just isn't SSR friendly.
  // https://github.com/atlassian/react-beautiful-dnd/issues/1617#issuecomment-574888366
}
