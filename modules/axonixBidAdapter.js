import * as utils from '../src/utils.js';
import { registerBidder } from '../src/adapters/bidderFactory.js';
import { BANNER, VIDEO, NATIVE } from '../src/mediaTypes.js';
import { config } from '../src/config.js';

const BIDDER_CODE = 'axonix';
const BIDDER_VERSION = '1.0.0';

// const CURRENCY = 'USD';
const ENDPOINT = 'https://openrtb-us-east-1.axonix.com/supply/prebid';

// Banner sizes: [[120, 600], [300, 250], [320, 50], [468, 60], [728, 90]]
// Video protocols: [1, 2, 3, 4, 5, 6, 7, 8]

export const spec = {
  code: BIDDER_CODE,
  version: BIDDER_VERSION,
  supportedMediaTypes: [BANNER, VIDEO, NATIVE],

  isBidRequestValid: function(bid) {
    return !!(bid.params && bid.params.supplyId);
  },

  buildRequests: function(validBidRequests, bidderRequest) {
    const requests = validBidRequests.map(bidRequest => {
      const payload = {
        id: bidRequest.id,
        device: {
          ua: navigator.userAgent,
          js: 1,
          dnt: (navigator.doNotTrack === 'yes' || navigator.doNotTrack === '1' || navigator.msDoNotTrack === '1') ? 1 : 0,
          h: screen.height,
          w: screen.width,
          language: navigator.language
        },
        ext: {
          prebidjs: {
            prebidVersion: '$prebid.version$',
            [bidRequest.bidder]: bidRequest.params
          }
        },
        imp: [{
          banner: utils.deepAccess(bidRequest, 'mediaTypes.banner') || undefined,
          id: bidRequest.transactionId,
          native: utils.deepAccess(bidRequest, 'mediaTypes.native') || undefined,
          video: utils.deepAccess(bidRequest, 'mediaTypes.video') || undefined
        }],
        source: {
          tid: bidRequest.transactionId
        },
        tmax: config.getConfig('bidderTimeout')
      };

      return {
        method: 'POST',
        url: ENDPOINT,
        data: payload
      };
    });

    return requests;
  },

  interpretResponse: function(serverResponse, request) {},

  onTimeout: function(timeoutData) {},

  onBidWon: function(bid) {},

  onSetTargeting: function(bid) {}
}

registerBidder(spec);
