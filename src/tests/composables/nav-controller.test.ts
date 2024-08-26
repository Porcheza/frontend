import { describe, expect, it } from 'vitest';
import NavController from '../../composables/nav-controller';

describe('Nav Controller', () => {
  it('Should be defined', () => {
    expect(NavController).toBeDefined();
    expect(NavController.isShowSidenav.value).toBeFalsy();
  });

  it('Should be show', () => {
    NavController.showSidebar();
    expect(NavController.isShowSidenav.value).toBeTruthy();
  });

  it('Should be hide', () => {
    NavController.hideSidebar();
    expect(NavController.isShowSidenav.value).toBeFalsy();
  });
});
