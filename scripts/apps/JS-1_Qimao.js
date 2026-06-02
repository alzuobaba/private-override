var body = JSON.parse($response.body);
var url = $request.url;

if (url.indexOf("/my-center") !== -1) {
  if (body.data && body.data.func_area) {
    body.data.func_area = body.data.func_area.filter(function(item) {
      return item && item.type !== "ad" && item.type !== "advertisement" && item.type !== "banner";
    });
  }
}

$done({ body: JSON.stringify(body) });
