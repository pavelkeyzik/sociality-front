import { SocialityPage } from './app.po';

describe('sociality App', function() {
  let page: SocialityPage;

  beforeEach(() => {
    page = new SocialityPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
