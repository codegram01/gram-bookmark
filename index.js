import { appCom } from "./components/app.js"
import { navActionCom } from "./components/navAction.js";
import { e, ref, range } from "./gram.js"

const app = document.getElementById("app");
const nav = document.getElementsByTagName("nav")[0];

app.appendChild(appCom())
nav.appendChild(navActionCom())

