import { mount } from '@vue/test-utils';
import App from '../../src/App.vue';

describe('App.vue', () => {
  it('should have .full-width class', () => {
    const app = mount(App);
    expect(app.classes()).toContain('full-width');
  });
});
