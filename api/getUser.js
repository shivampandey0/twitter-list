const fetch = require('node-fetch');

const handler = async (req, res) => {
  const { username } = req.query;

  let url = `https://api.twitter.com/2/users/by?user.fields=profile_image_url&usernames=${username}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: process.env.TWITTER_BEARER_TOKEN,
      },
    });

    if (!response.ok) {
      res.status(response.status).json(response.statusText);
    }
    const data = await response.json();

    res.status(200).json(data.data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
