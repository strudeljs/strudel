import { Component, DOMEvent } from 'quantum';

const URL = 'http://www.metaweather.com/api/location/';

@Component({
  selector: '.weather'
})
class Weather {
  constructor(element, props) {
    this.element = element;
    this.url = URL + props.location;
  }

  @DOMEvent('click .weather-refresh')
  refresh() {
    fetch(this.url).then((response) => {
      response.json().then((data) => {
        this.element.find('.weather-info').html(`
          <h1>${data.title}</h1>
          <h2>${data.consolidated_weather[0].the_temp.toFixed(2)}</h2>`
        );
      })
    })
  }
}
