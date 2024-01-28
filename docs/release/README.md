## Creating a Release
- Checkout the `release` branch
- Get a pull from `develop`
```
git pull origin develop
```
- Change the version in `package.json` as per the release
- Raise a PR to `main`
  - In the PR description, only mention the PRs merged from the previous release
- After the PR is merged, update the `package.json` with the next dev version
- Checkout the `develop` branch
- Get a pull from `release` branch
- Create a tag with auto generated release notes
