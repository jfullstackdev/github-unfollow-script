(async () => {
  const { Octokit } = await import("@octokit/rest");
  // Read credentials from environment variables
  const username = process.env.SCRIPT_USERNAME;
  const token = process.env.SCRIPT_TOKEN;
  // Allow limit to be set via environment variable or default to 1000
  const limit = process.env.SCRIPT_LIMIT ? parseInt(process.env.SCRIPT_LIMIT, 10) : 1000;

  if (!username || !token) {
    console.error("Error: SCRIPT_USERNAME and SCRIPT_TOKEN must be set as environment variables.");
    process.exit(1);
  }
  if (isNaN(limit) || limit <= 0) {
    console.error("Error: SCRIPT_LIMIT must be a positive integer if set.");
    process.exit(1);
  }

  const octokit = new Octokit({ auth: token });

  const userInfo = await octokit.rest.users.getByUsername({ username });
  const totalFollowing = userInfo.data.following;
  const totalPages = Math.ceil(totalFollowing / 100);

  const pagesToFetch = Math.min(Math.ceil(limit / 100), totalPages);

  function getRandomPageNumbers(count, maxPage) {
    const set = new Set();
    while (set.size < count) {
      const rand = Math.floor(Math.random() * maxPage) + 1;
      set.add(rand);
    }
    return Array.from(set);
  }

  const randomPages = getRandomPageNumbers(pagesToFetch, totalPages);

  const following = [];
  for (const page of randomPages) {
    const res = await octokit.rest.users.listFollowingForUser({
      username,
      per_page: 100,
      page,
    });
    following.push(...res.data);
  }

  const followers = await octokit.paginate(octokit.rest.users.listFollowersForUser, { username });
  const followerSet = new Set(followers.map(f => f.login));

  let unfollowed = 0;
  for (const user of following) {
    if (!followerSet.has(user.login)) {
      console.log(`unfollowing: ${user.login}`);
      await octokit.rest.users.unfollow({ username: user.login });
      unfollowed++;
    }
  }

  console.log(`✅ unfollowed ${unfollowed} non-followers from a subset of ${limit}`);
})();
