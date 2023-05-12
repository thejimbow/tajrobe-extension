export async function registerScripts ({ browserContext }) {
  const scripts = [
    {
      id: 'tajrobe-context',
      js: ['/scripts/browser.context.js','/scripts/utils.js'],
      matches: ['*://*.jobvision.ir/*','*://*.jobinja.ir/*','*://*.quera.ir/*'],
      runAt: 'document_start',
      allFrames: false
    },
    {
      id: 'tajrobe-jobvision',
      js: ['/scripts/jobvision.js'],
      matches: ['*://*.jobvision.ir/*'],
      runAt: 'document_end',
      allFrames: false
    },
    {
      id: 'tajrobe-jobinja',
      js: ['/scripts/jobinja.js'],
      matches: ['*://*.jobinja.ir/*'],
      runAt: 'document_end',
      allFrames: false
    },
    {
      id: 'tajrobe-quera',
      js: ['/scripts/quera.js'],
      matches: ['*://*.quera.ir/*'],
      runAt: 'document_end',
      allFrames: false
    }
  ]
  await browserContext.registerScripts(scripts)
}
