function sematextLogger (token, region, receiverUrl) {
  var url = receiverUrl || 'https://logsene-receiver.sematext.com'
  if (region && region.toUpperCase() === 'EU') {
    url = 'https://logsene-receiver.eu.sematext.com'
  }
  if (region && region.toUpperCase() === 'US') {
    url = 'https://logsene-receiver.sematext.com'
  }
  const bulkIndexUrl = `${url}/${token}/_bulk/`
  var logBuffer = ''
  var lineCount = 0
  const sessionId = /SESS\w*ID=([^;]+)/i.test(document.cookie) ? RegExp.$1 : false
  var consoleFunctions = {
    error: console.error,
    warn: console.warn,
    log: console.log,
    info: console.info
  }
  function logLine (logLine) {
    var indexCommand = JSON.stringify({ 'index': { '_index': token, '_type': 'browser_logs' } })
    logBuffer = logBuffer + (indexCommand + '\n' + logLine + '\n')
    lineCount += 1
    if (lineCount > 100) {
      shipLogs()
    }
  }

  function shipLogs () {
    if (lineCount === 0) {
      return
    }
    const http = new XMLHttpRequest()
    http.open('POST', bulkIndexUrl, true)
    http.setRequestHeader('Content-type', 'application/json')
    http.send(logBuffer)
    logBuffer = ''
    lineCount = 0
  }

  function sematextLog (severity) {
    var args = []
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[1])
    }
    var msg = {
      '@timestamp': new Date(),
      sessionId: String(sessionId),
      severity: severity,
      href: window.location.href,
      browser: {
        appName: window.navigator.appName,
        userAgent: window.navigator.userAgent,
        platform: window.navigator.platform
      }
    }
    if (args.length > 0) {
      msg.message = args.map((e) => {
        if (typeof e === 'string') {
          return e
        } else {
          return JSON.stringify(e)
        }
      }).join(' ')
      logLine(JSON.stringify(msg))
    }
    return consoleFunctions[severity].apply(console, args)
  }

  console.log = function () { sematextLog('info', ...arguments) }
  console.error = function () { sematextLog('error', ...arguments) }
  console.warn = function () { sematextLog('warn', ...arguments) }
  // catching all errors
  window.addEventListener('error', function (evt) {
    console.error("Error event: '" + evt.message + "' from " + evt.filename + ':' + evt.lineno, evt)
    evt.preventDefault()
  })
  setInterval(shipLogs, 5000)
}
