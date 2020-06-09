import { AjaxInstance } from "../util/Ajax";

export const SyncService = {
  get,
  sync
};

function getDateInMs() {
  return new Date().getTime();
}

async function get(deviceId) {
  return AjaxInstance.post("?action=sync-get", { "device-id": deviceId });
}

async function sync(deviceId) {
  return AjaxInstance.post("?action=sync-start", {
    "device-id": deviceId,
    date: getDateInMs()
  }).then(sync => {
    const syncId = sync.ID;
    var promises = [200, 400, 600, 700, 800, 1000].map(item => {
      return delayedSyncUpdate(deviceId, syncId, item);
    });
    return Promise.all(promises);
  });
}

async function delayedSyncUpdate(deviceId, syncId, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      AjaxInstance.post("?action=sync-update", {
        "device-id": deviceId,
        "sync-id": syncId,
        date: getDateInMs()
      }).finally(sync => {
        resolve(sync);
      });
    }, delay);
  });
}
