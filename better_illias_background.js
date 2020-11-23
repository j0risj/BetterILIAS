function reformatHeaders(headers_list) {
    let headers = {};
    for (let header of headers_list) {
        headers[header.name] = header.value;
    }
    return headers;
}

function headersListener(details) {
    let headers = reformatHeaders(details.responseHeaders);
    if (details.tabID === -1 || headers["Content-Type"] !== "application/pdf") {
        return;
    }
    console.log(headers["Content-Description"])
    browser.tabs.executeScript(details.tabID, {code: `document.title = ${headers["Content-Description"]};`})
}

const filter = {
    urls: ["*://ilias3.uni-stuttgart.de/*"],
    types: ["main_frame"]
}

browser.webRequest.onHeadersReceived.addListener(headersListener, filter, ["responseHeaders"]);