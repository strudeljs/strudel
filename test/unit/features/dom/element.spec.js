import Component from '../../../../src/decorators/component';
import Element from '../../../../src/dom/element';

describe('Element', () => {
  describe('.attr()', () => {
    it('returns attribute', () => {
      document.body.innerHTML = '<div title=\'Title\'></div>';

      expect(Element('div').attr('title')).toEqual('Title');
    });

    it('returns attribute for first in collection', () => {
      document.body.innerHTML = `<div>
        <span title='Span 1'></span>
        <span title='Span 2'></span>
        </div>`;

      expect(Element('div').find('span').attr('title')).toEqual('Span 1');
    });

    it('sets attribute', () => {
      document.body.innerHTML = '<div></div>';

      Element('div').attr('title', 'Title');
      expect(document.body.children[0].getAttribute('title')).toEqual('Title');
    });

    it('sets attributes for all in collection', () => {
      document.body.innerHTML = `<div>
        <span></span>
        <span></span>
        </div>`;

      Element('div').find('span').attr('title', 'Title');
      expect(document.querySelector('span:last-of-type').getAttribute('title')).toEqual('Title');
    });

    it('clears attribute', () => {
      document.body.innerHTML = '<div title=\'Title\'></div>';

      Element('div').attr('title', null);
      expect(document.body.children[0].hasAttribute('title')).toEqual(false);
    });

    it('returns correct node', () => {
      document.body.innerHTML = `
        <div>First element</div>
        <div>Second element</div>
      `;

      expect(Element('div').get(0).innerHTML).toEqual('First element')
      expect(Element('div').get(1).innerHTML).toEqual('Second element')
      expect(Element('div').get().length).toEqual(2);
    })
  });

  describe('events', () => {
    it('removes specific event callback', () => {
      document.body.innerHTML = `
        <button>Button</button>
      `;

      const method = () => 'method';
      const spy = jasmine.createSpy();
      const element = new Element('button');

      element.on('click', spy);
      element.on('click', method);
      element.off('click', spy);
      element.trigger('click')

      expect(element.get(0)._e.click[0][0]).toEqual('method');
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
