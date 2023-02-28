import { test, expect } from '@playwright/test';
//import { USER_AGENT } from '../playwright.config';
const serverPath = 'http://localhost:4001';
const serverPathOpen =
  'https://jfgreffiertryplaywrighttestsds-jdng--4001.local-credentialless.webcontainer.io';

// if using custom test userAgent it works
// test.use({ userAgent: USER_AGENT });

// the bug
// when setting userAgent in options ('../playwright.config')
// we expect that the browser will get the user agent from options but it does not it uses /// the default one
test('User Agent from request api should equal User Agent from browser', async ({
  page,
  request,
}) => {
  // run request to server via playwright request api
  const apiResponse = await request.get(`${serverPath}/getMyUserAgent`);
  const userAgentApi = await apiResponse.json();

  let userAgentBrowser;
  // log the user agent from the browser request from
  page.on('request', (request) => {
    userAgentBrowser = { userAgent: request.headers()['user-agent'] };
  });
  // go to server with playwrite page goto
  await page.goto(serverPathOpen);

  console.log('user agent from request api');
  console.log(userAgentApi);
  console.log('user agent from browser');
  console.log(userAgentBrowser);
  expect(userAgentBrowser.userAgent).toEqual(userAgentApi.userAgent);
});
