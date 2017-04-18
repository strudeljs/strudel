set -e
if [[ -z $CI_PULL_REQUEST ]] && [[ $CIRCLE_BRANCH = master ]]; then
  npm run build
  npm run test
  npm run coverage
  npm run codecov
else
  npm test
fi
