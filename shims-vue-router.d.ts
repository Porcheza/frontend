/* eslint vue/prefer-import-from-vue: 0 */

import "vue-router";
import type { Component } from "vue";

export {};

declare module "vue-router" {
  interface RouteMeta {
    layout: Component;
  }
}
