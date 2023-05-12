const BrowserContext = ({ context }) => {
  return {
    setToStorage (key, value) {
      return context.storage.local.set({ [key]: value })
    },
    async getFromStorage (key) {
      const result = await context.storage.local.get(key)
      return result[key]
    },
    resolveAsset (path) {
      return context.runtime.getURL(path)
    },
  }
}
