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
  });
});
