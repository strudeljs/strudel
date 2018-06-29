set -e
if [[ -z $CI_PULL_REQUEST ]] || [[ $CIRCLE_BRANCH = master ]]; then
  npm run build
  npm run test:unit
  cd sc-4.4.9-linux && ./bin/sc -u $SAUCE_USER -k $SAUCE_ACCESS_KEY -f ~/sauce_is_ready &
  while [ ! -e ~/sauce_is_ready ]; do sleep 1; done
  npm run test:sauce
  npm run test:cover
  npm run codecov
else
  npm run build
  npm run test
fi
