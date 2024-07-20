const Koa = require("koa");
const Router = require("@koa/router");
const multer = require("@koa/multer");
const cors = require("@koa/cors");

const app = new Koa();
app.use(cors());
const router = new Router();
const upload = multer({
  dest: "uploads/",
});

router.post(
  "/upload",
  upload.fields([
    {
      name: "avatar",
      maxCount: 3,
    },
  ]),
  async (ctx) => {
    console.log("ctx.request.files", ctx.request.files);
    console.log("ctx.files", ctx.files);
    console.log("ctx.request.body", ctx.request.body);
    let r = ctx.request.files.avatar.map((item) => ({
      url: item.path,
      name: item.originalname,
    }));
    ctx.body = r;
  }
);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
