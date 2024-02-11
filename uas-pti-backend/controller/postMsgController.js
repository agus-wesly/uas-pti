const messageModel = require("../model/messageModel");
const counterModel = require("../model/counterModel");

const postMsgController = async (req, res) => {
  const { id, msg } = req.body;
  if (!msg) return res.sendStatus(400);

  //Adding message to user with spesific id
  try {
    counterModel.findOneAndUpdate({ id: "counter" }, { $inc: { seq: 1 } }, { new: true }, async (err, data) => {
      let idx;
      if (data === null) {
        await counterModel.create({
          id: "counter",
          seq: 1,
        });
        idx = 1;
      } else {
        idx = data.seq;
      }
      const response = await messageModel.create({
        id: idx,
        userId: id,
        message: msg,
        date: new Date().toISOString(),
      });
    });
    res.status(201).json({ message: "Message successfully sent !" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = postMsgController;
