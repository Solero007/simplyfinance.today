(function (arg) {
    var _pxl = document.createElement('script');
    _pxl.type = 'text/javascript';
    _pxl.defer = true;
    _pxl.setAttribute('data-hmtrackerscriptquery', JSON.stringify(arg));
    _pxl.src = 'https://leads-inst47-client.phonexa.uk/hitmetrix/analize.js?v=f0bd9573c2d6463';
    document.getElementsByTagName('head')[0].appendChild(_pxl);
})({ token: 'f1be763ae2907160ecd1daf83fed1bf2584422a5' });

(function () {
    window.__insp = window.__insp || [];
    __insp.push(['wid', 2014519133]);
    var ldinsp = function () {
        if (typeof window.__inspld != 'undefined') return;
        window.__inspld = 1;
        var insp = document.createElement('script');
        insp.type = 'text/javascript';
        insp.async = true;
        insp.id = 'inspsync';
        insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=2014519133&r=' + Math.floor(new Date().getTime() / 3600000);
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(insp, x);
    };
    setTimeout(ldinsp, 0);
})();
