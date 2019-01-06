import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { SearchBarTest, SuggestionTest } from '../components/index.js';
import { Button } from 'react-bootstrap';
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

describe('<Suggestion /> Component', () => {
    it('Renders one react-bootstrap button', () => {
        const wrapper = shallow(<SuggestionTest />);
        expect(wrapper.find(Button)).to.have.lengthOf(1);
    });

    it('Has an onClick() method that calls queryAPI', () => {
        const querySpy = sinon.spy(queryAPI)
        const wrapper = shallow(<SuggestionTest queryAPI={querySpy}/>);
        wrapper.find(Button).simulate('click');
        expect(querySpy.calledOnce).to.equal(true);
    });
});
