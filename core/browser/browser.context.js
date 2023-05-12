export function BrowserContext ({ context }) {
  return {
    composeStorageChanges (changes) {
      const storageChanges = {}
      for (const changesKey in changes) storageChanges[changesKey] = changes[changesKey].newValue
      return storageChanges
    },
    setToStorage (key, value) {
      return context.storage.local.set({ [key]: value })
    },
    async getFromStorage (key) {
      const result = await context.storage.local.get(key)
      return result[key]
    },
    findCookiesByDomain (domain) {
      return context.cookies.getAll({ domain })
    },
    onStorageUpdatedWith (key, callback) {
      context.storage.onChanged.addListener((storageChanges) => {
        if (storageChanges[key] === undefined) return
        callback(this.composeStorageChanges(storageChanges)[key])
      })
    },
    onAddonInstalled (callback) {
      context.runtime.onInstalled.addListener(callback)
    },
    resolveAsset (path) {
      return context.runtime.getURL(path)
    },
    async registerScripts(scripts){
      const registeredScripts = await context.scripting.getRegisteredContentScripts()
      const toBeRegistered = []
      for (const script of scripts) {
        const registeredScript = registeredScripts.find(
          registered => registered.id === script.id
        )
        if (!registeredScript) toBeRegistered.push(script)
      }
      await context.scripting
        .registerContentScripts(toBeRegistered)
        .catch(error => console.error(error))
    }
  }
}
