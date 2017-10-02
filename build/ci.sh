set -e
if [[ -z $CI_PULL_REQUEST ]] && [[ $CIRCLE_BRANCH = master ]]; then
  npm run build
  npm run test:cover
  npm run codecov
else
  cd sc-*-linux && ./bin/sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -f ~/sc_ready &
  while [ ! -e ~/sc_ready ]; do sleep 1; done
  npm test:unit
  npm test:sauce
fi
