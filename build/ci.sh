set -e
if [[ -z $CI_PULL_REQUEST ]] && [[ $CIRCLE_BRANCH = master ]]; then
  npm run build
  npm run test
else
  npm test
fi
