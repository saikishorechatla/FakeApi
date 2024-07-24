const data = require("../data/countries.json");

const FUNCs = {
  all: (req, res) => {
    return res.status(200).json({ status: 200, data: data });
  },

  q: (req, res) => {
    const name = req.query.name;
    const origin = req.query.origin;
    if (name) {
      const d = data.filter(
        (val) => val.name.toLowerCase() == name.toLowerCase()
      );
      if (d.length != 0) return res.status(200).json({ status: 200, data: d });
    } else if (origin) {
      const d = data.filter(
        (val) => val.origin.toLowerCase() == origin.toLowerCase()
      );
      if (d.length != 0) return res.status(200).json({ status: 200, data: d });
    }
    return res.status(200).json({ status: 200, data: "Not Found" });
  },
  id: (req, res) => {
    const id = req.params.id;
    const d = data.filter((val) => val.id == id);
    if (d) return res.status(200).json({ status: 200, data: d });
  },
};

module.exports = FUNCs;
