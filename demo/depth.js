

Depth.getStreams = async function () {
  // TODO: Check browser versions.

  // TODO: Catch exceptions
  let devices = await navigator.mediaDevices.enumerateDevices();

  // Create a map from psuedo-group to a pair of depth and rgb streams.
  let result = {};

  for (let i = 0; i < devices.length; i++) {
    const device = devices[i];
    if (device.kind != 'videoinput') continue;
    if (device.label.indexOf("RealSense") == -1) continue;

    const group = device.label.slice(device.label.length - 10, device.label.length - 1);
    console.log('Group: ', group);

    const constraints = {
      video: { deviceId: { exact: device.deviceId } }
    };
    const deviceStream = await navigator.mediaDevices.getUserMedia(constraints);

    // Create the result for the group if it doesn't exist yet.
    if (!(group in result)) {
      result[group] = {};
    }

    if (device.label.indexOf("RGB") != -1) {
      result[group]["rgb"] = deviceStream;
    } else {
      result[group]["depth"] = deviceStream;
    }
  }

  console.log("Got results: ", result);
  return result;
}

function Depth() { }
