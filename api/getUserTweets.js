const fetch = require('node-fetch');

const handler = async (req, res) => {
  const { userID } = req.query;
  const url = `https://api.twitter.com/2/users/${userID}/tweets?expansions=referenced_tweets.id&exclude=replies`;

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

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
