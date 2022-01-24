import { shallowMount } from '@vue/test-utils';
import Button from '@/components/app/Button.vue';

describe('Button', () => {
  it('renders button text', () => {
    const text = 'add link';
    const onClick = () => 1;
    const wrapper = shallowMount(Button, {
      propsData: { text, onClick }
    });
    expect(wrapper.text()).toMatch(text);
  });
});
