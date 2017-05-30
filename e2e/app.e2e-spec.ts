import { BloggerPage } from './app.po';

describe('blogger App', () => {
  let page: BloggerPage;

  beforeEach(() => {
    page = new BloggerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
