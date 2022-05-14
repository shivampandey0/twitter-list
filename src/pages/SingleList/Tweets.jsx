import { Badge, Box, Container, Skeleton, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { useState, useEffect } from 'react';

export const Tweets = ({ id, username }) => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        try {
          const res = await fetch(`/api/getUserTweets?userID=${id}`);
          const data = await res.json();
          formatTweets(data);
        } catch (error) {
          throw new Error(error);
        }
      })();
    }
  }, [id]);

  const formatTweets = (data) => {
    let _tweets = [];
    const _tweetIds = [];

    data?.data.forEach((item) => {
      if (!Array.isArray(item.referenced_tweets)) {
        _tweets = [..._tweets, { type: 'tweet', ...item }];
        _tweetIds.push(item.id);
      }
    });

    data?.includes.tweets.forEach((item) => {
      if (!_tweetIds.includes(item.id)) {
        _tweets = [..._tweets, { type: 'retweet', ...item }];
      }
    });

    setTweets(_tweets);
    setLoading(false);
  };

  const openTweet = (tweetID) =>
    window.open(`https://twitter.com/${username}/status/${tweetID}`, '_blank');

  return (
    <Container maxW='full' minH='calc(100vh - 120px)' paddingY={2}>
      {loading ? (
        <Stack>
          <Skeleton minH='16vh' />
          <Skeleton minH='16vh' />
          <Skeleton minH='16vh' />
          <Skeleton minH='16vh' />
        </Stack>
      ) : tweets ? (
        tweets.map((tweet) => (
          <Box
            key={tweet.id}
            padding={4}
            marginY={4}
            borderRadius={8}
            borderBottomLeftRadius={0}
            border='1px solid'
            borderColor='blue.200'
            cursor='pointer'
            onClick={() => openTweet(tweet.id)}
            _hover={{ bg: 'blue.100' }}
          >
            <Text size='md' color='black'>
              {tweet.text}
              <Badge
                ml={4}
                colorScheme={tweet.type === 'tweet' ? 'green' : 'blue'}
              >
                {tweet.type}
              </Badge>
            </Text>
          </Box>
        ))
      ) : (
        <Text>Tweets not found</Text>
      )}
    </Container>
  );
};
