import { Controller } from 'stimulus';
import ActionCable from 'actioncable';
import CableReady from 'cable_ready_client';

let timeout;
let wait = 25;

CableReady.App = window.App || {};
CableReady.App.cable = CableReady.App.cable || ActionCable.createConsumer();
CableReady.App.stimulusReflexChannel =
  CableReady.App.stimulusReflexChannel ||
  CableReady.App.cable.subscriptions.create('StimulusReflex::Channel', {
    received: data => {
      if (data.cableReady) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          CableReady.perform(data.operations);
        }, wait);
      }
    },
  });

export default {
  register: controller => {
    Object.assign(controller, {
      stimulate() {
        clearTimeout(timeout);
        let args = Array.prototype.slice.call(arguments);
        let target = args.shift();
        CableReady.App.stimulusReflexChannel.send({
          url: location.href,
          target: target,
          args: args,
        });
      },
    });
  },
};
