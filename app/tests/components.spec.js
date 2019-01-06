import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { SearchBarTest } from '../components/index.js';
import { queryAPI } from '../store/index.js';

describe('<SearchBar /> Component', () => {

    it('Has a handleSubmit() function that calls queryAPI', () => {
        const querySpy = sinon.spy(queryAPI)
        const wrapper = shallow(<SearchBarTest queryAPI={querySpy}/>);
        const instance = wrapper.instance();

        expect(instance.handleSubmit).to.be.a('function');
        instance.handleSubmit();
        expect(querySpy.calledOnce).to.equal(true);
    });
});