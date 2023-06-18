import components from "@/components/ui";
import directives from "@/directives";
import router from "@/router/router";
import store from "@/store";
import { createApp } from "vue";
import App from "./App";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(store).use(router).mount("#app");
