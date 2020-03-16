function genericCallback(res) {
  return function genericCallbackInner(err, data) {
    if (err) {
      console.error('FAIL:', JSON.stringify(err, null, 2));
      res.status(500).send(err);
    } else {
      // console.log("SUCCESS:", JSON.stringify(data, null, 2));
      res.status(200).send(data);
    }
  };
}

module.exports = { genericCallback };
