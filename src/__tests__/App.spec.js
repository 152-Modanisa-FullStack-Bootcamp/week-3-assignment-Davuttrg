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

        const statuses = [{ className: 'danger', count: 10 }, { className: 'normal', count: 5 }, { className: 'safe', count: 0 }]

        for (let entry of statuses) {
            it('getCount >= 10', () => {
                const wrapper = mountComponent(entry.count);
                const notificationArea = wrapper.find('.notificationArea');
                expect(notificationArea.attributes('class')).toContain(entry.className)
            })
        }
    })
    describe('notificationArea text message check', () => {
        const statuses = [
            { text: 'Danger!!! Case count is 10k', count: 10 },
            { text: 'Life is normal. Case count is 5k', count: 5 },
            { text: 'So safe. Case count is 0k', count: 0 }]

        for (let entry of statuses) {
            it('getCount >= 10', () => {
                const wrapper = mountComponent(entry.count);
                const notificationArea = wrapper.find('.notificationArea');
                expect(notificationArea.text()).toStrictEqual(entry.text)
            })
        }
    })
})