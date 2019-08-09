import { Controller } from 'stimulus';
import ActionCable from 'actioncable';
import CableReady from 'cable_ready_client';

let timeout;
let wait = 25;

CableReady.App = ActionCable.createConsumer();
CableReady.App.cable = ActionCable.createConsumer();
CableReady.App.subscription = App.cable.subscriptions.create(
  'StimulusReflex::Channel',
  {
    received: data => {
      if (data.cableReady) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          CableReady.perform(data.operations);
        }, wait);
      }
    },
  }
);

class StimulusReflexController extends Controller {
  stimulate() {
    clearTimeout(timeout);
    let args = Array.prototype.slice.call(arguments);
    let target = args.shift();
    CableReady.App.subscription.send({
      url: location.href,
      target: target,
      args: args,
    });
  }
}

export default {
  StimulusReflexController,
};
