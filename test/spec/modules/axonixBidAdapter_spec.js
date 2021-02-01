import { expect } from 'chai';
import { spec } from 'modules/axonixBidAdapter.js';
import { newBidder } from 'src/adapters/bidderFactory.js';
import * as utils from 'src/utils.js';
import * as bidderFactory from 'src/adapters/bidderFactory.js';
import { auctionManager } from 'src/auctionManager.js';
import { config } from 'src/config.js';

describe('AxonixBidAdapter', function () {
  const adapter = newBidder(spec);

  const SUPPLY_ID_1 = '91fd110a-5685-11eb-8db6-a7e0eeefbbc7';
  const SUPPLY_ID_2 = '22de2092-568b-11eb-bae3-cfa975dc72aa';
  const REGION_1 = 'us-east-1';
  const REGION_2 = 'eu-west-1';

  const DEFAULT_PARAMS = [{
    adUnitCode: 'ad_code',
    bidId: 'abcd1234',
    mediaTypes: {
      banner: {
        sizes: [
          [300, 250],
          [300, 200]
        ]
      }
    },
    bidder: 'axonix',
    params: {
      supplyId: SUPPLY_ID_1,
      region: REGION_1
    },
    requestId: 'q4owht8ofqi3ulwsd',
    transactionId: 'fvpq3oireansdwo'
  }];

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
          region: REGION_1
        },
      },
      {
        bidder: 'axonix',
        params: {
          supplyId: SUPPLY_ID_2,
          region: REGION_2
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

  describe('buildRequests: can handle banner ad requests', function () {
    it('creates ServerRequests pointing to the correct region and endpoint if it changes', function () {
      // loop:
      //   set supply id
      //   set region/endpoint in ssp config
      //   call buildRequests, validate request (url, method, supply id)
      const bidderRequest = {
        bidderCode: 'a4g',
        auctionId: '18fd8b8b0bd757',
        bidderRequestId: '418b37f85e772c',
        timeout: 3000,
        gdprConsent: {
          consentString: 'BOKAVy4OKAVy4ABAB8AAAAAZ+A==',
          gdprApplies: true
        },
        refererInfo: {
          referer: 'https://www.prebid.org',
          canonicalUrl: 'https://www.prebid.org/the/link/to/the/page'
        }
      };

      const [request] = spec.buildRequests(DEFAULT_PARAMS, bidderRequest);

      expect(request).to.have.property('url', `https://openrtb-${REGION_1}.axonix.com/supply/prebid/${SUPPLY_ID_1}`);
      expect(request).to.have.property('method', 'POST');
      expect(request).to.have.property('data');

      const { data } = request;
      expect(data).to.have.property('app');
      expect(data).to.have.property('site');
      expect(data).to.have.property('validBidRequest');
      expect(data).to.have.property('connectiontype');
      expect(data).to.have.property('devicetype');
      expect(data).to.have.property('bidfloor');
      expect(data).to.have.property('dnt');
      expect(data).to.have.property('language');
      expect(data).to.have.property('prebidVersion');
      expect(data).to.have.property('screenHeight');
      expect(data).to.have.property('screenWidth');
      expect(data).to.have.property('tmax');
      expect(data).to.have.property('ua');
    });

    it('creates ServerRequests pointing to default endpoint if missing', function () {
      // no endpoint in config means default value openrtb.axonix.com
      expect.fail('Not implemented');
    });

    it('creates ServerRequests pointing to default region if missing', function () {
      // no region in config means default value us-east-1
      expect.fail('Not implemented');
    });
  });

  describe('buildRequests: can handle video ad requests', function () {
    it('creates ServerRequests pointing to the correct region and endpoint if it changes', function () {
      // loop:
      //   set supply id
      //   set region/endpoint in ssp config
      //   call buildRequests, validate request (url, method, supply id)
      // validate it returnes an array of type ServerRequest defined in {@link file://./../../../src/adapters/bidderFactory.js}
      expect.fail('Not implemented');
    });

    it('creates ServerRequests pointing to default endpoint if missing', function () {
      // no endpoint in config means default value openrtb.axonix.com
      expect.fail('Not implemented');
    });

    it('creates ServerRequests pointing to default region if missing', function () {
      // no region in config means default value us-east-1
      expect.fail('Not implemented');
    });
  });

  describe('buildRequests: can handle native ad requests', function () {
    it('creates ServerRequests pointing to the correct region and endpoint if it changes', function () {
      // loop:
      //   set supply id
      //   set region/endpoint in ssp config
      //   call buildRequests, validate request (url, method, supply id)
      expect.fail('Not implemented');
    });

    it('creates ServerRequests pointing to default endpoint if missing', function () {
      // no endpoint in config means default value openrtb.axonix.com
      expect.fail('Not implemented');
    });

    it('creates ServerRequests pointing to default region if missing', function () {
      // no region in config means default value us-east-1
      expect.fail('Not implemented');
    });
  });

  describe('interpretResponse', function () {
    it('considers corner cases', function() {
      // passing null/undefined returns []
      expect.fail('Not implemented');
    })

    it('ignores unparseable responses', function() {
      // passing invalid object returns [], no throws
      expect.fail('Not implemented');
    })

    it('parses banner responses', function () {
      // passing 1 valid banner response generates an array with 1 correct prebid response
      //
      // validate it returnes an array of type Bid defined in {@link file://./../../../src/adapters/bidderFactory.js}
      expect.fail('Not implemented');
    });

    it('parses multiple banner responses', function () {
      // passing N valid banners in a response generates an array with 1 correct prebid response
      //
      // validate it returnes an array of type Bid defined in {@link file://./../../../src/adapters/bidderFactory.js}
      expect.fail('Not implemented');
    });

    it('parses 1 video responses', function () {
      // passing 1 valid video in a response generates an array with 1 correct prebid response
      // examine mediaType:video, vastXml and vastUrl
      // check isValidVideoBid from {@link file://./../../../src/video.js}
      expect.fail('Not implemented');
    });

    it('parses 1 native responses', function () {
      // passing 1 valid video in a response generates an array with 1 correct prebid response
      // examine mediaType:native, native element
      // check nativeBidIsValid from {@link file://./../../../src/native.js}
      expect.fail('Not implemented');
    });
  });

  describe('onBidWon', function () {
    beforeEach(function () {
      sinon.stub(utils, 'triggerPixel');
    });

    afterEach(function () {
      utils.triggerPixel.restore();
    });

    it('winning a bid triggers a call to our pixel', function () {
      // our onBidWon should be simply forwarding all received to our endpoint

      // onBidWon implementation approach:
      // if (typeof bid.nurl !== 'undefined') {
      //   const cpm = bid.pbMg;
      //   bid.nurl = bid.nurl.replace(
      //     /\$\{AUCTION_PRICE\}/,
      //     cpm
      //   );
      //   utils.triggerPixel(bid.nurl, null);
      // };
      //
      // see prebid.js
      //  * @property {string} pbAg Auto granularity price bucket; CPM <= 5 ? increment = 0.05 : CPM > 5 && CPM <= 10 ? increment = 0.10 : CPM > 10 && CPM <= 20 ? increment = 0.50 : CPM > 20 ? priceCap = 20.00.  Example: `"0.80"`.
      //  * @property {string} pbCg Custom price bucket.  For example setup, see {@link setPriceGranularity}.  Example: `"0.84"`.
      //  * @property {string} pbDg Dense granularity price bucket; CPM <= 3 ? increment = 0.01 : CPM > 3 && CPM <= 8 ? increment = 0.05 : CPM > 8 && CPM <= 20 ? increment = 0.50 : CPM > 20? priceCap = 20.00.  Example: `"0.84"`.
      //  * @property {string} pbLg Low granularity price bucket; $0.50 increment, capped at $5, floored to two decimal places.  Example: `"0.50"`.
      //  * @property {string} pbMg Medium granularity price bucket; $0.10 increment, capped at $20, floored to two decimal places.  Example: `"0.80"`.
      //  * @property {string} pbHg High granularity price bucket; $0.01 increment, capped at $20, floored to two decimal places.  Example: `"0.84"`.

      // test body:
      //
      // const bids = [
      //   {bidder: 'axonix', params: {supplyId: 'id'}},
      // ];
      // const adUnits = [{
      //   code: 'our-ad-code',
      //   sizes: [[728, 90]],
      //   bids
      // }];
      // // onBidWon is called with a Bid object
      // // see {@link file://./../unit/core/adapterManager_spec.js}
      // spec.onBidWon(bids[0]);
      // expect(utils.triggerPixel.calledOnce).to.equal(true);
      expect.fail('Not implemented');
    });

    it('when there is no notification expected server side, none is called', function () {
      // call onBidWon without a nurl, expect no calls
      expect.fail('Not implemented');
    });
  });
});
