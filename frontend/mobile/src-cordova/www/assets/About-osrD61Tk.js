import { c as QList, b as QItemLabel, Q as QItem, a as QItemSection } from "./QList-Cqp20mmE.js";
import { _ as _export_sfc, k as openBlock, m as createBlock, p as withCtx, W as createBaseVNode, u as createTextVNode, t as createVNode, q as createElementBlock, F as Fragment, s as renderList, Q as QIcon, v as toDisplayString } from "./index-D97wSuWx.js";
import { a as QBanner, Q as QPage } from "./QBanner-B1d7JSmM.js";
import "./use-dark-BcG_t4pz.js";
const _sfc_main = {
  __name: "About",
  setup(__props, { expose: __expose }) {
    __expose();
    const features = [
      { icon: "edit_note", label: "CRUD Operations", description: "Create, Read, Update, Delete todo items" },
      { icon: "palette", label: "Modern UI", description: "Quasar components with Material Design" },
      { icon: "check_circle", label: "Form Validation", description: "Input validation before saving" },
      { icon: "error_outline", label: "Error Handling", description: "User-friendly error messages" },
      { icon: "print", label: "Print Support", description: "Print todo items via Cordova printer plugin" }
    ];
    const __returned__ = { features };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { padding: "" }, {
    default: withCtx(() => [
      _cache[2] || (_cache[2] = createBaseVNode("p", { class: "q-my-md" }, [
        createBaseVNode("strong", null, "MyTodoEditor"),
        createTextVNode(" is a sample mobile app that demonstrates CRUD operations against a REST backend ("),
        createBaseVNode("strong", null, [
          createBaseVNode("a", {
            class: "font-bold",
            href: "https://github.com/alaska-software/todo-service/blob/main/backend/readme.md",
            target: "_blank"
          }, "TodoService")
        ]),
        createTextVNode("). The frontend is built with Quasar 2 (Vite + Vue 3) and communicates with the "),
        createBaseVNode("strong", null, [
          createBaseVNode("a", {
            class: "font-bold",
            href: "https://github.com/alaska-software/todo-service/blob/main/backend/readme.md",
            target: "_blank"
          }, "TodoService")
        ]),
        createTextVNode(" backend — a REST microservice built with the Alaska Software MSA framework for Xbase++. ")
      ], -1)),
      createVNode(QList, {
        bordered: "",
        separator: "",
        class: "q-mb-md rounded-borders"
      }, {
        default: withCtx(() => [
          createVNode(QItemLabel, { header: "" }, {
            default: withCtx(() => [..._cache[0] || (_cache[0] = [
              createTextVNode("Features", -1)
            ])]),
            _: 1
          }),
          (openBlock(), createElementBlock(Fragment, null, renderList($setup.features, (feature) => {
            return createVNode(QItem, {
              key: feature.label
            }, {
              default: withCtx(() => [
                createVNode(QItemSection, { avatar: "" }, {
                  default: withCtx(() => [
                    createVNode(QIcon, {
                      name: feature.icon,
                      color: "primary"
                    }, null, 8, ["name"])
                  ]),
                  _: 2
                }, 1024),
                createVNode(QItemSection, null, {
                  default: withCtx(() => [
                    createVNode(QItemLabel, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(feature.label), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(QItemLabel, { caption: "" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(feature.description), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024);
          }), 64))
        ]),
        _: 1
      }),
      createVNode(QBanner, {
        rounded: "",
        class: "bg-grey-3"
      }, {
        avatar: withCtx(() => [
          createVNode(QIcon, {
            name: "info",
            color: "orange-10"
          })
        ]),
        default: withCtx(() => [
          _cache[1] || (_cache[1] = createTextVNode(" Please make sure that the backend (TodoService) is running and you can access it, before you start this app. ", -1))
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const About = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "About.vue"]]);
export {
  About as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJvdXQtb3NyRDYxVGsuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWdlcy9BYm91dC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICAgIDxxLXBhZ2UgcGFkZGluZz5cbiAgICAgICAgPHAgY2xhc3M9XCJxLW15LW1kXCI+XG4gICAgICAgICAgICA8c3Ryb25nPk15VG9kb0VkaXRvcjwvc3Ryb25nPiBpcyBhIHNhbXBsZSBtb2JpbGUgYXBwIHRoYXQgZGVtb25zdHJhdGVzIENSVUQgb3BlcmF0aW9ucyBhZ2FpbnN0IGEgUkVTVCBiYWNrZW5kICg8c3Ryb25nPjxhIGNsYXNzPVwiZm9udC1ib2xkXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9hbGFza2Etc29mdHdhcmUvdG9kby1zZXJ2aWNlL2Jsb2IvbWFpbi9iYWNrZW5kL3JlYWRtZS5tZFwiIHRhcmdldD1cIl9ibGFua1wiPlRvZG9TZXJ2aWNlPC9hPjwvc3Ryb25nPikuXG4gICAgICAgICAgICBUaGUgZnJvbnRlbmQgaXMgYnVpbHQgd2l0aCBRdWFzYXIgMiAoVml0ZSArIFZ1ZSAzKSBhbmQgY29tbXVuaWNhdGVzIHdpdGggdGhlXG4gICAgICAgICAgICA8c3Ryb25nPjxhIGNsYXNzPVwiZm9udC1ib2xkXCIgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9hbGFza2Etc29mdHdhcmUvdG9kby1zZXJ2aWNlL2Jsb2IvbWFpbi9iYWNrZW5kL3JlYWRtZS5tZFwiIHRhcmdldD1cIl9ibGFua1wiPlRvZG9TZXJ2aWNlPC9hPjwvc3Ryb25nPiBiYWNrZW5kIOKAlCBhIFJFU1QgbWljcm9zZXJ2aWNlIGJ1aWx0IHdpdGggdGhlIEFsYXNrYSBTb2Z0d2FyZSBNU0EgZnJhbWV3b3JrIGZvciBYYmFzZSsrLlxuICAgICAgICA8L3A+XG5cbiAgICAgICAgPHEtbGlzdCBib3JkZXJlZCBzZXBhcmF0b3IgY2xhc3M9XCJxLW1iLW1kIHJvdW5kZWQtYm9yZGVyc1wiPlxuICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBoZWFkZXI+RmVhdHVyZXM8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgIDxxLWl0ZW0gdi1mb3I9XCJmZWF0dXJlIGluIGZlYXR1cmVzXCIgOmtleT1cImZlYXR1cmUubGFiZWxcIj5cbiAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyPlxuICAgICAgICAgICAgICAgICAgICA8cS1pY29uIDpuYW1lPVwiZmVhdHVyZS5pY29uXCIgY29sb3I9XCJwcmltYXJ5XCIvPlxuICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IGZlYXR1cmUubGFiZWwgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPnt7IGZlYXR1cmUuZGVzY3JpcHRpb24gfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgIDwvcS1saXN0PlxuXG4gICAgICAgIDxxLWJhbm5lciByb3VuZGVkIGNsYXNzPVwiYmctZ3JleS0zXCI+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmF2YXRhcj5cbiAgICAgICAgICAgICAgICA8cS1pY29uIG5hbWU9XCJpbmZvXCIgY29sb3I9XCJvcmFuZ2UtMTBcIi8+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgICAgUGxlYXNlIG1ha2Ugc3VyZSB0aGF0IHRoZSBiYWNrZW5kIChUb2RvU2VydmljZSkgaXMgcnVubmluZyBhbmQgeW91IGNhbiBhY2Nlc3MgaXQsIGJlZm9yZSB5b3Ugc3RhcnQgdGhpcyBhcHAuXG4gICAgICAgIDwvcS1iYW5uZXI+XG4gICAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuLyoqXG4gKiBBYm91dCBwYWdlXG4gKiBTaG93cyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgYXBwIE15VG9kb0VkaXRvclxuICogQGNvcHlyaWdodCBBbGFza2EgU29mdHdhcmUgSW5jLiAoYykgMjAyNi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5jb25zdCBmZWF0dXJlcyA9IFtcbiAgICB7IGljb246ICdlZGl0X25vdGUnLCBsYWJlbDogJ0NSVUQgT3BlcmF0aW9ucycsIGRlc2NyaXB0aW9uOiAnQ3JlYXRlLCBSZWFkLCBVcGRhdGUsIERlbGV0ZSB0b2RvIGl0ZW1zJyB9LFxuICAgIHsgaWNvbjogJ3BhbGV0dGUnLCBsYWJlbDogJ01vZGVybiBVSScsIGRlc2NyaXB0aW9uOiAnUXVhc2FyIGNvbXBvbmVudHMgd2l0aCBNYXRlcmlhbCBEZXNpZ24nIH0sXG4gICAgeyBpY29uOiAnY2hlY2tfY2lyY2xlJywgbGFiZWw6ICdGb3JtIFZhbGlkYXRpb24nLCBkZXNjcmlwdGlvbjogJ0lucHV0IHZhbGlkYXRpb24gYmVmb3JlIHNhdmluZycgfSxcbiAgICB7IGljb246ICdlcnJvcl9vdXRsaW5lJywgbGFiZWw6ICdFcnJvciBIYW5kbGluZycsIGRlc2NyaXB0aW9uOiAnVXNlci1mcmllbmRseSBlcnJvciBtZXNzYWdlcycgfSxcbiAgICB7IGljb246ICdwcmludCcsIGxhYmVsOiAnUHJpbnQgU3VwcG9ydCcsIGRlc2NyaXB0aW9uOiAnUHJpbnQgdG9kbyBpdGVtcyB2aWEgQ29yZG92YSBwcmludGVyIHBsdWdpbicgfSxcbl1cbjwvc2NyaXB0PlxuXG4iXSwibmFtZXMiOlsiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQXFDQSxVQUFNLFdBQVc7QUFBQSxNQUNi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
