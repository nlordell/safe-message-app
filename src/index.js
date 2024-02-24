import { getSafeInfo, setSettings, signTypedData } from "./safe.js";
import { debug, error } from "./log.js";

function handleError(handler) {
  return async () => {
    try {
      await handler(...arguments);
    } catch (err) {
      error(`ERROR: ${err}`);
    }
  };
}

addEventListener(
  "load",
  handleError(async () => {
    debug("waiting for Safe...");
    debug(await getSafeInfo());
    debug(await setSettings({ offChainSigning: true }));
  }),
);

document.querySelector("#message").addEventListener(
  "change",
  handleError(() => {
    document.querySelector("#sign").disabled =
      document.querySelector("#message").files.length === 0;
  }),
);

document.querySelector("#sign").addEventListener(
  "click",
  handleError(() => {
    const [file] = document.querySelector("#message").files;
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      handleError(async () => {
        const message = JSON.parse(reader.result);
        debug(message);

        await signTypedData(message);
      }),
    );
    reader.readAsText(file, "utf-8");
  }),
);
