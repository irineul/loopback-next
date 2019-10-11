// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/pubsub
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import {EventEmitter} from 'events';
import * as pEvent from 'p-event';
import {promisify} from 'util';
import {PubSubConnector} from '../..';
const sleep = promisify(setTimeout);

export function testPubSubConnector(name: string, connector: PubSubConnector) {
  describe(`${name} pubsub connector`, function() {
    // eslint-disable-next-line no-invalid-this
    this.timeout(15000);

    before(() => connector.connect());

    after(() => connector.disconnect());

    it('subscribes to a channel', async () => {
      const emitter = new EventEmitter();
      const waitForMessage = pEvent(emitter, 'message');
      const events: object[] = [];
      const subscriber = await connector.createSubscriber({
        channels: ['test-channel'],
      });
      subscriber.onMessage(async (channel, message) => {
        events.push({channel, message});
        emitter.emit('message');
      });
      const publisher = await connector.createPublisher({});
      await publisher.publish('test-channel', 'test-message-1');
      await waitForMessage;
      expect(events).to.eql([
        {channel: 'test-channel', message: 'test-message-1'},
      ]);
      await subscriber.close();
      await publisher.publish('test-channel', 'test-message-2');
      await sleep(100);
      expect(events).to.not.containEql({
        channel: 'test-channel',
        message: 'test-message-2',
      });
    });
  });
}
