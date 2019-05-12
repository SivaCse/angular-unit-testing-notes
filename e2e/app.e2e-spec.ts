import { UnitTestHomePage } from './app.po';

describe('unit-test-home App', () => {
  let page: UnitTestHomePage;

  beforeEach(() => {
    page = new UnitTestHomePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
