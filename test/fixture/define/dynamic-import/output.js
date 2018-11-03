export default function fetch() {
  return import("./foo").then(() => {
    console.log("success");
  }).catch(() => {
    console.log("error");
  });
}
