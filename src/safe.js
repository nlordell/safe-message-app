let currentId = 0;
const pendingRequests = new Map();

addEventListener("message", (message) => {
  if (message.source !== parent) {
    return;
  }

  const { id } = message.data;
  if (id === undefined) {
    debug("unexpected message");
    return;
  }

  const callback = pendingRequests.get(id);
  if (!pendingRequests.delete(id)) {
    debug("unexpected response");
    return;
  }

  callback(message.data);
});

function send(method, params) {
  const request = {
    id: currentId++,
    method,
    params,
    env: {
      sdkVersion: "9.0.0",
    },
  };
  return new Promise((resolve, reject) => {
    pendingRequests.set(request.id, (response) => {
      if (!response.success) {
        reject(new Error(response.error));
        return;
      }
      resolve(response.data);
    });
    this.parent.postMessage(request, "*");
  });
}

export async function getSafeInfo() {
  return await send("getSafeInfo", undefined);
}

export async function setSettings(settings) {
  return await send("rpcCall", {
    call: "safe_setSettings",
    params: [settings],
  });
}

export async function signTypedData(typedData) {
  return await send("signTypedMessage", { typedData });
}
