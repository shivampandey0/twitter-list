const openProfile = (username) =>
  window.open(`https://twitter.com/${username}`, '_blank');

const openGithub = () =>
  window.open(`https://github.com/shivampandey0`, '_blank');

const openTwitter = () =>
  window.open(`https://twitter.com/ErShivamPandey`, '_blank');

const testUser = { email: 'pandeyshivam1312@gmail.com', password: '12345678' };

export { openProfile, openGithub, openTwitter, testUser };
