import { Post } from 'src/interfaces/post/post';

export const getFeed = async () => {
  const feed = [
    {
      id: 0,
      username: '@matheuscastroweb',
      tags: '#testvideo #reactnative #tiktok #git #development #github #clone #react',
      music: 'Introducing Chromecast. The easiest way to enjoy',
      likes: 9444,
      comments: 6340,
      uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    },
    {
      id: 1,
      username: '@matheuscastroweb2',
      tags: '#reactnative #testvideo #tiktok #git #development #github #clone #react',
      music: 'HBO GO now works with Chromecast',
      likes: 8411,
      comments: 2240,
      uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
  ];

  const posts: Post[] = feed.map((post) => {
    return {
      id: post.id.toString(),
      media: post.uri,
      likesCount: post.likes,
      commentsCount: post.comments,
      description: post.music,
      username: post.username,
    };
  });

  return posts;
};
