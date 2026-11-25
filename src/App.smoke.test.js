import { render, screen } from '@testing-library/react';
import App from './App';

// Brza provjera da se stranica uopće iscrtava (bez bijelog ekrana)
beforeAll(() => {
  window.matchMedia = window.matchMedia || (q => ({
    matches: false, media: q, addEventListener() {}, removeEventListener() {},
    addListener() {}, removeListener() {},
  }));
  window.ResizeObserver = window.ResizeObserver || class { observe() {} disconnect() {} unobserve() {} };
  window.scrollTo = () => {};
  Element.prototype.scrollIntoView = () => {};
});

test('početna stranica se iscrtava sa svim sekcijama', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /GeoPatrik/ })).toBeTruthy();
  expect(document.getElementById('postupak')).toBeTruthy();
  expect(document.getElementById('blog')).toBeTruthy();
  expect(document.getElementById('o-nama')).toBeTruthy();
});
