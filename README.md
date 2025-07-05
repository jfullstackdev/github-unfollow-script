# GitHub Unfollow Script
auto unfollow script for those you follow but not following back on GitHub !

## Run With GitHub Codespaces
you can even simply do this on GitHub Codespaces

To run the script in GitHub Codespaces:

1. (optional) Fork the repository to your own GitHub account.
2. Open a GitHub Codespace:  
   - If you forked the repository, open it in GitHub Codespaces.
     The `unfollow.js` file should already exist.  
   - Otherwise, open any other Codespace.
     Create a new file named `unfollow.js` and paste the JavaScript code into it.
3. Open a terminal in Codespaces (View > Terminal).
4. Replace `'your_username'` and `'your_token_with_correct_permission'` in the
   script with your actual GitHub username and personal access token.
   - Get the correct token with the necessary permissions here:   
     https://github.com/settings/tokens/new?scopes=user:follow&description=Unfollow+Script+Token
5. in the terminal, to install the Octokit library, run
    ```
    npm install
    ```
   note: if you're using GitHub Codespaces, this step may have already been run automatically
6. run the script with 
    ```
    SCRIPT_USERNAME=your_username SCRIPT_TOKEN=your_token SCRIPT_LIMIT=2500 node unfollow.js
    ```
    (Change SCRIPT_LIMIT to your desired subset size. If not set, defaults to 1000.)

**Note:**
- The above one-line command works in Codespaces, as I tested it myself.
- On local Windows (Command Prompt or PowerShell), this command might not work as shown. 
If you are on Windows and encounter issues, it is highly 
encouraged to use GitHub Codespaces for a seamless experience.

## USE CASE

I tested it in one run—up to 4K users can be scanned, but it will take a
few minutes. Make sure you have a stable connection, and I did not hit
the rate limit during my tests. Enjoy!

You can safely process your following list in chunks (for example,
2,500 users at a time, running the script 4 times, or increasing the
limit to 10,000 to ensure none are left). This approach helps ensure
all non-followers are eventually unfollowed while keeping each run
fast and manageable.

This script is optimized for accounts with up to **25,000 following**
and **25,000 followers** (about 50,000 users total). It is safe and
efficient for these sizes on most modern systems.

**Recommended usage for best performance:**
- For faster runs and to avoid long waits, process your following list
  in chunks (e.g., 2,500–10,000 users per run).
- You can re-run the script multiple times with different random
  samples to ensure all non-followers are eventually unfollowed.
- Example: Run with a limit of 2,500 users, four times, or increase
  the limit to 10,000 for broader coverage per run.

**Note:**
- For much larger accounts (over 50,000 following or followers),
  consider using a more advanced version with persistent storage or
  batching.
- Always monitor for GitHub API rate limits if processing very large
  lists.
