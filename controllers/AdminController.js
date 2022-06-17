import curs from "../model/curs.js";

export class AdminController {
  static index(req, res) {
    res.send("hello");
  }
  static update(req, res) {
    console.log(req.body)
    curs
      .findOneAndUpdate(
        { _id: req.body.id},
        { $set: {
           title:req.body.title,
           description: req.body.description,
           amount: req.body.amount,
           times:req.body.times
         } },
        { new: true }
      )
      .then((item) => {
        console.log(item);
      });
      res.end()
  }
  static delete(req, res) {
    curs.deleteOne({ _id: req.body.id })
    .then((res)=>{
      console.log(res)
    })
    .catch(error=>{
      console.log(error)
    })
  }
}
