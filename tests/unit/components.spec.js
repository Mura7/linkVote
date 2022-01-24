import { shallowMount, mount } from '@vue/test-utils';
import Button from '@/components/app/Button.vue';
import sinon from 'sinon';

describe('Button', () => {
  it('renders button text', () => {
    const text = 'add link';
    const onClick = () => {};
    const wrapper = shallowMount(Button, {
      propsData: { text, onClick }
    });
    expect(wrapper.text()).toMatch(text);
  });

  it('button click', async () => {
    const onClick = sinon.stub();
    const wrapper = mount(Button, {
      propsData: { onClick }
    });

    await wrapper.trigger('click');
    expect(onClick.called).toBe(true);
  });
});
