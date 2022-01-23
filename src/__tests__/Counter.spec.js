import { shallowMount } from '@vue/test-utils'
import Counter from '../Counter'
import store from '../store'


describe('Counter.vue component', () => {
    it('Sanity check', () => {
        expect(true).toBeTruthy()
    })
    
    const wrapper = shallowMount(Counter, {
        mocks: {
            $store: store
        }
    });

    describe('Exist Checks', () => {
        it('Component Exist Check', () => {
            expect(wrapper.exists()).toBeTruthy()
        })
        it('Increase button exist check', () => {
            expect(wrapper.find("#button-increase").exists()).toBeTruthy()
        })
        it('Decrease button exist check', () => {
            expect(wrapper.find("#button-decrease").exists()).toBeTruthy()
        })
    })
    describe('Functionality  Checks', () => {
        it('Increase button functionality check', async () => {
            const button = wrapper.find("#button-increase")
            await button.trigger('click');
            const countText = wrapper.find("#count-text");
            expect(countText.text()).toBe('1k')
        })
        it('Decrease button functionality check', async () => {
            const button = wrapper.find("#button-decrease")
            await button.trigger('click');
            const countText = wrapper.find("#count-text");
            expect(countText.text()).toBe('0k')
        })
        it('2 increase + decrease functionality check together', async () => {
            const increaseButton = wrapper.find("#button-increase")
            const decreaseButton = wrapper.find("#button-decrease")
            await increaseButton.trigger('click');
            await increaseButton.trigger('click');
            await decreaseButton.trigger('click');
            const countText = wrapper.find("#count-text");
            expect(countText.text()).toBe('1k')
        })
        it('Count text show check', async () => {
            const countText = wrapper.find("#count-text");
            expect(countText.isVisible())
        })
    })
})