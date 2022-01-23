import App from '../App'
import { mutations, actions } from '../store'
import { shallowMount } from '@vue/test-utils'


describe('App.vue component', () => {
    it('Sanity check', () => {
        expect(true).toBeTruthy()
    })

    const mountComponent = (count) => {
        const wrapper = shallowMount(App, {
            mocks: {
                $store: {
                    state: {
                        count
                    },
                    getters: {
                        getCount: count
                    },
                    mutations,
                    actions,
                }
            }
        });
        return wrapper
    }
    it('h1 exists', () => {
        const wrapper = mountComponent(0);
        const h1Element = wrapper.find('h1');
        expect(h1Element.exists()).toBeTruthy()
    })
    it('h1 text equals to `Daily Corona Cases in Turkey` check', () => {
        const wrapper = mountComponent(0);
        const h1Element = wrapper.find('h1');
        expect(h1Element.text()).toStrictEqual('Daily Corona Cases in Turkey')
    })
    describe('notificationArea class check based on `getCount` value', () => {
        it('getCount >= 10', () => {
            const wrapper = mountComponent(10);
            const notificationArea = wrapper.find('.notificationArea');
            expect(notificationArea.attributes('class')).toContain('danger')
        })
        it('getCount >= 5 && getCount < 10', () => {
            const wrapper = mountComponent(5);
            const notificationArea = wrapper.find('.notificationArea');
            expect(notificationArea.attributes('class')).toContain('normal')
        })
        it('getCount <5', () => {
            const wrapper = mountComponent(0);
            const notificationArea = wrapper.find('.notificationArea');
            expect(notificationArea.attributes('class')).toContain('safe')
        })
    })
    describe('notificationArea text message check', () => {
        it('getCount >= 10', () => {
            const wrapper = mountComponent(10);
            const notificationArea = wrapper.find('.notificationArea');
            expect(notificationArea.text()).toStrictEqual('Danger!!! Case count is 10k')
        })
        it('getCount >= 5 && getCount < 10', () => {
            const wrapper = mountComponent(5);
            const notificationArea = wrapper.find('.notificationArea');
            expect(notificationArea.text()).toStrictEqual('Life is normal. Case count is 5k')
        })
        it('notificationArea text message check', () => {
            const wrapper = mountComponent(0);
            const notificationArea = wrapper.find('.notificationArea');
            expect(notificationArea.text()).toStrictEqual('So safe. Case count is 0k')
        })
    })
})