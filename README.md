# StimulusReflex Client

JavaScript client for [StimulusReflex](https://github.com/hopsoft/stimulus_reflex)

## Usage

```html
<!-- app/views/pages/example.html.erb -->
<html>
<head></head>
  <body>
    <a href="#" data-controller="example" data-action="click->example#doStuff">Do Stuff</a>
  </body>
</html>
```

```javascript
// app/javascript/controllers/example_controller.js
import { Controller } from 'stimulus';
import { StimulusReflexController } from 'stimulus_reflex';

export default class extends StimulusReflexController {
  doStuff() {
    // trigger a server side reflex and a re-render
    this.stimulate('ExampleReflex#do_stuff', arg1, arg2, ...);
  }
}
```

```ruby
# app/reflexes/example_reflex.rb
class ExampleReflex < StimulusReflex::Reflex
  def do_stuff(arg1, arg2, ...)
    # computing...
  end
end
```
