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

  describe('.find()', () => {
    it('accepts selector starting with > operator', () => {
      document.body.innerHTML = `
        <div id="parent">
          <div id="child">
            <div id="grandchild"></div>  
          </div>
        </div>
      `;

      expect(Element('#parent').find('> div')).toEqual(Element('#child'));
      expect(Element('#parent').find('> div > div')).toEqual(Element('#grandchild'));
    })
  });

  describe('.get()', () => {
    it('returns correct node', () => {
      document.body.innerHTML = `
        <div>First element</div>
        <div>Second element</div>
      `;

      expect(Element('div').get(0).innerHTML).toEqual('First element')
      expect(Element('div').get(1).innerHTML).toEqual('Second element')
      expect(Element('div').get().length).toEqual(2);
    });
  });

  describe('.index()', () => {
    it('returns correct index', () => {
      document.body.innerHTML = `<div>
      <span id="one"></span>
      <span id="two"></span>
      </div>`;

      expect(Element('div').index(Element('#one'))).toEqual(0);
      expect(Element('div').index(Element('#two').first())).toEqual(1);
      expect(Element('div').index(Element('#foo'))).toEqual(-1);
    });
  });

  describe('.off()', () => {
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
      element.trigger('click');

      expect(element.get(0)._e.click[0].providedHandler).toEqual(method);
      expect(spy).not.toHaveBeenCalled();
    });

    it('remove all events', () => {
      document.body.innerHTML = `
        <button>Button</button>
      `;
      const spyClick1 = jasmine.createSpy(),
        spyClick2 = jasmine.createSpy(),
        spyMouseover = jasmine.createSpy(),
        element = new Element('button');

      element.on('click', spyClick1);
      element.on('click', spyClick2);
      element.on('mouseover', spyMouseover);

      element.off();

      element.trigger('click');
      element.trigger('mouseover');

      expect(spyClick1).not.toHaveBeenCalled();
      expect(spyClick2).not.toHaveBeenCalled();
      expect(spyMouseover).not.toHaveBeenCalled();
      expect(Object.keys(element.get(0)._e).length).toEqual(0);
    });

    it('remove all click events', () => {
      document.body.innerHTML = `
        <button>Button</button>
      `;
      const spyClick1 = jasmine.createSpy(),
        spyClick2 = jasmine.createSpy(),
        spyMouseover = jasmine.createSpy(),
        element = new Element('button');

      element.on('click', spyClick1);
      element.on('click', spyClick2);
      element.on('mouseover', spyMouseover);

      element.off('click');

      element.trigger('click');
      element.trigger('mouseover');

      expect(spyClick1).not.toHaveBeenCalled();
      expect(spyClick2).not.toHaveBeenCalled();
      expect(spyMouseover).toHaveBeenCalled();
      expect(element.get(0)._e.click.length).toEqual(0);
      expect(element.get(0)._e.mouseover.length).toEqual(1);
    });

    it('remove eventListener given via delegation', () => {
      document.body.innerHTML = `
        <div>
            <button>Button</button>
        </div>
      `;
      const spyClick1 = jasmine.createSpy(),
        spyClick2 = jasmine.createSpy(),
        spyMouseover = jasmine.createSpy(),
        element = new Element('div');

      element.on('click', 'button', spyClick1);
      element.on('click', 'button', spyClick2);
      element.on('mouseover', spyMouseover);

      element.off('click', spyClick1);

      new Element('button').trigger('click'); //there is a delegation, so the target for click is a button, not the div itself.
      element.trigger('mouseover');

      expect(spyClick1).not.toHaveBeenCalled();
      expect(spyClick2).toHaveBeenCalled();
      expect(spyMouseover).toHaveBeenCalled();
      expect(element.get(0)._e.click.length).toEqual(1);
      expect(element.get(0)._e.mouseover.length).toEqual(1);
    });

  });
});
