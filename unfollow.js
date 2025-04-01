(async () => {
  const { Octokit } = await import("@octokit/rest");

  const octokit = new Octokit({ auth: `your_token_with_correct_permission` });

  async function getPaginatedList(endpoint, params, limit) {
    const perPage = 100;
    let allItems = [];
    let page = 1;

    while (allItems.length < limit) {
      const currentPage = await octokit.rest.users[endpoint]({
        ...params,
        per_page: perPage,
        page: page,
      });

      allItems = allItems.concat(currentPage.data);

      if (currentPage.data.length < perPage || allItems.length >= limit) {
        break;
      }

      page++;
    }

    return allItems.slice(0, limit);
  }

  async function unfollowNonFollowers() {
    const username = 'your_username';

    const followers = await octokit.paginate(octokit.rest.users.listFollowersForUser, { username });
    const followerLogins = new Set(followers.map(user => user.login));

    const following = await getPaginatedList('listFollowingForUser', { username }, 1000);

    let unfollowedCount = 0;

    for (const user of following) {
      if (!followerLogins.has(user.login)) {
        console.log(`unfollowing: ${user.login}`);
        await octokit.rest.users.unfollow({ username: user.login });
        unfollowedCount++;
      }
    }

    console.log(`unfollowed ${unfollowedCount} users`);
  }

  unfollowNonFollowers().catch(console.error);
})();
