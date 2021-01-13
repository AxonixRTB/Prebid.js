# Overview

```
Module Name : Axonix Bidder Adapter
Module Type : Bidder Adapter
Maintainer  : support@axonix.com
```

# Description

Module that connects to Axonix's exchange for bids.

# Test Parameters

## Banner

```javascript
var bannerAdUnit = {
  code: 'test-banner',
  mediaTypes: {
    banner: {
      sizes: [[120, 600], [300, 250], [320, 50], [468, 60], [728, 90]]
    }
  },
  bids: [{
    bidder: 'axonix',
    params: {
      supplyId: 'abc'
    }
  }]
};
```

## Video

```javascript
var videoAdUnit = {
  code: 'test-video',
  mediaTypes: {
    video: {
      protocols: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  bids: [{
    bidder: 'axonix',
    params: {
      supplyId: 'abc'
    }
  }]
};
```

## Native

```javascript
var nativeAdUnit = {
  code: 'test-native',
  mediaTypes: {
    native: {

    }
  },
  bids: [{
    bidder: 'axonix',
    params: {
      supplyId: 'abc'
    }
  }]
};
```

## Multiformat

```javascript
var adUnits = [
{
  code: 'test-banner',
  mediaTypes: {
    banner: {
      sizes: [[120, 600], [300, 250], [320, 50], [468, 60], [728, 90]]
    }
  },
  bids: [{
    bidder: 'axonix',
    params: {
      supplyId: 'abc'
    }
  }]
},
{
  code: 'test-video',
  mediaTypes: {
    video: {
      protocols: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  bids: [{
    bidder: 'axonix',
    params: {
      supplyId: 'abc'
    }
  }]
},
{
  code: 'test-native',
  mediaTypes: {
    native: {

    }
  },
  bids: [{
    bidder: 'axonix',
    params: {
      supplyId: 'abc'
    }
  }]
}
];
```
