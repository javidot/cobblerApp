import { CobblerAppPage } from './app.po';

describe('cobbler-app App', () => {
  let page: CobblerAppPage;

  beforeEach(() => {
    page = new CobblerAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
