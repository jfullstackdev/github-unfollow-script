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
    node unfollow.js
    ```

I tested it in one run, up to 4K it can scan 
but will take few minutes, so better be sure you have stable connection
and I did not hit the rate limit that time. Enjoy !
