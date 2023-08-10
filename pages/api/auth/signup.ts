// import Users from "assets/model/Schema";
// import connectMongo from "./../../../assets/database/conn";
// import { hash } from "bcryptjs";

// export default async function handler(req: any, res: any) {
//   connectMongo().catch((error) => res.json({ error: "Connection Failed..!" }));

//   if (req.method === "POST") {
//     if (!req.body) return res.status(404).json({ error: "Don't have form data..!" });
//     const { login, email, password } = req.body;

//     // проверка над дупликат пользователей
//     const checkexisting = await Users.find({ email });
//     if (checkexisting) return res.status(422).json({ message: "User Already exists..!" });

//     // захэшим пароль
//     Users.create({
//       login,
//       email,
//       password: await hash(password, 12, function (err, data) {
//         if (err) return res.status(404).json({ err });
//         res.status(201).json({ status: true, user: data });
//       })
//     });
//   } else {
//     res.status(500).json({ message: "HTTP method not valid only POST Accepted" });
//   }
// }
