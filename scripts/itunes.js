const url = $request.url;
const method = $request.method;

if (url.includes('/verifyReceipt') && method === 'POST') {
  const workerUrl = 'https://reven.jsforbaby.workers.dev/reven/buy.itunes.apple.com/verifyReceipt?enabled=true&expires=2099-09-09&country=HK';
  $done({ url: workerUrl });
} else {
  $done({});
}
