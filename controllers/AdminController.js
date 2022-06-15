import curs from "../model/curs.js";

export class AdminController {
  static index(req, res) {
    res.send("hello");
  }
  static update(req, res) {
    console.log(req.body)
    // curs
      // .findOneAndUpdate(
      //   { _id: "62a5e1de0eafd7fee73eb0a1" },
      //   { $set: { title: "tessssss" } },
      //   { new: true }
      // )
      // .then((item) => {
      //   console.log(item);
      // });
      // res.end()
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
