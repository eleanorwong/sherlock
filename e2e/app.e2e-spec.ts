import { SherlockPage } from './app.po';

describe('sherlock App', function() {
  let page: SherlockPage;

  beforeEach(() => {
    page = new SherlockPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
