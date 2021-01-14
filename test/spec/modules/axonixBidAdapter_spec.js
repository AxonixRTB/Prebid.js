import { expect } from 'chai';
import { spec } from 'modules/axonixBidAdapter.js';
import { newBidder } from 'src/adapters/bidderFactory.js';
import * as bidderFactory from 'src/adapters/bidderFactory.js';
import { auctionManager } from 'src/auctionManager.js';
import { deepClone } from 'src/utils.js';
import { config } from 'src/config.js';

describe('AxonixBidAdapter', function () {
  const adapter = newBidder(spec);

  const SUPPLY_ID_1 = '91fd110a-5685-11eb-8db6-a7e0eeefbbc7';
  const SUPPLY_ID_2 = '22de2092-568b-11eb-bae3-cfa975dc72aa';

  describe('inherited functions', function () {
    it('exists and is a function', function () {
      expect(adapter.callBids).to.exist.and.to.be.a('function');
    });
  });

  describe('isBidRequestValid', function () {
    let validBids = [
      {
        bidder: 'axonix',
        params: {
          supplyId: SUPPLY_ID_1,
        },
      },
      {
        bidder: 'axonix',
        params: {
          supplyId: SUPPLY_ID_2,
        },
        future_parameter: {
          future: 'ididid'
        }
      },
    ];

    let invalidBids = [
      {
        bidder: 'axonix',
        params: {},
      },
      {
        bidder: 'axonix',
      },
    ];

    it('should accept valid bids', function () {
      for (let bid of validBids) {
        expect(spec.isBidRequestValid(bid)).to.equal(true);
      }
    });

    it('should reject invalid bids', function () {
      for (let bid of invalidBids) {
        expect(spec.isBidRequestValid(bid)).to.equal(false);
      }
    });
  });
});
